(function($){	
	$.fn.exchange = function(options) {  
		
		var defaults = {
		};
		var options = $.extend(defaults, options);
		(readCookie('css')) ? exchangeCSS(readCookie('css')) : "";
		
		return this.each(function() {  
			obj = $(this);
			$("#exchanger").css({"display":"block"});
			//click event on change css buttons
			
			$("select", obj).change(function(e){
					exchangeCSS($(this).val());
					return false;
			});
			
		});  
		
		function createCookie(name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		}
		function readCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}
		function exchangeCSS(css){
			$('link').each(function() {
				var _link = $(this);
				_link.attr("disabled",true);
				(_link.attr('title') == css) ? _link.attr("disabled",false) : "";
			});
			createCookie('css', css, 365);
		}
		
	};
})(jQuery);
	