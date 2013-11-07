<?php 
class FormController
{
	private $values = array();  //Holds submitted form field values
	private $errors = array();  //Holds submitted form error messages
	private $num_errors;   		//The number of errors in submitted form

	public function __construct(){
		/* Get form value and error arrays, used when there is an error with a user-submitted form */
		if(isset($_SESSION['value_array']) && isset($_SESSION['error_array'])){
			$this->values = $_SESSION['value_array'];
			$this->errors = $_SESSION['error_array'];
			$this->num_errors = count($this->errors);

			unset($_SESSION['value_array']);
			unset($_SESSION['error_array']);
		}
		else{
			$this->num_errors = 0;
		}
	}

	public function __destruct(){
		unset($values);
		unset($errors);
	}
	
	/* Records the value typed into the given form field by the user */
	public function setValue($field, $value){
		$this->values[$field] = $value;
	}

	/* Records new form error given the form field name and the error message attached to it */
	public function setError($field, $errmsg){
		$this->errors[$field] = $errmsg;
		$this->num_errors = count($this->errors);
	}

	/* Returns the value attached to the given field, if none exists, the empty string is returned */
	public function value($field){
		if(array_key_exists($field,$this->values)){
			return htmlspecialchars(stripslashes($this->values[$field]));//TODO
		}else{
			return "";
		}
	}

	/* Returns the error message attached to the given field, if none exists, the empty string is returned */
	public function error($field){
		if(array_key_exists($field,$this->errors)){
			return "<div class='errorimg'>".$this->errors[$field]."</div>";
		}else{
			return "";
		}
	}

	public function error_value($field){
		if(array_key_exists($field,$this->errors)){
			return $this->errors[$field];
		}else{
			return "";
		}
	}
	
	/* getErrorArray - Returns the array of error messages */
	public function getErrorArray(){
		return $this->errors;
	}
	
	public function formCountErrors(){
		return $this->num_errors;
	}
};
?>