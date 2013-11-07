<?php
/*
** Class for connecting and manage the mysql database
*/
require_once("constants.php");
require_once("utils.php");

class DBController{
	
	private $link;
	
	public function __construct(){
		mb_internal_encoding("UTF-8");
		mb_regex_encoding("UTF-8");
		$this->link = mysqli_connect(DB_SERVER, DB_USER, DB_PASS,DB_NAME);
		if (mysqli_connect_errno()) {
		    exit();
		}
	}
	
	public function __destruct() {
		$this->disconnect();
	}
	
	/*
	 * checks if user with email "$username" and password "$password" exists
	 * */
	public function confirmUserPass($username, $password){
		$username = mysqli_real_escape_string($this->link,$username);
		/* Verify that user is in database */
		$q = "SELECT password FROM users WHERE email = '$username'";
		$results = mysqli_query($this->link,$q);
		if(!$results || (mysqli_num_rows($results) < 1)){
			mysqli_free_result($results);
			return -1; //Indicates username failure
		}
		$dbarray = mysqli_fetch_array($results,MYSQLI_ASSOC);
		$dbarray['password'] = stripslashes($dbarray['password']);
		$password = stripslashes($password);
		mysqli_free_result($results);
		
		if($password == $dbarray['password']){
			return 1; //Success, Username and password confirmed
		}
		else{
			return -2; //Indicates password failure
		}
	}

   
	/**
    * confirmUserID - Checks whether or not the given
    * username is in the database, if so it checks if the
    * given userid is the same userid in the database
    * for that user. If the user doesn't exist or if the
    * userids don't match up, it returns an error code
    */
	public function confirmUserID($username, $userid){
		$username = mysqli_real_escape_string($this->link,$username);

		/* Verify that user is in database */
		$q = "SELECT usr_userid FROM users WHERE pk_user = '$username'";
		
		$results = mysqli_query($this->link,$q);
	  	  
		if(!$results || (mysqli_num_rows($results) < 1)){
			mysqli_free_result($results);
			return -1; //Indicates username failure
		}

		/* Retrieve userid from result, strip slashes */
		$dbarray = mysqli_fetch_array($results,MYSQLI_ASSOC);
		$dbarray['usr_userid'] = stripslashes($dbarray['usr_userid']);
		$userid = stripslashes($userid);
		mysqli_free_result($results);	
		/* Validate that userid is correct */

		if($userid == $dbarray['usr_userid']){
			return 1; //Success! Username and userid confirmed
		}
		else{
			return -2; //Indicates userid invalid
		}
   }
   
	/*
	* dbemailTaken - Returns true if the email has
	* been taken by another user, false otherwise.
	*/
	public function dbemailTaken($email){
		$email = mysqli_real_escape_string($this->link,$email);
		$q = "SELECT email FROM users WHERE email = '$email'";
		$results = mysqli_query($this->link,$q);
		$numr = mysqli_num_rows($results);
		mysqli_free_result($results);	
		return ($numr > 0);
	}
   
   
	/*
	** registers a user in the system, and returns user key if successfull
	*/
	public function dbregister($email, $pass, $flname, $hash, $country_code){
		
		$email 			= mysqli_real_escape_string($this->link,$email);
		$pass 			= mysqli_real_escape_string($this->link,$pass);
		$flname 		= mysqli_real_escape_string($this->link,$flname);
		$country_code	= mysqli_real_escape_string($this->link,$country_code);
		
		$ip = getRealIpAddr();
		
		//############### INSERTION ###############	
		mysqli_autocommit($this->link,FALSE);
		mysqli_query($this->link,"SET NAMES 'utf8'");
		$q = "insert into users(pk_user,email,flname,password,usr_confirm_hash,country_code,usr_ip) values('NULL','$email','$flname','$pass','$hash','$country_code','$ip')";
	    
		mysqli_query($this->link,$q);
		if(mysqli_errno($this->link)){
			mysqli_rollback($this->link);
			return -1;
		}
		else{
			mysqli_commit($this->link);
			$result = mysqli_query($this->link,'SELECT LAST_INSERT_ID() as lid');
			$obj = $result->fetch_object();
			$lastinsertedid = $obj->lid;
			$result->close();
			unset($obj);
			return $lastinsertedid;
		}
		return -1;
	}  
   

    
	/*
	 * checks if user with email "$email" did already the confirmation of the account
	 * */
    public function is_confirmed($username){
		$q = "SELECT usr_is_confirmed FROM users WHERE email = '$username'";	  	
		$results = mysqli_query($this->link,$q);
		$dbarray = mysqli_fetch_array($results,MYSQLI_ASSOC);
		$is_confirmed = $dbarray['usr_is_confirmed'];
		mysqli_free_result($results);
		if($is_confirmed == 1){
			return 1; //Success! 
		}
		else{
			return -1; //Indicates failure
		}
	} 

