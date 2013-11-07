<?php
/**
RSS Feed Structure:

<channel>
	...
	<item>
		<title> </title>
		<link> </link> 
		...
	</item>
 </channel> 
*/

$source	= $_GET['source'];
$rss 	= new RSS($source);
$rss->getLatest();


class RSS{
	/**
	* the cache directory where we are saving our feeds output
	*/
	private $cache_dir		= 'cache';
	/**
	* time in seconds that the feed will be cached
	*/
	private $cache_lifetime	= 300;
	/**
	* the variable passed with AJAX, 
	* that holds the name of the blog we want to fetch the RSS
	*/
	private $source;
	/**
	* the xsl stylesheet that will 
	* transform the rss feed into html
	*/
	private $xsl_file 		= 'rss2html.xsl';
	
	public function __construct($source){
		$this->source = $source;
	}
	
	/**
	* gets the latest post of the respective blog
	*/
	public function getLatest(){
		switch($this->source){
			case 'wordrom':
				$xml 		= 'http://feeds.feedburner.com/Wordrom?format=xml';
				break;
			case 'w3avenue':
				$xml 		= 'http://feeds.feedburner.com/w3avenue?format=xml';
				break;
			case 'fearlessflyer':
				$xml 		= 'http://feeds.feedburner.com/fearlessflyer?format=xml';
				break;	
			case 'tzine':
				$xml 		= 'http://feeds.feedburner.com/Tutorialzine?format=xml';
				break;	
			case 'bluefaqs':
				$xml 		= 'http://feeds.feedburner.com/Bluefaqscom?format=xml';
				break;	
			case 'devisefunction':
				$xml 		= 'http://feeds.feedburner.com/devisefunction?format=xml';
				break;	
			case 'ourtuts':
				$xml 		= 'http://feeds.feedburner.com/ourtutsfeed?format=xml';
				break;					
		}
		/**
		* if we have the output in the cache,
		* we fetch that one.
		* otherwise we load it and save it in the cache
		*/
		if($this->isCached($this->source . '.xml')){
			echo $this->getCache($this->source . '.xml');
		}
		else{
			$doc = new DOMDocument();
			$xsl = new XSLTProcessor();

			$doc->load($this->xsl_file);
			$xsl->importStyleSheet($doc);

			$doc->load($xml);
			$output = html_entity_decode($xsl->transformToXML($doc));
			
			$this->addCache($output , $this->source . '.xml');
			echo $output;
		}
	}
	
	/**
	* the following cache mechanism 
	* was taken from 
	* http://www.phpro.org/classes/Template-Class.html
	*/
	private function addCache($content, $file){
		/** 
		* cache filename 
		*/
		$filename  = $this->cache_dir . '/' . basename($file);
		/**
		* directory name for the cache file 
		*/
		$directory = $this->cache_dir;
		/** 
		* create the cache directory 
		*/
		@mkdir($directory, 0775);
		/** 
		* write to the cache 
		*/
		if(file_put_contents($filename, $content) == FALSE){
			throw new Exception("Unable to write to cache");
		}
	}
	
	/**
	* gets the content of the cache file
	*/
	private function getCache($file){
		$filename 	= $this->cache_dir . '/' . basename($file);
		/** 
		* read the cache file into a variable 
		*/
		$content	= file_get_contents($filename);
		return isset($content) ? $content : false;
	}
	
	/**
	* checks if a file is cached, based on the time
	* specified in cache_lifetime
	*/
	public function isCached($file){
		$filename = $this->cache_dir . '/' . basename($file);
		if (is_file($filename)){
			clearstatcache();
			if (filemtime($filename) > (time() - $this->cache_lifetime)){
				$isCached = true;
			}
		}
		return isset($isCached) ? true : false;
	}
}
?> 