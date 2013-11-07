<?php
class cssmania{
	private $search;
	public function __construct($search){
		$this->search = $search;
	}
	public function getData(){
		$callstr 		= 'http://cssmania.com/api/api.php?search='.$this->search;
		$ch 			= curl_init($callstr);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$apiresponse 	= curl_exec($ch);
		curl_close($ch);
		$result			= 0;
		if ($apiresponse) {
			$json = json_decode($apiresponse);
			if ($json != null){
				$result = 1;
				$id							= $json[0]->id;
				$url 						= $json[0]->url;
				$developed					= $json[0]->developed;
				$country					= $json[0]->country;
				$rating						= $json[0]->rating;
				$totalscore					= $json[0]->totalscore;
				$numbervotes				= $json[0]->numbervotes;
				$colours_0					= $json[0]->colours_0;
				$colours_1					= $json[0]->colours_1;
				$colours_2					= $json[0]->colours_2;
				$colours_3					= $json[0]->colours_3;
				$colours_4					= $json[0]->colours_4;
				$colours_5					= $json[0]->colours_5;
				$url_screenshot				= $json[0]->url_screenshot;
				$time_created				= $json[0]->time_created;
				$last_screenshot_version	= $json[0]->last_screenshot_version;
			}			
		}
		$json = array(
				'result' 					=> $result,
				'url' 						=> ($url != '') ? $url : '',
				'developed'					=> ($developed != '') ? $developed : '',
				'country' 					=> ($country != '') ? $country : '',
				'rating' 					=> ($rating != '') ? $rating : '',
				'totalscore' 				=> ($totalscore != '') ? $totalscore : '',
				'numbervotes' 				=> ($numbervotes != '') ? $numbervotes : '',
				'colours_0' 				=> ($colours_0 != '') ? $colours_0 : '',
				'colours_1' 				=> ($colours_1 != '') ? $colours_1 : '',
				'colours_2' 				=> ($colours_2 != '') ? $colours_2 : '',
				'colours_3' 				=> ($colours_3 != '') ? $colours_3 : '',
				'colours_4' 				=> ($colours_4 != '') ? $colours_4 : '',
				'colours_5' 				=> ($colours_5 != '') ? $colours_5 : '',
				'url_screenshot' 			=> ($url_screenshot != '') ? $url_screenshot : '',
				'time_created' 				=> ($time_created != '') ? $time_created : '',
				'last_screenshot_version' 	=> ($last_screenshot_version != '') ? $last_screenshot_version : ''); 
		$encoded = json_encode($json);
		echo $encoded;
		unset($encoded);
	}
}
$cssM = new cssmania($_GET['website']);
$cssM->getData();
unset($cssM);	
?>