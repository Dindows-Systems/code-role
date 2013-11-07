$(document).ready(function() {
	PasswProcess.initEventHandlers();
});

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();


var PasswProcess = {
	
	init: function () {
	},	
	
	initEventHandlers : function(){
		if($('#_forgetpassw_btt')){
			$("#_forgetpassw_btt").click(function(e){
				PasswProcess.processPasswordSubmit();
			});
		}
		if($('#_resetpassw_btt')){
			$("#_resetpassw_btt").click(function(e){
				PasswProcess.processResetSubmit();
			});
		}
		$('.inplaceError').each(
				function(i) {
					var $this = $(this)
					$this.focus(function(e){
						$("#"+ $this.attr('id') +"_error").html('');
					});
				}
		);
	},
	processPasswordSubmit : function(event){
		$('#_forgetpassw_btt').hide();
		$('#ajaxld').show();
		setTimeout("PasswProcess.formPasswsubmit()",500);
	},
	formPasswsubmit : function(){
		var url = 'php/corecontroller.php?ts='+new Date().getTime();
		_obj = this;
		$.post(url, $('#form_passwprocess').serialize(), PasswProcess.onsubmitpasswcomplete,"json");
	},
	onsubmitpasswcomplete : function(data,textStatus){
		if(textStatus == "success"){
			if(data.result == "1"){
				//register sucessful
				$('#ajaxld').hide();
				var htmlstr = "";
				htmlstr += "<p>Soon you will receive an email at "+$('#email').val()+" with a link to reset your password!</p>";
				$('#pagecontent').html(htmlstr);
			}
			else if(data.result == "-1"){
				for(var i=0; i < data.errors.length; i++ ){
					if(data.errors[i].value!="")
						$("#"+data.errors[i].name+'_error').html("<div class='errorimg'>"+data.errors[i].value+"</div>");
				}
				$('#ajaxld').hide();
				$('#_forgetpassw_btt').show();
			}
			else{
				alert("an error ocurred bla bla we should put a message for this...");
				$('#ajaxld').hide();
				$('#_forgetpassw_btt').show();
				$('#pagecontent').html("<span>an error occurred bla bla</span>");
			}
		}
		else if(textStatus == "error")//TODO - it can be of more types!
		{
				alert("error ajax");
				$('#ajaxld').hide();
				$('#_forgetpassw_btt').show();
				//TODO
				$('#pagecontent').html("<span>an error occurred bla bla try later</span>");
		}
	},
	
	

	processResetSubmit : function(event){
		$('#_resetpassw_btt').hide();
		$('#ajaxld').show();
		setTimeout("PasswProcess.formResetsubmit()",500);
	},
	formResetsubmit : function(){
		var url = 'php/corecontroller.php?ts='+new Date().getTime();
		_obj = this;
		$.post(url, $('#form_resetprocess').serialize(), PasswProcess.onsubmitresetwcomplete,"json");
	},
	onsubmitresetwcomplete	: function(data,textStatus){
		if(textStatus == "success"){
			if(data.result == "1"){
				//register sucessful
				$('#ajaxld').hide();
				var htmlstr = "";
				htmlstr += "<p>done now it should login(todo). <a href='public_html'>Log in</a></p>";
				$('#pagecontent').html(htmlstr);
			}
			else if(data.result == "-1"){
				for(var i=0; i < data.errors.length; i++ ){
					if(data.errors[i].value!="")
						$("#"+data.errors[i].name+'_error').html("<div class='errorimg'>"+data.errors[i].value+"</div>");
				}
				$('#ajaxld').hide();
				$('#_resetpassw_btt').show();
			}
			else{
				alert("an error ocurred bla bla we should put a message for this...");
				$('#ajaxld').hide();
				$('#_resetpassw_btt').show();
				$('#pagecontent').html("<span>an error occurred bla bla</span>");
			}
		}
		else if(textStatus == "error")//TODO - it can be of more types!
		{
				alert("error ajax");
				$('#ajaxld').hide();
				$('#_resetpassw_btt').show();
				//TODO
				$('#pagecontent').html("<span>an error occurred bla bla try later</span>");
		}
		
	}
};