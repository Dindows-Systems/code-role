<?php
/*UTILS.php*/


/* generateRandID - Generates a string made up of randomized letters (lower and upper case) 
and digits and returns the md5 hash of it to be used as a userid */
function generateRandID(){
	return md5(generateRandStr(16));
}

function generateRandStr($length){
	$randstr = "";
	for($i=0; $i<$length; $i++){
		$randnum = mt_rand(0,61);
		if($randnum < 10){
			$randstr .= chr($randnum+48);
		}
		else if($randnum < 36){
			$randstr .= chr($randnum+55);
		}else{
			$randstr .= chr($randnum+61);
		}
	}
	return $randstr;
}

//returns the real ip address of a user
function getRealIpAddr(){
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
      $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
      $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
//returns the exact age of a user
function age($month, $day, $year){
    //(checkdate($month, $day, $year) == 0) ? die("no such date.") : "";
    $y = gmstrftime("%Y");
    $m = gmstrftime("%m");
    $d = gmstrftime("%d");
    $age = $y - $year;
    if($m <= $month)
    {
        if($m == $month)
        {
            if($d < $day) $age = $age - 1;
        }
        else $age = $age - 1;
    }
    return($age);
} 




?>