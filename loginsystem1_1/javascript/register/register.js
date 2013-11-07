$(document).ready(function() {
	
	Register.initEventHandlers();
});

var EmailProvider = {
	getProvider : function(email) {
		return email.substring(email.indexOf('@')+1,email.lastIndexOf('.'));
	},
	getProviderAddress : function(email) {
		var provider = this.getProvider(email);
		switch (provider.toLowerCase()){
			case 'gmail': 
				return "http://mail.google.com";
				break;
			case 'hotmail': 
				return "www.hotmail.com";
				break;	
			default :
				return "";
			//and so on...
		}
	}
};
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
var Register = {
		initEventHandlers: function () {
			$("#_register_btt").click(function(e){
				Register.processSubmit();
			});
			$('.inplaceError').each(
				function(i) {
					var $this = $(this)
					$this.focus(function(e){
						$("#"+ $this.attr('id') +"_error").html('');
					});
				}
			);
		},
		processSubmit: function (event) {
			$('#_register_btt').hide();	
			$('#ajaxld').show();
			setTimeout("Register.formsubmit()",500);
		},
		formsubmit: function () {
			var url = '../php/corecontroller.php?ts='+new Date().getTime();
			$.post(url, $('#form_register').serialize(), Register.onsubmitcomplete,"json");
		},
		onsubmitcomplete : function(data,textStatus){
			//alert(data.name);
			if(textStatus == "success"){
					if(data.result == "1"){
						//register sucessful
						$('#ajaxld').hide();
						var htmlstr = "";
						htmlstr += "<div class='reg_message'>";
						htmlstr += "<h1>Confirm your registration</h1><p>You are just one step away from doing whatever you came here to do! A link has been sent to your email account for you to confirm.</p>";
						
	                    var mailaddress = EmailProvider.getProviderAddress($('#email').val());
						if(mailaddress != "")
							htmlstr += "<p>"+"go to your email account: " + "<a href='"+mailaddress + "'<span>"+mailaddress+"</span></a></p></div>";	
						else
							htmlstr += "</div>";	
						$('#reg').html(htmlstr);
	                    
					}
					else if(data.result == "-2"){
						alert("an error ocurred bla bla we should put a message for this...");
						$('#ajaxld').hide();
						$('#_register_btt').show();
						$('#reg').html("<span>an error occurred bla bla</span>");
					}
					else{//errors with form -1
						for(var i=0; i < data.errors.length; i++ ){
							if(data.errors[i].value!="")
								$("#"+data.errors[i].name+'_error').html("<div class='errorimg'>"+data.errors[i].value+"</div>");
						}
						$('#ajaxld').hide();
						$('#_register_btt').show();
						//reload the captcha
						eval('javascript:Recaptcha.reload()');
					}
				//}				
			}
			else if(textStatus == "error")//TODO - it can be of more types!
			{
					alert("error ajax");
					$('#ajaxld').hide();
					$('#reg').innerHTML = "<span>an error occurred bla bla try later</span>";
			}
		}

};

//we dont need this now
//BrowserDetect.init();