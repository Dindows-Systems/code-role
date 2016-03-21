// JavaScript Document
clearField = function(eleM, compString){
	var fieldValue = eleM.value;
	if(fieldValue.toLowerCase() == compString.toLowerCase()){
		eleM.value = '';
	}
}

fillField = function(eleM, compString){
	var fieldValue = eleM.value;
	if(fieldValue.toLowerCase() == ''){
		eleM.value = compString;
	}
}

