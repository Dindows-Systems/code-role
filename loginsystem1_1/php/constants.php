<?php
define("DB_SERVER", "XXXXXXXXXXXX");
define("DB_USER", "XXXXXXXXXXXX");
define("DB_PASS", "XXXXXXXXXXXX");
define("DB_NAME", "XXXXXXXXXXXX");

/**
 * Cookie Constants - these are the parameters
 * to the setcookie function call, change them
 * if necessary to fit your website. If you need
 * help, visit www.php.net for more info.
 * <http://www.php.net/manual/en/function.setcookie.php>
 */
define("GUEST_NAME", "Guest");
define("COOKIE_EXPIRE", 60*60*24*100);  //100 days by default
define("COOKIE_PATH", "/");  //Avaible in whole domain
/**
 * Email Constants - these specify what goes in
 * the from field in the emails that the script
 * sends to users, and whether to send a
 * welcome email to newly registered users.
 */
define("EMAIL_FROM_NAME", "codrops");
define("EMAIL_FROM_ADDR", "www.tympanus.net");
/**
 * This constant forces all users to have
 * lowercase usernames, capital letters are
 * converted automatically.
 */
define("ALL_LOWERCASE", false);

/**
 *For hashing purposes  
 **/
define("supersecret_hash_padding",'String used to pad out small strings for a sha1 encryption');
define("supersecret_hash_padding_2",'Other String used to pad out small strings for a sha1 encryption');

/**
 *If you want that the user has to repeat the E-Mail and/or the Password
 *in the registration form , set the following to true or false  
 **/
define("REPEAT_EMAIL",true);
define("REPEAT_PASSWORD",true);


/*
 * the link on your server to the file resetpassword.php and confirm.php
 * these are gonna be used in the mail body 
 * */
define("RESETPASSWORDLINK","http://www.tympanus.net/loginsystem2/resetpassword.php");
define("CONFIRMACCOUNTLINK","http://www.tympanus.net/loginsystem2/php/confirm.php");

/*
 * recaptcha keys:
 * */
define("PUBLICKEY","XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
define("PRIVATEKEY","XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
?>