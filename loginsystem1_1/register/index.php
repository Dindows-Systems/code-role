<?php
require_once("../php/core.php");
$objCore = new Core();
$objCore->initSessionInfo();
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN">
<html>
    <head>
        <title>PHP Login System</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <link rel="stylesheet" type="text/css" href="../css/style.css" />
            <link rel="stylesheet" href="../css/autosuggest/autosuggest_inquisitor.css" type="text/css" media="screen" charset="utf-8" />
            <script type="text/javascript" language="javascript" src="../javascript/jquery-1.3.2.js"></script>
            <script type="text/javascript" language="javascript" src="../javascript/autosuggest/bsn.AutoSuggest_2.1.3.js" charset="utf-8"></script>
            <script type="text/javascript" language="javascript" src="../javascript/register/register.js"></script>
    </head>
    <body>
        <div id="main">
		<a class="backlink" href="../public_html">Back</a>
            <?
            /**
            * The user is already logged in, not allowed to register.
            */
            if($objCore->getSessionInfo()->isLoggedIn()) {
            echo "<h1>Registered</h1>";
            echo "<p>We're sorry <b>$session->username</b>, but you've already registered. "
                ."<a href=\"../public_html/\">Main</a>.</p>";
            }
            else {
            ?>
            <div id="reg">
                <h1>Registration</h1>
                <form name="form_register" id="form_register" action="" method="" class="register">
                    <fieldset class="fieldset1">
                        <legend>Personal Details</legend>
                        <label>First and Last name</label>
                        <input type="text" class="inplaceError" id="flname" name="flname" maxlength="100" value=""/>
                        <div class="error" id="flname_error"></div>
                        <label>Country</label>
                        <input class="inplaceError" style="width: 140px" type="text" id="country" name="country" value=""/>
						<input type="hidden" name="country_code" id="country_code" value="-1"/>
                        <div style="height:25px;" class="error" id="country_error"></div>
                        <p>For inserting a country, just start typing and wait a little. A drop down is going to be shown and you can pick your country.</p>
                     </fieldset>
                     <fieldset class="fieldset1">  
                        <legend>Account Details</legend>
                        <label>E-Mail</label>
                        <input type="text" class="inplaceError" id="email" name="email" maxlength="120" value=""/>
                        <div class="error" id="email_error"></div>
                        <?php 
                    	if(REPEAT_EMAIL){
                    	?>
                    	<label>Repeat E-Mail</label>
                        <input type="text" class="inplaceError" id="confemail" name="confemail" maxlength="120" value=""/>
                        <div class="error" id="confemail_error"></div>
                        <?php 
                    	}
                        ?>
                        <label>Password</label>
                        <input type="password" class="inplaceError" id="pass" name="pass" maxlength="20" value=""/>
                        <div class="error" id="pass_error"></div>
                    	<?php 
                    	if(REPEAT_PASSWORD){
                    	?>
                    	<label>Repeat password</label>
                        <input type="password" class="inplaceError" id="confpass" name="confpass" maxlength="20" value=""/>
                        <div class="error" id="confpass_error"></div>
                        <?php 
                    	}
                        ?>
                    </fieldset>
                   
                    <fieldset class="fieldset2">
                        <legend>Verification</legend>
                         <script>
								var RecaptchaOptions = {
								   theme: 'clean',
								   lang: 'en'
								};
						</script>
						
						<?php            
						require_once('../php/recaptchalib.php');
						$publickey = PUBLICKEY; // you got this from the signup page
						echo recaptcha_get_html($publickey);
						?>
						<div class="error" id="recaptcha_response_field_error"></div>
                    </fieldset>
                    <input type="hidden" name="registeractionx" value="1"/>

                </form>
                
                <a id="_register_btt" class="button">Register</a>
                <img class="ajaxload" style="display:none;" id="ajaxld" src="../images/ajax-loader.gif"/>
            </div>

        </div>

        <?php
        }
        unset($objCore);
        ?>
		<script type="text/javascript">
			var options_country = {
				script:"../php/suggestion.php?json=true&limit=10&field=country&",
				varname:"input",
				json:true,
				shownoresults:false,
				maxresults:10,
				callback: function (obj) { $('#country_code').val(obj.id); }
			};
			var as_json_country = new bsn.AutoSuggest('country', options_country);
		</script>		
    </body>
</html>
