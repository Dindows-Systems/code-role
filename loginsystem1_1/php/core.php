<?php
require_once("sessioninfo.php");
require_once("dbcontroller.php");
require_once("formcontroller.php");
require_once("mailer.php");
require_once('recaptchalib.php');
class Core{
	
	private $url;          				/* The page url current being viewed */
	private $referrer;     				/* Last recorded site page viewed */
	
	private $sessioninfo;				/* The session object */		
	private $dbcontroller;				/* The database object */
	private $formcontroller;			/* The form object - holds form submited values and errors*/
	private $mailer;					/* The mail object - sends mails ... */
	
	public function __construct(){
		session_start();
	}
	
	public function __destruct(){
		unset($this->sessioninfo);
		unset($this->dbcontroller);
		unset($this->formcontroller);
		unset($this->mailer);
	}
	
	/*
	 * starts the sessioninfo object and the dbcontroller and checks if user is logged in
	* */
	public function initSessionInfo(){
		
		$this->sessioninfo 	= new SessionInfo();
		$this->dbcontroller = new DBController();
		
		$cl = $this->checkLogin(); 
		$this->sessioninfo->setLoggedIn($cl);
		if(!$cl){
			$this->sessioninfo->setUserName(GUEST_NAME);
			$this->setSessionVariable('username',GUEST_NAME);
		}

		if(isset($_SESSION['url'])){
			$this->referrer = $_SESSION['url'];
		}else{
			$this->referrer = "/";
		}
		$this->url = $_SERVER['PHP_SELF'];
		$this->setSessionVariable('url',$_SERVER['PHP_SELF']);
	}
	
	/*
	 * starts the formcontroller object
	 * */
	public function initFormController(){
		$this->formcontroller = new FormController();
	}
	
	/*
	 * starts the mailer object
	 * */
	public function initMailerService(){
		$this->mailer 	= new Mailer();
	}
	
	
	
	/* 
	 * Based on what comes in the POST, it triggers the right process function.
	 * */
	public function dispatchAction(){
		
		if(isset($_POST['loginaction'])){
			$this->processLogin();
		}
		else if(isset($_POST['registeractionx'])){
			$retuserkey = $this->processRegisterx();
		}
		else if(isset($_POST['forgetpasswordaction'])){
			$this->processForgotPassword();
		}
		else if(isset($_POST['resetpasswordaction'])){
			$this->processResetPassword();
		}
		else if(isset($_GET['logoutaction'])){
			$this->processLogout();
		}
		else if(isset($_POST['editaccountactionx'])){
			$retuserkey = $this->processEditAccountx();
		}
		else if(isset($_GET['mapdata'])){
			$this->processMapRequest();
		}
		else if(isset($_POST['adminopactionx'])){
			$this->processAdminOperation();
		}
		/* Should not get here, which means user is viewing this page by mistake and therefore is redirected */
		else{
			header("Location: ../public_html/index.php");
		}
	}

	/*
	 * checks if user is logged in (including if the user set the remember me feature)
	 * */
	public function checkLogin(){
		/* if remember me feature activated (cookies set) */
		if(isset($_COOKIE['cookname']) && isset($_COOKIE['cookid'])){
			$this->sessioninfo->setUserName($_COOKIE['cookname']); 
			$this->setSessionVariable('username',$_COOKIE['cookname']);
			
			$this->sessioninfo->setUserId($_COOKIE['cookid']);
			$this->setSessionVariable('userid',$_COOKIE['cookid']);
		}

		if(isset($_SESSION['username']) && isset($_SESSION['userid']) && $_SESSION['username'] != GUEST_NAME){
			/* Confirm that username and userid are valid */
			if($this->dbcontroller->confirmUserID($_SESSION['username'], $_SESSION['userid']) != 1){
				/* Variables are incorrect, user not logged in */
				$this->unsetSessionVariable('username');
				$this->unsetSessionVariable('userid');
				return false;
			}

			/* User is logged in, set class variables */
			$this->sessioninfo->setUserInfo($this->dbcontroller->dbgetUserInfo($_SESSION['username']));
			$this->sessioninfo->setUserName($this->sessioninfo->getUserInfo('pk_user'));
			$this->sessioninfo->setUserId($this->sessioninfo->getUserInfo('usr_userid'));
			$this->sessioninfo->setUserKey($this->sessioninfo->getUserInfo('pk_user'));
			return true;
		}
		else{ 				/* User not logged in */
			return false;
		}	
	}
	
