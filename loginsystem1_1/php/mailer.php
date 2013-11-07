<?php 
class Mailer
{

	public function __construct(){
	}
	
	
	public function sendForReg($email, $hash, $flname){
		$encoded_email = urlencode($email);
		$from = "From: ".EMAIL_FROM_NAME." <".EMAIL_FROM_ADDR.">";
		$subject = "Registration in codrops/loginsystem";
		$body = "Hi ".$flname."\n"
			 ."You registered in codrops/loginsystem "
             .".........\n\n"
             ."Click on this link to activate your account:\n\n"
			 .CONFIRMACCOUNTLINK."?hash=$hash&email=$encoded_email";

		return mail($email,$subject,$body,$from);
	}
	
	public function sendMail($emailtosend,$message_subject,$message_body,$headers){
		return mail($emailtosend,$message_subject,$message_body,$headers);
	}
   
};
?>