	/*
	* checks if user with email "$email" is blocked
	* */
    public function is_blocked($username){
		$q = "SELECT usr_is_blocked FROM users WHERE email = '$username'";	  	
		$results = mysqli_query($this->link,$q);
		$dbarray = mysqli_fetch_array($results,MYSQLI_ASSOC);
		$usr_is_blocked = $dbarray['usr_is_blocked'];
		mysqli_free_result($results);
		if($usr_is_blocked == 1){
			return 1; //blocked
		}
		else{
			return -1; //Indicates failure
		}
	} 
	
    /*
     * checks if the resethash is associated with the email in the users table
     */
	public function dbconfirmResetPasswordHash($email,$hash){
		$email = mysqli_real_escape_string($this->link,$email);
		$q = "SELECT pk_user FROM users WHERE email = '$email' and usr_resetpassword_hash = '$hash'";	
		$results = mysqli_query($this->link,$q);
		
		$numr = mysqli_num_rows($results);
		mysqli_free_result($results);	
		if($numr > 0) 
			return 1; 
		else
			return -1;
	}

	/**
    * updateUserField - Updates a field, specified by the field
    * parameter, in the user's row of the database, given the pk_user
    */
	public function updateUserField($userkey, $field, $value){
		$q = "UPDATE users SET ".$field." = '$value' WHERE pk_user = '$userkey'";	
		mysqli_query($this->link,$q);
		if(mysqli_errno($this->link)){
			return -1;
		}
		return 1;
	}
	
	/**
    * deleteUser - Deletes a User
    */
	public function deleteUser($userkey){
		$q = "DELETE from users WHERE pk_user = '$userkey'";	
		mysqli_query($this->link,$q);
		if(mysqli_errno($this->link)){
			return -1;
		}
		return 1;
	}
	
	/**
    * updateUserFieldEmail - Updates a field, in the user's row of the database, given the email
    */
	public function updateUserFieldEmail($email, $field, $value){
		$email = mysqli_real_escape_string($this->link,$email);
		$q = "UPDATE users SET ".$field." = '$value' WHERE email = '$email'";	
		return mysqli_query($this->link,$q);
	}
	
	/**
    * dbgetUserInfo - Returns the result array from a mysql
    * query asking for some data regarding
    * the given username(email). If query fails, NULL is returned.
    */
	public function dbgetUserInfoEmail($email){
		$email = mysqli_real_escape_string($this->link,$email);
		$q = "SELECT pk_user,email,usr_userid FROM users WHERE email = '$email'";		
		$results = mysqli_query($this->link,$q);
		/* Error occurred, return given name by default */
		if(!$results || (mysqli_num_rows($results) < 1)){
			mysqli_free_result($results);
			return NULL;
		}
		/* Return result array */
		$dbarray = mysqli_fetch_array($results,MYSQLI_ASSOC);
		mysqli_free_result($results);
		return $dbarray;
	}
	