	/*
	 * processes the login action
	 * */
	public function processLogin(){
		/* Login attempt */	  
		$retval = $this->__login($_POST['email'], $_POST['pass'],isset($_POST['remember']));      
		/* Login successful */
		if($retval){
			header("Location: ".$this->referrer);
		}
		/* Login failed */
		else{
			$this->setSessionVariable('value_array',$_POST);
			$this->setSessionVariable('error_array',$this->formcontroller->getErrorArray());
			header("Location: ".$this->referrer);
		}
	}
	
	/*
	 * process when user clicks the forgot password link and 
	 * types his email for receiving a mail with instructions
	 * to reset the password 
	 */
	public function processForgotPassword(){
		$email = mb_strtolower($_POST['email']);
		
		//validations:
		//1 - if email typed
		//2 - if email is valid
		//3 - if email exists in db
		
		$field = "email";  //Use field name for email
	  
		if(!$email || mb_strlen($email = trim($email)) == 0){
			$this->formcontroller->setError($field, "Email not entered");
		}
		else{
			/* Check if valid email address */
			$regex = "^[_+a-z0-9-]+(\.[_+a-z0-9-]+)*"
                 ."@[a-z0-9-]+(\.[a-z0-9-]{1,})*"
                 ."\.([a-z]{2,}){1}$";
			if(!mb_eregi($regex,$email)){
				$this->formcontroller->setError($field, "Invalid Email");
			}
			else if(mb_strlen(trim($email)) > 120){
				$this->formcontroller->setError($field, "Email too big");
			}
			/* Check if email is already in use */
			else if(!$this->dbcontroller->dbemailTaken($email)){
				$this->formcontroller->setError($field, "Email does not exists in the system");
			}
		}
		
		if($this->formcontroller->formCountErrors() > 0){
			$json = array(
				"result" => -1, 
				"errors" => array(
								array("name" => "email","value" => $this->formcontroller->error_value("email"))
								)
				);
							
			$encoded = json_encode($json);
			echo $encoded;
			unset($encoded);
		}
		else{
			$this->initMailerService();
			//generates an hash and inserts in table users for the user with email: $email 
			$time = time();
			$hash = sha1($email.supersecret_hash_padding.supersecret_hash_padding_2.$time);
			$retval = $this->dbcontroller->updateUserFieldEmail($email,"usr_resetpassword_hash",$hash);
			//then sends an email with that hash for that email!			
			$message_subject="reset password";
			$encoded_email = urlencode($email);
			$message_body="click here ".RESETPASSWORDLINK."?c=$hash&email=$encoded_email"; 
			$headers="From: ".EMAIL_FROM_NAME." <".EMAIL_FROM_ADDR.">";
			$this->mailer->sendMail($email,$message_subject,$message_body,$headers);
			$json = array("result" => 1); 
			$encoded = json_encode($json);
			echo $encoded;
			unset($encoded);
		}
	}
	
	/*
	 * user clicked on a link sent to his email account for reseting the password.
	 * this link contains an hash and his email. checks if the hash
	 * is associated to this email in the user table 
	 * */
	public function confirmResetPasswordData($email,$hash){
		$email = urldecode($email);
		$retval = $this->dbcontroller->dbconfirmResetPasswordHash($email,$hash);
		return $retval;
	}
	
