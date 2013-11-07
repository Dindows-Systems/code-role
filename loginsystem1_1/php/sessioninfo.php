<?php
class SessionInfo
{
	private $username;     				//Username given on sign-up : email
	private $userkey;      				//pk_user in db user table
	
	private $userid;       				//Random value generated on current login (for login purposes)
	private $logged_in;    				//True if user is logged in, false otherwise
	private $userinfo = array();  		//The array holding some of the user data 

	public function __construct(){
	}
	
	public function setLoggedIn($lggin){
		$this->logged_in = $lggin;
	}
	
	public function setUserName($username){
		$this->username = $username;
	}
	
	public function setUserId($userid){
		$this->userid = $userid;
	}
	
	public function setUserInfo($userinfo){
		$this->userinfo = $userinfo;
	}
	
	public function setUserKey($userkey){
		$this->userkey = $userkey;
	}
	
	public function getUserName(){
		return $this->username;
	}

	
	public function getUserId(){
		return $this->userid;
	}
	
	public function getUserInfo($attr){
		return $this->userinfo[$attr];
	}
	
	public function getUserKey(){
		return $this->userkey;
	}
	
	public function isLoggedIn(){
		return $this->logged_in;
	}

};
?>
