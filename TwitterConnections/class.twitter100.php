<?php
class Twitter100{

	private $screen_name;
	private $api = array('friends' 		=> 'http://twitter.com/statuses/friends.json',
						 'followers'	=> 'http://twitter.com/statuses/followers.json',
						 'show' 		=> 'http://twitter.com/users/show/'
						);

	public function __construct($screen_name){
		$this->screen_name 	=  $screen_name;
	}
	
	public function countUsers($type){
		$total = 0;
		$callstr = $this->api['show'].$this->screen_name.'.json'; 
		
		$ch = curl_init($callstr);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$apiresponse = curl_exec($ch);
		curl_close($ch);
		
		if ($apiresponse) {
			$json = json_decode($apiresponse);
			if (($json != null)&&(!$json->error)){
				if($type=='Friends') 
					$total 		= $json->friends_count;
				else if($type=='Followers')				
					$total 		= $json->followers_count;
			}			
		}
		return $total;
	}
	
	public function getUsers($type){
		$total = $this->countUsers($type);
		
		$images = array();
		$result = 1;
		if($type=='Friends') $callstr = $this->api['friends'].'?screen_name='.$this->screen_name; 
		if($type=='Followers') $callstr = $this->api['followers'].'?screen_name='.$this->screen_name; 
		$ch = curl_init($callstr);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$apiresponse = curl_exec($ch);
		curl_close($ch);
		$res = $div1 = $div2 = $div3 = $div4 = '';
		
		$i=1;
		if ($apiresponse) {
			$json = json_decode($apiresponse);
			if ($json != null){
				if($json->error) $result=0;
				else{ 
					foreach ($json as $u){
						$images[] = $u->profile_image_url;
						
						if($i>25&&$i<=50){
							if($i==26)
								$div2='<div style="display:none;" id="2"><a class="_img_profile" href="http://www.twitter.com/'.$u->screen_name.'"><img width="35px" heigth="35px" src="'.$u->profile_image_url.'"></img><input class="_name" type="hidden" value="'.$u->screen_name.'"></input><input class="_nmb_followers" type="hidden" value="'.$u->followers_count.'"></input><input class="_nmb_friends" type="hidden" value="'.$u->friends_count.'"></input></a>';
							else
								$div2.='<a class="_img_profile" href="http://www.twitter.com/'.$u->screen_name.'"><img width="35px" heigth="35px" src="'.$u->profile_image_url.'"></img><input class="_name" type="hidden" value="'.$u->screen_name.'"></input><input class="_nmb_followers" type="hidden" value="'.$u->followers_count.'"></input><input class="_nmb_friends" type="hidden" value="'.$u->friends_count.'"></input></a>';
						}
						else if($i>50&&$i<=75){
							if($i==51)
								$div3='<div style="display:none;" id="3"><a class="_img_profile" href="http://www.twitter.com/'.$u->screen_name.'"><img width="35px" heigth="35px" src="'.$u->profile_image_url.'"></img><input class="_name" type="hidden" value="'.$u->screen_name.'"></input><input class="_nmb_followers" type="hidden" value="'.$u->followers_count.'"></input><input class="_nmb_friends" type="hidden" value="'.$u->friends_count.'"></input></a>';
							else
								$div3.='<a class="_img_profile" href="http://www.twitter.com/'.$u->screen_name.'"><img width="35px" heigth="35px" src="'.$u->profile_image_url.'"></img><input class="_name" type="hidden" value="'.$u->screen_name.'"></input><input class="_nmb_followers" type="hidden" value="'.$u->followers_count.'"></input><input class="_nmb_friends" type="hidden" value="'.$u->friends_count.'"></input></a>';
						}
						else if($i>75&&$i<=100){
							if($i==76)
								$div4='<div style="display:none;" id="4"><a class="_img_profile" href="http://www.twitter.com/'.$u->screen_name.'"><img width="35px" heigth="35px" src="'.$u->profile_image_url.'"></img><input class="_name" type="hidden" value="'.$u->screen_name.'"></input><input class="_nmb_followers" type="hidden" value="'.$u->followers_count.'"></input><input class="_nmb_friends" type="hidden" value="'.$u->friends_count.'"></input></a>';
							else
								$div4.='<a class="_img_profile" href="http://www.twitter.com/'.$u->screen_name.'"><img width="35px" heigth="35px" src="'.$u->profile_image_url.'"></img><input class="_name" type="hidden" value="'.$u->screen_name.'"></input><input class="_nmb_followers" type="hidden" value="'.$u->followers_count.'"></input><input class="_nmb_friends" type="hidden" value="'.$u->friends_count.'"></input></a>';
						}
						else{
							if($i==1)
								$div1='<div id="1"><a class="_img_profile" href="http://www.twitter.com/'.$u->screen_name.'"><img width="35px" heigth="35px" src="'.$u->profile_image_url.'"></img><input class="_name" type="hidden" value="'.$u->screen_name.'"></input><input class="_nmb_followers" type="hidden" value="'.$u->followers_count.'"></input><input class="_nmb_friends" type="hidden" value="'.$u->friends_count.'"></input></a>';
							else
								$div1.='<a class="_img_profile" href="http://www.twitter.com/'.$u->screen_name.'"><img width="35px" heigth="35px" src="'.$u->profile_image_url.'"></img><input class="_name" type="hidden" value="'.$u->screen_name.'"></input><input class="_nmb_followers" type="hidden" value="'.$u->followers_count.'"></input><input class="_nmb_friends" type="hidden" value="'.$u->friends_count.'"></input></a>';
						}
						++$i;
					}
				}			
			}	
		
			$n_divs = 0;
			if($div1!=''){
				$div1.='</div>';
				$res.=$div1;
				++$n_divs;
			}	
			if($div2!=''){
				$div2.='</div>';
				$res.=$div2;
				++$n_divs;
			}
			if($div3!=''){
				$div3.='</div>';
				$res.=$div3;
				++$n_divs;
			}
			if($div4!=''){
				$div4.='</div>';
				$res.=$div4;
				++$n_divs;
			}
			if($result == 1){
			    if($type=='Friends')
					$link = "http://www.twitter.com/".$this->screen_name."/following";
				else
					$link = "http://www.twitter.com/".$this->screen_name."/followers";
				$res.='<div class="jf-more" style="display:none;" id="'.($n_divs+1).'"><a href="'.$link.'">See all on Twitter</a></div>';
			}	
		}
		else
			$result = -1;
			
		$json = array("result" => $result,"images" => $images,"res" => $res,"total" => $total); 
		$encoded = json_encode($json);
		echo $encoded;
		unset($encoded);
	}
}	
?>