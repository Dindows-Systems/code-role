<?php
include("dbcontroller.php");

//if the user gets here by any other way:
if(!isset($_GET['input']))
	header("Location: ../index.php");
else{
	$dbcontroller = new DBController();	
	$field = strtolower( $_GET['field'] );
	$noresultscountries = false;
	
	if($field == 'country'){	
		$dbvalues = $dbcontroller->query("SELECT country_code,country_name FROM Country");
		$columnname = "country_name";
		$columnid = "country_code";
	}	
		
	if(!$dbvalues || (mysqli_num_rows($dbvalues) < 1)){
		mysqli_free_result($dbvalues);
		$noresultscountries = true;
	}
	
	$input = mb_convert_case($_GET['input'], MB_CASE_LOWER, "UTF-8"); 
	$len = strlen($input);
	$limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 0;
	
	//array holding the info
	$aResults = array();
	$count = 0;

	if (($len)&&(!$noresultscountries)){	
		while ($row = $dbvalues->fetch_assoc()) {
			if (mb_convert_case(substr(html_entity_decode(htmlentities(utf8_encode($row[$columnname]))),0,$len), MB_CASE_LOWER, "UTF-8") == $input){
				$count++;
				$aResults[] = array( "id"=>$row[$columnid] ,"value"=>htmlentities($row[$columnname]));
			}
			if ($limit && $count==$limit) break;
		}
		mysqli_free_result($dbvalues);
	}
	
	header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past
	header ("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT"); // always modified
	header ("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
	header ("Pragma: no-cache"); // HTTP/1.0

	if ((isset($_REQUEST['json']))&&(!$noresultscountries))
	{
		header("Content-Type: application/json");
	
		echo "{\"results\": [";
		$arr = array();
		for ($i=0;$i<count($aResults);$i++)
		{
			$arr[] = "{\"id\": \"".$aResults[$i]['id']."\", \"value\": \"".$aResults[$i]['value']."\"}";
		}
		echo implode(", ", $arr);
		echo "]}";
	}
	else echo "{\"results\": []}";
	
	unset($dbcontroller);
}
?>