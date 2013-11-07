<?php
require_once("../php/core.php");

$objCore = new Core();

$objCore->initSessionInfo();
$objCore->initFormController();

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Strict//EN">
<html>
    <head>
        <title>PHP Login System</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">      
        <link rel="stylesheet" type="text/css" href="../css/style.css" />

        <script type="text/javascript" language="javascript" src="../javascript/jquery-1.3.2.js"></script>
        <script type="text/javascript" language="javascript" src="../javascript/index.js"></script>
    </head>
    <body>
        <?php
        if($objCore->getSessionInfo()->isLoggedIn()){
	        echo "<h1>Logged In</h1>";
	        echo "Welcome <b>".$objCore->getSessionInfo()->getUserInfo('email')."</b>, you are logged in. <br><br>"
	        ."<a href=\"../editaccount.php\">[Edit Account]</a> &nbsp;&nbsp;";
	        if($objCore->isAdmin())
	        	echo "<a href=\"../admin.php\">[admin]</a> &nbsp;&nbsp;";
	        echo "<a href=\"../php/corecontroller.php?logoutaction=1\">[Logout]</a>";
        }
        else{
        ?>     
	
       
           <h1>Login</h1>	 
            <form name="login" id="login" action="../php/corecontroller.php" method="POST" class="login">
                <label>email</label>
                <input class="inplaceError" style="width:140px;" type="text" id="email" name="email" maxlength="120" value="<?php echo $objCore->getFormController()->value("email"); ?>"/>
                <span></span>
                <label>password</label>
                <input class="inplaceError" style="width:140px;" type="password" id="pass" name="pass" maxlength="20" value="<?php echo $objCore->getFormController()->value("pass"); ?>"/>
                <span></span>
                <div class="login_row">
                    <input type="checkbox" name="remember" <?php if($objCore->getFormController()->value("remember") != ""){ echo "checked"; } ?>/>
                    <label>remember me</label>
                </div>
                <input type="hidden" name="loginaction" value="1"/>
				<a class="button" id="login_button">Login</a>
                <div id="loginerror" class="error">
                <?php echo $objCore->getFormController()->error("email"); ?>
                <?php echo $objCore->getFormController()->error("pass"); ?>
            </div>
                <p>Did you forget your password? Click <a href="../password_forget.php">here</a></p>
				<p>Don't have an account yet? <a href="../register">Register</a></p>
            </form>
            
            
      
	 <div class="linkback"><a href="http://www.tympanus.net">Codrops</a></div>
        <?php
        }
        unset($objCore);
        ?>
    </body>
</html>