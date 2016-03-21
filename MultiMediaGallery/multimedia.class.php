<?php

$mg 		= new MultimediaGallery();
$op			= $_GET['op'];
if($op === 'display'){
	$req		= $_GET['req'];
	$cursor		= $_GET['cursor'];
	$mg->display($req,$cursor);
}
elseif($op === 'getTotalFiles'){
	$mg->getTotalFiles();
}

class MultimediaGallery{
	private $xsl_file 		= 'multimedia2text.xsl';
	private $xml_file 		= 'config.xml';
	
	public function __construct(){
	}
	
	public function display($req,$cursor){
		$doc = new DOMDocument();
		$xsl = new XSLTProcessor();

		$doc->load($this->xsl_file);
		$xsl->importStyleSheet($doc);
		
		$xsl->setParameter('', 'req', $req);
		$xsl->setParameter('', 'cursor', $cursor);
		
		$doc->load($this->xml_file);
		$json_str 		= $xsl->transformToXML($doc);
		$json_str 		= str_replace('},]','}]',$json_str);
		echo $json_str;
	}
	
	public function getTotalFiles(){
		$doc = new DOMDocument();
		$doc->load($this->xml_file);
		$file = $doc->getElementsByTagName('file');
		$totalFiles = $file->length;
		echo $totalFiles;
	}
}