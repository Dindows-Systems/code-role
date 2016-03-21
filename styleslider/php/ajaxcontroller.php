<?php
require_once("db.php");
if(isset($_GET['load'])||isset($_GET['save'])){
	$db = new DB();
	$db->execute();
	unset($db);
}
else{
	header("Location: ../slider/index.php");
}
?>