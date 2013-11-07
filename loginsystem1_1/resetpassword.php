<?php
require_once("php/core.php");
$objCore = new Core();
$objCore->initSessionInfo();
if(isset($_GET['email']) && isset($_GET['c'])){
	$retval = $objCore->confirmResetPasswordData($_GET['email'],$_GET['c']);
	if($retval == 1){
		$objCore->setSessionVariable('emailreset',urldecode($_GET['email']));
		?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN">
<html>
    <head>
        <title>PHP Login System</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <link rel="stylesheet" type="text/css" href="css/style.css" />
            <script type="text/javascript" language="javascript" src="javascript/jquery-1.3.2.js"></script>
            <script type="text/javascript" language="javascript" src="javascript/register/passwprocess.js"></script>
    </head>
    <body>
        <div id="main">           
            <div id="pagecontent">
                <h1>Reset password</h1>
                <p>Please choose a new password for your account:</p>
                <form name="form_resetprocess" id="form_resetprocess" action="" method="" class="login">
                    <label style="width:120px;">Password</label>
                    <input class="inplaceError" type="password" id="password" name="password" maxlength="20" value=""/>
                    <label style="width:120px;">Repeat password</label>
                    <input class="inplaceError" type="password" id="password2" name="password2" maxlength="20" value=""/>
                    <input type="hidden" name="resetpasswordaction" value="1"/>
                    <div>
                        <a id="_resetpassw_btt" name="_resetpassw_btt" class="button">Reset</a>
                        <img style="display:none;" class="ajaxload" id="ajaxld" src="images/ajax-loader.gif"/>
                    </div>
                    <div id="password_error" class="error">
                        <!--div class="errorimg" style="display:none;">This is an error</div-->
                    </div>
                    <p>Suddenly remembered your old password? <a href="public_html/index.php">Back to login</a></p>
                </form>
            </div>
        </div>
    </body>
</html>

<?php
		unset($objCore);
		}
		else{
			unset($objCore);
			header("Location: public_html/index.php");
		}
}
else{
	unset($objCore);
	header("Location: public_html/index.php");
}
?>