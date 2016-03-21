<?php
class Twitter{

	private $screen_name;
	private $api = array('show' 		=> 'http://twitter.com/users/show/');

	public function __construct($screen_name){
		$this->screen_name 	=  $screen_name;
	}
	
	public function getRGB(){
		$callstr = $this->api['show'].$this->screen_name.'.json'; 
		$ch = curl_init($callstr);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$apiresponse = curl_exec($ch);
		curl_close($ch);
		$result = 0;
		if ($apiresponse) {
			$json = json_decode($apiresponse);
			if (($json != null)&&(!$json->error)){
				$result 			= 1;
				$image 				= $json->profile_background_image_url;
				if($image == null) $result 			= 0;
				$tile  				= $json->profile_background_tile;
				$bgcolor  			= $json->profile_background_color;
				$profile_text_color = $json->profile_text_color;
				$profile_link_color = $json->profile_link_color;
				$profile_sidebar_fill_color = $json->profile_sidebar_fill_color;
				$profile_sidebar_border_color = $json->profile_sidebar_border_color;
			}			
		}
		$json = array("result" 						=> $result,
					  "image"						=>$image,
					  "tile"						=>$tile,
					  "bgcolor"						=>$bgcolor,
					  "profile_text_color"			=>$profile_text_color,
					  "profile_link_color"			=>$profile_link_color,
					  "profile_sidebar_fill_color"	=>$profile_sidebar_fill_color,
					  "profile_sidebar_border_color"=>$profile_sidebar_border_color
					  ); 
		$encoded = json_encode($json);
		echo $encoded;
		unset($encoded);
	}
}	
?>