	/**
    * dbgetUserInfo - Returns the result array from a mysql
    * query asking for some data regarding
    * the given username(pk_user). If query fails, NULL is returned.
    */
	public function dbgetUserInfo($username){
		$username = mysqli_real_escape_string($this->link,$username);
		$q = "SELECT pk_user,email,usr_userid FROM users WHERE pk_user = '$username'";		
		$results = mysqli_query($this->link,$q);
		/* Error occurred, return given name by default */
		if(!$results || (mysqli_num_rows($results) < 1)){
			mysqli_free_result($results);
			return NULL;
		}
		/* Return result array */
		$dbarray = mysqli_fetch_array($results,MYSQLI_ASSOC);
		mysqli_free_result($results);
		return $dbarray;
	}

	/**
    * dbgetUserAccountDetails - Returns the result array from a mysql
    * query asking for some data regarding
    * the given username(email). If query fails, NULL is returned.
    */
	public function dbgetUserAccountDetails($userkey){
		$q = "SELECT U.*,C.country_name FROM users U,Country C WHERE U.pk_user = '$userkey' AND C.country_code = U.country_code";
			
		$results = mysqli_query($this->link,$q);
		/* Error occurred, return given name by default */
		if(!$results || (mysqli_num_rows($results) < 1)){
			mysqli_free_result($results);
			return NULL;
		}
		/* Return result array */
		$dbarray = mysqli_fetch_array($results,MYSQLI_ASSOC);
		mysqli_free_result($results);
		return $dbarray;
	}	
	
	public function user_confirm($urlemail,$urlhash) {
		$new_hash = sha1($urlemail.supersecret_hash_padding);
		if ($new_hash && ($new_hash == $urlhash)) {
			$q = "SELECT email FROM users WHERE usr_confirm_hash = '$new_hash'";
			$results = mysqli_query($this->link,$q);
			
			if (!$results || (mysqli_num_rows($results) < 1)) {
				$feedback = 'ERROR -- Hash not found';
				mysqli_free_result($results);
				return $feedback;
			} 
			else {
			// Confirm the email and set account to active
			$email = $urlemail;
			$hash = $urlhash;

			$query = "UPDATE users SET usr_is_confirmed='1' WHERE usr_confirm_hash='$hash'";
			mysqli_query($this->link,$query);
			return 1;
			}
		} 
		else {
			$feedback = 'ERROR -- Values do not match';
			return $feedback;
		}
	}

	/*
	* checks if value matches a field in the table users
	*/
	public function matchUserField($value,$field,$userkey){
		$value 			= mysqli_real_escape_string($this->link,$value);
		$q = "SELECT pk_user FROM users WHERE ".$field." = '$value' and pk_user = '$userkey'";
		
		$results = mysqli_query($this->link,$q);
		$numr = mysqli_num_rows($results);
		mysqli_free_result($results);	
		return ($numr > 0);
	} 
	
	/*
	** changes the user account details, and returns 1 successfull
	*/
	public function dbeditaccount($email, $flname, $country_code, $pass, $userkey){
		
		$email 			= mysqli_real_escape_string($this->link,$email);
		$pass 			= mysqli_real_escape_string($this->link,$pass);
		$flname 		= mysqli_real_escape_string($this->link,$flname);
		$country_code	= mysqli_real_escape_string($this->link,$country_code);
		
		//############### UPDATE ###############	
		mysqli_autocommit($this->link,FALSE);
		mysqli_query($this->link,"SET NAMES 'utf8'");
		$q="";
		if($pass)
			$q = "UPDATE users SET email='$email',flname='$flname',password='$pass',country_code='$country_code' where pk_user = '$userkey'";
	    else
	    	$q = "UPDATE users SET email='$email',flname='$flname',country_code='$country_code' where pk_user = '$userkey'";
		
	    mysqli_query($this->link,$q);
		if(mysqli_errno($this->link)){
			mysqli_rollback($this->link);
			return -1;
		}
		else{
			mysqli_commit($this->link);
			return 1;
		}
		return -1;
	}  
	