	/* 
	 * user types new password for the reset process
	 * */ 
	public function processResetPassword(){
		//make validations:
		$pass1 = mb_strtolower($_POST['password']);
		$pass2 = mb_strtolower($_POST['password2']);
		
		$field = "password";
		if(!$pass1){
			$this->formcontroller->setError($field, "Password not entered");
		}
		elseif(mb_strlen(trim($pass1)) < 8){
			$this->formcontroller->setError($field, "8 characters necessary");
		}
		elseif(mb_strlen(trim($pass1)) > 20){
			$this->formcontroller->setError($field, "Password too big");
		}
		elseif (mb_eregi("^((root)|(bin)|(daemon)|(adm)|(lp)|(sync)|(shutdown)|
(halt)|(mail)|(news)|(uucp)|(operator)|(games)|(mysql)|
(httpd)|(nobody)|(dummy)|(www)|(cvs)|(shell)|(ftp)|(irc)|
(debian)|(ns)|(download))$", $pass1))
            $this->formcontroller->setError($field, "Password not allowed");
		elseif(!$pass2){
			$this->formcontroller->setError($field, "Second Password not entered");
		}
		elseif($pass2!=$pass1){
				$this->formcontroller->setError($field, "Passwords don't match");
		}
		
		if($this->formcontroller->formCountErrors() > 0){
			$json = array(
				"result" => -1, 
				"errors" => array(
								array("name" => "password","value" => $this->formcontroller->error_value("password"))
								)
				);
							
			$encoded = json_encode($json);
			echo $encoded;
			unset($encoded);
		}
		else{
			//change password:
			$email = $_SESSION['emailreset'];
			$this->dbcontroller->updateUserFieldEmail($email,'password',sha1($_POST['password']));
			$this->unsetSessionVariable('emailreset');
			$json = array("result" => 1); 
			$encoded = json_encode($json);
			echo $encoded;
			unset($encoded);
		}	
	}
	
	/*
	 * user loggs in 
	 * */
	public function __login($email, $pass, $subremember){
		$field = "email";
		if(!$email || strlen($email = trim($email)) == 0){
			$this->formcontroller->setError($field, "Email not entered");
			return false;
		}
		else{		
			/* Check if valid email address */
			$regex = "^[_+a-z0-9-]+(\.[_+a-z0-9-]+)*"
				   ."@[a-z0-9-]+(\.[a-z0-9-]{1,})*"
				   ."\.([a-z]{2,}){1}$";
			if(!mb_eregi($regex,$email)){
				$this->formcontroller->setError($field, "Invalid Email");
				return false;
			}
			else if(mb_strlen(trim($email)) > 120){
				$this->formcontroller->setError($field, "Email too big");
				return false;
			}
		}
		
		/* Password error checking */
		$field = "pass";
		if(!$pass){
			$this->formcontroller->setError($field, "Password not entered");
			return false;
		}
		elseif(mb_strlen(trim($pass)) > 20){
			$this->formcontroller->setError($field, "Password too big");
			return false;
		}
		elseif (mb_eregi("^((root)|(bin)|(daemon)|(adm)|(lp)|(sync)|(shutdown)|
		(halt)|(mail)|(news)|(uucp)|(operator)|(games)|(mysql)|(httpd)|(nobody)|
		(dummy)|(www)|(cvs)|(shell)|(ftp)|(irc)|(debian)|(ns)|(download))$", $pass)){
			$this->formcontroller->setError($field, "Password not allowed");
			return false;
		}
	  
	  
		/* Return if form errors exist */
		if($this->formcontroller->formCountErrors() > 0){
			return false;
		}

		/* Checks that username is in database and password is correct */
		//$email = stripslashes($email);
		
		$result = $this->dbcontroller->confirmUserPass($email, sha1($pass));

		/* Check error codes */
		if($result == -1){
			$field = "email";
			$this->formcontroller->setError($field, "Email not found");
		}
		else if($result == -2){
			$field = "pass";
			$this->formcontroller->setError($field, "Invalid password");
			return false;
		}
		else{
			$result2 = $this->dbcontroller->is_confirmed($email);
			if($result2 == -1){
				$field = "email";
				$this->formcontroller->setError($field, "Not yet confirmed via email");
				return false;
			}
			$result3 = $this->dbcontroller->is_blocked($email);
			if($result3 == 1){
				$field = "email";
				$this->formcontroller->setError($field, "Your account is blocked");
				return false;
			}
		}
		/* Return if form errors exist */
		if($this->formcontroller->formCountErrors() > 0){
			return false;
		}
		/* Username and password correct, register session variables */
		$this->sessioninfo->setUserInfo($this->dbcontroller->dbgetUserInfoEmail($email));
		
		$this->sessioninfo->setUserName($this->sessioninfo->getUserInfo('pk_user'));
		$this->setSessionVariable('username',$this->sessioninfo->getUserInfo('pk_user'));
	    $this->sessioninfo->setUserKey($this->sessioninfo->getUserInfo('pk_user'));
		
		$rid = generateRandID();
		$this->setSessionVariable('userid',$rid);
		$this->sessioninfo->setUserId($rid);
		
		/* Insert userid into database and update active users table */
		$this->dbcontroller->updateUserField($this->sessioninfo->getUserKey(), "usr_userid", $this->sessioninfo->getUserId());
		/* Increment number of logins */
		$this->dbcontroller->incrementLogins($this->sessioninfo->getUserKey());
		
		
		/**
		* This is the cool part: the user has requested that we remember that
        * he's logged in, so we set two cookies. One to hold his username,
        * and one to hold his random value userid. It expires by the time
        * specified in constants.php. Now, next time he comes to our site, we will
        * log him in automatically, but only if he didn't log out before he left.
        */
		if($subremember){
			setcookie("cookname", $this->sessioninfo->getUserKey(), time()+COOKIE_EXPIRE, COOKIE_PATH);
			setcookie("cookid",   $this->sessioninfo->getUserId(),   time()+COOKIE_EXPIRE, COOKIE_PATH);
		}
		
		/* Login completed successfully */
		return true;
	}	
	
	/*
	 * processes the logout action
	 * */
	public function processLogout(){
		$retval = $this->__logout();
		header("Location: ../public_html/index.php");
	}
	
	/*
	 * user loggs out
	 * */
	public function __logout(){
		/* Delete cookies - the time must be in the past, so just negate what you added when creating the cookie */
		if(isset($_COOKIE['cookname']) && isset($_COOKIE['cookid'])){
			setcookie("cookname", "", time()-COOKIE_EXPIRE, COOKIE_PATH);
			setcookie("cookid",   "", time()-COOKIE_EXPIRE, COOKIE_PATH);
		}
				
		$this->unsetSessionVariable('username');
		$this->unsetSessionVariable('userid');
	  
		$this->sessioninfo->setLoggedIn(false);
		$this->dbcontroller->disconnect();
		$this->sessioninfo->setUserName(GUEST_NAME);
	}
	
	
	/*
	 * processes the register action - this action starts
	 * on an ajax call
	 * */
	public function processRegisterx(){
		/* Convert username to all lowercase (by option) */
		if(ALL_LOWERCASE){
			$_POST['email'] = mb_strtolower($_POST['email']);
		}
	  
		/* Registration attempt */
		$retuserkey = $this->__register( $_POST['email'],$_POST['pass'],$_POST['flname'],$_POST['country'],$_POST['country_code'],$_POST['confemail'],$_POST['confpass']);      
		/* Registration Successful */
		if($retuserkey > 0){
			$json = array("result" => 1); 
			$encoded = json_encode($json);
			echo $encoded;
			unset($encoded);
		}
		/* Error found with form */
		else if($retuserkey == -1){
			
			$json = array(
				"result" => -1, 
				"errors" => array(
								array("name" => "email","value" => $this->formcontroller->error_value("email")),
								array("name" => "pass","value" => $this->formcontroller->error_value("pass")),
								array("name" => "flname","value" => $this->formcontroller->error_value("flname")),
								array("name" => "recaptcha_response_field","value" => $this->formcontroller->error_value("recaptcha_response_field")),
								array("name" => "country","value" => $this->formcontroller->error_value("country")),
								array("name" => "confemail","value" => $this->formcontroller->error_value("confemail")),
								array("name" => "confpass","value" => $this->formcontroller->error_value("confpass"))
								)
				);
							
			$encoded = json_encode($json);
			echo $encoded;
			unset($encoded);		
		}
		/* Registration attempt failed */
		else if($retuserkey == -2){
			$json = array("result" => -2);
			$encoded = json_encode($json);
			echo $encoded;
			unset($encoded);	
		}
		if($retuserkey > 0) return $retuserkey;return -1;
	}
	
	/*
	* registers a user.
	* returns error code or the user key if success
	*/
	public function __register($email, $pass, $flname, $country, $country_code, $confemail, $confpass){
				
		/******Email error checking ******/
		$field = "email";  //Use field name for email
	  
		if(!$email || mb_strlen($email = trim($email)) == 0){
			$this->formcontroller->setError($field, "Email not entered");
		}
		else{
			/* Check if valid email address */
			$regex = "^[_+a-z0-9-]+(\.[_+a-z0-9-]+)*"
                 ."@[a-z0-9-]+(\.[a-z0-9-]{1,})*"
                 ."\.([a-z]{2,}){1}$";
			if(!mb_eregi($regex,$email)){
				$this->formcontroller->setError($field, "Invalid Email");
			}
			else if(mb_strlen(trim($email)) > 120){
				$this->formcontroller->setError($field, "Email too big");
			}
			/* Check if email is already in use */
			else if($this->dbcontroller->dbemailTaken($email)){
				$this->formcontroller->setError($field, "Email already in use");
			}

		}	  

		/********* Email Confirm error checking*******/
		if(REPEAT_EMAIL){
			$field = "confemail";  //Use field name for confemail
			if(!$confemail){
				$this->formcontroller->setError($field, "Email not entered");
			}
			if($confemail!=$email){
				$this->formcontroller->setError($field, "Emails don't match");
			}  
		}
		/**** Password error checking*****/
		$field = "pass";  //Use field name for password
		if(!$pass){
			$this->formcontroller->setError($field, "Password not entered");
		}
		else{
			if(mb_strlen(trim($pass)) < 8){
				$this->formcontroller->setError($field, "8 characters necessary");
			}
			else if(mb_strlen(trim($pass)) > 20){
				$this->formcontroller->setError($field, "Password too big");
			}
			else if (mb_eregi("^((root)|(bin)|(daemon)|(adm)|(lp)|(sync)|(shutdown)|
(halt)|(mail)|(news)|(uucp)|(operator)|(games)|(mysql)|
(httpd)|(nobody)|(dummy)|(www)|(cvs)|(shell)|(ftp)|(irc)|
(debian)|(ns)|(download))$", $pass))
            $this->formcontroller->setError($field, "Password not allowed");
		}
		
		/********* Password Confirm error checking*******/
		if(REPEAT_PASSWORD){
			$field = "confpass";  //Use field name for confpassword
			if(!$confpass){
				$this->formcontroller->setError($field, "Password not entered");
			}
			if($confpass!=$pass){
				$this->formcontroller->setError($field, "Passwords don't match");
			}  
		}
		/***************************** First and Last Name error checking *************************/
		$field = "flname";  
		
		if(!$flname || mb_strlen($flname = trim($flname)) == 0){
			$this->formcontroller->setError($field, "Name not entered");
		}
		else if(!mb_eregi("^[[:alpha:] ]*$", $flname))
			$this->formcontroller->setError($field, "Name invalid");	
		else if (mb_eregi("^((root)|(bin)|(daemon)|(adm)|(lp)|(sync)|(shutdown)|
(halt)|(mail)|(news)|(uucp)|(operator)|(games)|(mysql)|
(httpd)|(nobody)|(dummy)|(www)|(cvs)|(shell)|(ftp)|(irc)|
(debian)|(ns)|(download))$", $flname))
			$this->formcontroller->setError($field, "Name not allowed");
		else if(mb_strlen(trim($flname)) > 100){
				$this->formcontroller->setError($field, "Name too big");
		}
		
		$flname = html_entity_decode($flname,ENT_NOQUOTES, 'UTF-8') ;
		
		/******************************** Captcha error checking *************************/
		$field = "recaptcha_response_field"; 		
		$privatekey = PRIVATEKEY;
		$resp = recaptcha_check_answer ($privatekey,
		                                $_SERVER["REMOTE_ADDR"],
		                                $_POST["recaptcha_challenge_field"],
		                                $_POST["recaptcha_response_field"]);
		
		if (!$resp->is_valid) {
		  $this->formcontroller->setError($field, "please type again");	
		  //die ("The reCAPTCHA wasn't entered correctly. Go back and try it again." . //   "(reCAPTCHA said: " . $resp->error . ")");
		}
		
		/******************************** Country error checking *************************/	
		$field = "country"; 
		if(!$country || mb_strlen($country = trim($country)) == 0){
			$this->formcontroller->setError($field, "Country not entered");
		}
		else{
			//if the code of the country that is posted is different than -1 (the user selected a country from the list):
			if($country_code == -1){ 
				//the user selected a country but it was not one of the list:
				//check if the country typed by the user exists in table of countries(lower case both)
				//if so inserts that as the country of the user otherwise gives back an error saying that the user has to select 
				//a country from the list
				$db_country_code = $this->dbcontroller->dbexistsCountry($country);
				if($db_country_code == null){
					$this->formcontroller->setError($field, "Please choose a country from the list");
				}
				else $country_code = $db_country_code;
				
			}
		}	
			
			
		/* Errors exist, have user correct them */
		if($this->formcontroller->formCountErrors() > 0){
			return -1;  //Errors with form
		}
		/* No errors, add the new account to the db*/
		else{
			
			$hash = sha1($email.supersecret_hash_padding);
			
	        if(($retuserkey = $this->dbcontroller->dbregister($email, sha1($pass), $flname, $hash, $country_code)) > 0){	
				//if user was successfuly registered, lets send an email where he can activate his account!
				$this->mailer->sendForReg($email,$hash,$flname);
				return $retuserkey;  //New user added succesfully
			}
			else{
				return -2;  //Registration attempt failed
			}
	  }
	}

	/*
	 * processes the editaccount action - this action starts
	 * on an ajax call
	 * */
	public function processEditAccountx(){
		/* Convert username to all lowercase (by option) */
		if(ALL_LOWERCASE){
			$_POST['email'] = mb_strtolower($_POST['email']);
		}
	  
		/* Edit Account attempt */
		$ret = $this->__editaccount( $_POST['email'],$_POST['flname'],$_POST['country'],$_POST['country_code'],$_POST['currpass'],$_POST['pass'],$_POST['confpass']);      
		/* Edit Account Successful */
		if($ret > 0){
			$json = array("result" => 1); 
			$encoded = json_encode($json);
			echo $encoded;
			unset($encoded);
		}
		/* Error found with form */
		else if($ret == -1){
			
			$json = array(
				"result" => -1, 
				"errors" => array(
								array("name" => "email","value" => $this->formcontroller->error_value("email")),
								array("name" => "currpass","value" => $this->formcontroller->error_value("currpass")),
								array("name" => "flname","value" => $this->formcontroller->error_value("flname")),
								array("name" => "country","value" => $this->formcontroller->error_value("country")),
								array("name" => "pass","value" => $this->formcontroller->error_value("pass")),
								array("name" => "confpass","value" => $this->formcontroller->error_value("confpass"))
								)
				);
							
			$encoded = json_encode($json);
			echo $encoded;
			unset($encoded);		
		}
		/* Edit Account attempt failed */
		else if($ret == -2){
			$json = array("result" => -2);
			$encoded = json_encode($json);
			echo $encoded;
			unset($encoded);	
		}
		if($ret > 0) return $ret;return -1;
	}
	
	
/*
	* registers a user.
	* returns error code or 1 if success
	*/
	public function __editaccount($email, $flname, $country, $country_code, $currpass, $pass, $confpass){
				
		/******Email error checking ******/
		$field = "email";  //Use field name for email
	  
		if(!$email || mb_strlen($email = trim($email)) == 0){
			$this->formcontroller->setError($field, "Email not entered");
		}
		else{
			/* Check if valid email address */
			$regex = "^[_+a-z0-9-]+(\.[_+a-z0-9-]+)*"
                 ."@[a-z0-9-]+(\.[a-z0-9-]{1,})*"
                 ."\.([a-z]{2,}){1}$";
			if(!mb_eregi($regex,$email)){
				$this->formcontroller->setError($field, "Invalid Email");
			}
			else if(mb_strlen(trim($email)) > 120){
				$this->formcontroller->setError($field, "Email too big");
			}
			else if($this->dbcontroller->matchUserField($email,'email',$this->sessioninfo->getUserKey())){
				
			}
			/* Check if email is already in use */
			else if($this->dbcontroller->dbemailTaken($email)){
				$this->formcontroller->setError($field, "Email already in use");
			}

		}	  
		
		/*
		 *if new password and confirm password are empty dont process the password changes 
		 * */
		if(($pass)||($confpass)){
		/**** Current Password error checking*****/
		$field = "currpass";
		if(!$currpass){
			$this->formcontroller->setError($field, "Password not entered");
		}
		else{
			if(mb_strlen(trim($currpass)) < 8){
				$this->formcontroller->setError($field, "The Password is wrong.You are missing some characters");
			}
			else if(mb_strlen(trim($currpass)) > 20){
				$this->formcontroller->setError($field, "The Password is wrong.You are typing to many characters");
			}
			else if (mb_eregi("^((root)|(bin)|(daemon)|(adm)|(lp)|(sync)|(shutdown)|
(halt)|(mail)|(news)|(uucp)|(operator)|(games)|(mysql)|
(httpd)|(nobody)|(dummy)|(www)|(cvs)|(shell)|(ftp)|(irc)|
(debian)|(ns)|(download))$", $currpass))
            	$this->formcontroller->setError($field, "The Password is wrong");
            else if(!$this->dbcontroller->matchUserField(sha1($currpass),'password',$this->sessioninfo->getUserKey())){
				$this->formcontroller->setError($field, "The Password is wrong");
			}
		}
		
		
		
		
		
		/**** Password error checking*****/
		$field = "pass";  //Use field name for password
		if(!$pass){
			$this->formcontroller->setError($field, "Password not entered");
		}
		else{
			if(mb_strlen(trim($pass)) < 8){
				$this->formcontroller->setError($field, "8 characters necessary");
			}
			else if(mb_strlen(trim($pass)) > 20){
				$this->formcontroller->setError($field, "Password too big");
			}
			else if (mb_eregi("^((root)|(bin)|(daemon)|(adm)|(lp)|(sync)|(shutdown)|
(halt)|(mail)|(news)|(uucp)|(operator)|(games)|(mysql)|
(httpd)|(nobody)|(dummy)|(www)|(cvs)|(shell)|(ftp)|(irc)|
(debian)|(ns)|(download))$", $pass))
            $this->formcontroller->setError($field, "Password not allowed");
		}
		
		/********* Password Confirm error checking*******/
		if(REPEAT_PASSWORD){
			$field = "confpass";  //Use field name for confpassword
			if(!$confpass){
				$this->formcontroller->setError($field, "Password not entered");
			}
			if($confpass!=$pass){
				$this->formcontroller->setError($field, "Passwords don't match");
			}  
		}
		}
		/***************************** First and Last Name error checking *************************/
		$field = "flname";  
		
		if(!$flname || mb_strlen($flname = trim($flname)) == 0){
			$this->formcontroller->setError($field, "Name not entered");
		}
		else if(!mb_eregi("^[[:alpha:] ]*$", $flname))
			$this->formcontroller->setError($field, "Name invalid");	
		else if (mb_eregi("^((root)|(bin)|(daemon)|(adm)|(lp)|(sync)|(shutdown)|
(halt)|(mail)|(news)|(uucp)|(operator)|(games)|(mysql)|
(httpd)|(nobody)|(dummy)|(www)|(cvs)|(shell)|(ftp)|(irc)|
(debian)|(ns)|(download))$", $flname))
			$this->formcontroller->setError($field, "Name not allowed");
		else if(mb_strlen(trim($flname)) > 100){
				$this->formcontroller->setError($field, "Name too big");
		}
		
		$flname = html_entity_decode($flname,ENT_NOQUOTES, 'UTF-8') ;
		
		
		/******************************** Country error checking *************************/	
		$field = "country"; 
		if(!$country || mb_strlen($country = trim($country)) == 0){
			$this->formcontroller->setError($field, "Country not entered");
		}
		else{
			//if the code of the country that is posted is different than -1 (the user selected a country from the list):
			if($country_code == -1){ 
				//the user selected a country but it was not one of the list:
				//check if the country typed by the user exists in table of countries(lower case both)
				//if so inserts that as the country of the user otherwise gives back an error saying that the user has to select 
				//a country from the list
				$db_country_code = $this->dbcontroller->dbexistsCountry($country);
				if($db_country_code == null){
					$this->formcontroller->setError($field, "Please choose a country from the list");
				}
				else $country_code = $db_country_code;
				
			}
		}	
			
		/* Errors exist, have user correct them */
		if($this->formcontroller->formCountErrors() > 0){
			return -1;  //Errors with form
		}
		/* No errors, change the data in the db*/
		else{
			$sha1pass ="";
			if($pass)
				$sha1pass=sha1($pass);
			if(($ret = $this->dbcontroller->dbeditaccount($email, $flname, $country_code, $sha1pass, $this->sessioninfo->getUserKey())) > 0){	
				return $ret;  //User data changed succesfully
			}
			else{
				return -2;  //Edit Account failed failed
			}
	  }
	}
	
	/*
	 * processes the map request for admin - this action starts
	 * on an ajax call - gets number of users per country
	 * */
	public function processMapRequest(){
		$ret = $this->dbcontroller->getUsersPerCountry($this->sessioninfo->getUserKey());      
		echo "{\"results\": [";
		$arr = array();
		for ($i=0;$i<count($ret);$i++)
		{
			$arr[] = "{\"country_name\": \"".$ret[$i]['country_name']."\", \"value\": \"".$ret[$i]['value']."\"}";
		}
		echo implode(", ", $arr);
		echo "]}";
	}

	public function processAdminOperation(){
		$userkey = $_POST['uk'];
		$currentvalue = $_POST['currval'];
		$operation = $_POST['op'];
		if($operation=='block'){
			if($currentvalue == '0')
				$retval = $this->dbcontroller->updateUserField($userkey,'usr_is_blocked',1);
			else
				$retval = $this->dbcontroller->updateUserField($userkey,'usr_is_blocked',0);	
		}
		elseif($operation=='admin'){
			if($currentvalue == '0')
				$retval = $this->dbcontroller->updateUserField($userkey,'usr_is_admin',1);
			else
				$retval = $this->dbcontroller->updateUserField($userkey,'usr_is_admin',0);	
		}
		elseif($operation=='delete'){
			$retval = $this->dbcontroller->deleteUser($userkey);	
		}
		if($retval < 0)	
			$json = array("result" => -1);
		else
			$json = array("result" => 1);	
		$encoded = json_encode($json);
		echo $encoded;
		unset($encoded);		
	}
	
	/*
	 * gets all users data except the current user - for admin
	 * */
	public function getUsersData(){
		return $this->dbcontroller->getUsersData($this->sessioninfo->getUserKey());      
	}
	
	/*
	 * returns true if user is admin
	 * */	
	public function isAdmin(){
		$details = $this->dbcontroller->dbgetUserAccountDetails($this->sessioninfo->getUserKey());
		return ($details['usr_is_admin'] > 0);
	}
	
	/*
	 * returns user account details
	 * */	
	public function getUserAccountDetails(){
		return $this->dbcontroller->dbgetUserAccountDetails($this->sessioninfo->getUserKey());
	}
	
	
	/*
	 * returns sessioninfo obj
	 * */	
	public function getSessionInfo(){
		return $this->sessioninfo;
	}

	/*
	 * returns formcontroller obj
	 * */	
	public function getFormController(){
		return $this->formcontroller;
	}
	
	
	/*
	 * set a session variable 
	 * */
	public function setSessionVariable($name,$value){
		$_SESSION[$name] = $value;
	}
	
	
	/*
	 * unset a session variable 
	 * */
	public function unsetSessionVariable($name){
		unset($_SESSION[$name]);
	}

};

?>