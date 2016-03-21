<?php
class TwitterFirstFollower{
	
	private $screen_name;
	
	public function __construct($screen_name){
		$this->screen_name = $screen_name;	
	}
	
	public function getFirstFollower(){
		$cursor = "-1";
		while ($cursor != "0") {
			$handle = "http://twitter.com/followers/ids/$this->screen_name.xml?cursor=$cursor";
			$tw = curl_init();
			curl_setopt($tw, CURLOPT_URL, $handle);
			curl_setopt($tw, CURLOPT_RETURNTRANSFER, TRUE);
			$twi = curl_exec($tw);
			$data = new SimpleXMLElement($twi);
			if($data->error){
				$json = array("res" => -1,"output" => "You probably provided a User that doesn't exist, or the twitter rate limit exceeded. Clients may not make more than 150 requests per hour."); 
				$encoded = json_encode($json);
				echo $encoded;
				unset($encoded);
				break;
			}
			if($data->next_cursor == 0){
				$result = $data->xpath('//id[position() = last()]');
				while(list( , $node) = each($result)) {
					$handle2 = "http://twitter.com/users/show/$node.xml";
				}
				$tw2 = curl_init();
				curl_setopt($tw2, CURLOPT_URL, $handle2);
				curl_setopt($tw2, CURLOPT_RETURNTRANSFER, TRUE);
				$twi2 = curl_exec($tw2);
				$data2 = new SimpleXMLElement($twi2);
				$output = '<h1>And the winner is:</h1><p><img src="'.$data2->profile_image_url.'"/><a id="winner" href="http://twitter.com/'.$data2->screen_name.'">'.$data2->name.'</a></p>';
				$json = array("res" => 1,"output" => $output); 
				$encoded = json_encode($json);
				echo $encoded;
				unset($encoded);		
				curl_close($tw2);
			
			}	
			$cursor = $data->next_cursor;
			curl_close($tw);
		}
	}
}
?>