	/*
	* checks if a country typed by the user exists in the table country. Returns the id of the country, or null
	*/
	public function dbexistsCountry($country_name){
		$country_name_lower = mb_strtolower(html_entity_decode($country_name,ENT_NOQUOTES, 'UTF-8'));
		$q = "SELECT country_code FROM Country WHERE LOWER(country_name) = '$country_name_lower'";	
		$results = mysqli_query($this->link,$q);		
		if(!$results || (mysqli_num_rows($results) < 1)){
			mysqli_free_result($results);
			return null; //Indicates country check failure
		}
		$dbarray = mysqli_fetch_array($results,MYSQLI_ASSOC);
		$dbarray['country_code'] = stripslashes($dbarray['country_code']);
		mysqli_free_result($results);	
		return $dbarray['country_code'];
	}  
	
	/**
	*	Increments the number of logins of a user
	**/
	public function incrementLogins($userkey){
		$q = "SELECT usr_nmb_logins FROM users WHERE pk_user = '$userkey'";
		$results = mysqli_query($this->link,$q);
		if(!$results || (mysqli_num_rows($results) < 1)){
			mysqli_free_result($results);
			return -1;
		}
		else{
			$dbarray = mysqli_fetch_array($results,MYSQLI_ASSOC);
			$nmb_logins = $dbarray['usr_nmb_logins'];
			$nmb_logins_inc = $nmb_logins + 1 ;
			mysqli_free_result($results);
			
			mysqli_autocommit($this->link,FALSE);
			$qu = "update users set usr_nmb_logins = '$nmb_logins_inc' WHERE pk_user = '$userkey'";
			mysqli_query($this->link,$qu);
			
			if(mysqli_errno($this->link)){
				mysqli_rollback($this->link);
				return -2;//Indicates error updating row
			}
			else{
				mysqli_commit($this->link);
				return 1;
			}
		}
		return -3;
	}
	
	/*
	 * returns the array with the users per country info
	 * note: it just includes the users that have their accounts confirmed!
	 * It does not includes the user viewing this (admin)
	 * */
	public function getUsersPerCountry($userkey){
		$q = "SELECT COUNT(*) AS value,users.country_code,country_name FROM users INNER JOIN Country ON Country.country_code = users.country_code WHERE usr_is_confirmed=1 and pk_user <> '$userkey' GROUP BY users.country_code";		
		$results = mysqli_query($this->link,$q);
		/* Error occurred, return given name by default */
		if(!$results || (mysqli_num_rows($results) < 1)){
			mysqli_free_result($results);
			return NULL;
		}
		/* Return result array */
		
		$aResults = array();
		while ($row = $results->fetch_assoc()) {
			$aResults[] = array( "country_name"=>$row['country_name'] ,"value"=>$row['value']);
		}
		mysqli_free_result($results);
		return $aResults;
	}

	/*
	 * returns the array with the users data
	 * */
	public function getUsersData($userkey){
		mysqli_query($this->link,"SET NAMES 'utf8'");	
		$q = "SELECT pk_user,country_name,email,flname,usr_ip,usr_nmb_logins,usr_signup_date,usr_is_blocked,usr_is_admin FROM users INNER JOIN Country ON Country.country_code=users.country_code WHERE usr_is_confirmed=1 and pk_user <> '$userkey'";		
		
		$results = mysqli_query($this->link,$q);
		/* Error occurred, return given name by default */
		if(!$results || (mysqli_num_rows($results) < 1)){
			mysqli_free_result($results);
			return NULL;
		}
		/* Return result array */
		$aResults = array();
		while ($row = $results->fetch_assoc()) {
			$aResults[] = array( "pk_user"=>$row['pk_user'] ,"country_name"=>$row['country_name'] ,"email"=>$row['email'],"flname"=>$row['flname'],"usr_ip"=>$row['usr_ip'],"usr_nmb_logins"=>$row['usr_nmb_logins'],"usr_signup_date"=>$row['usr_signup_date'],"usr_is_blocked"=>$row['usr_is_blocked'],"usr_is_admin"=>$row['usr_is_admin']);
		}
		mysqli_free_result($results);
		return $aResults;
	}
	
	/**
    * query - Performs the given query on the database and
    * returns the result, which may be false, true or a
    * resource identifier.
    */
	public function query($query){
		return mysqli_query($this->link,$query);
	}
    
	public function disconnect(){
		mysqli_close($this->link);
	}   
    

}; 
?>
