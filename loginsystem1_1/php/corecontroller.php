<?php
require_once("core.php");

if(isset($_POST['registeractionx'])||
   isset($_POST['loginaction'])||
   isset($_POST['forgetpasswordaction'])||
   isset($_POST['resetpasswordaction'])||
   isset($_POST['editaccountactionx'])){
	$objCore = new Core();
	$objCore->initSessionInfo();
	$objCore->initFormController();
	$objCore->initMailerService();
	$objCore->dispatchAction();
	unset($objCore);
}
else if(isset($_GET['logoutaction'])){
	$objCore = new Core();
	$objCore->initSessionInfo();
	$objCore->dispatchAction();
	unset($objCore);
}
else if(isset($_GET['mapdata'])){
	$objCore = new Core();
	$objCore->initSessionInfo();
	if($objCore->isAdmin())
		$objCore->dispatchAction();
	else{ 
		unset($objCore);
		header("Location: ../public_html/index.php");
	}		
	unset($objCore);
}
else if(isset($_POST['adminopactionx'])){
	$objCore = new Core();
	$objCore->initSessionInfo();
	if($objCore->isAdmin())
		$objCore->dispatchAction();
	else{ 
		unset($objCore);
		header("Location: ../public_html/index.php");
	}		
	unset($objCore);
}
else{
	header("Location: ../public_html/index.php");
}
?>