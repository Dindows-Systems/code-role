(function($) {
	
	$.fn.feedback = function(options) {
		var opts = $.extend({}, $.fn.feedback.defaults, options);
		return this.each(function() {
			$this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			
			$this.click(function(e){
					if($('.jbar-feedback').length){
						$.fn.feedback.removestatus();
					}
					if($('.jbar').length){
						$.fn.feedback.removebar();
					}
					if(o.status == 'ok')
						var obj = $(document.createElement('a')).addClass('jbar-feedback jbar-ok');
					else if(o.status == 'error')
						var obj = $(document.createElement('a')).addClass('jbar-feedback jbar-error');
					switch(o.position){
						case 'topright':
							obj.css({'top':'2px','right':'2px'});
							break;
						case 'bottomright':
							obj.css({'bottom':'2px','right':'2px'});
							break;
						case 'topleft':
							obj.css({'top':'2px','left':'2px'});
							break;
						case 'bottomleft':
							obj.css({'bottom':'2px','left':'2px'});
							break;	
					}	
					obj.fadeIn().insertBefore($('.content'));
					obj.click(
						function(e){
							$.fn.feedback.removestatus();
							if(o.message)
								$.fn.feedback.showbar(o);
						}
					);
					stimeout = setTimeout('$.fn.feedback.removestatus()',o.time);
			})
		});
	};
	var timeout;
	var stimeout;
	$.fn.feedback.removebar 	= function() {
		if($('.jbar').length){
			clearTimeout(timeout);
			$('.jbar').fadeOut('fast',function(){
				$(this).remove();
			});
		}	
	};
	$.fn.feedback.removestatus 	= function() {
		if($('.jbar-feedback').length){
			clearTimeout(stimeout);
			$('.jbar-feedback').fadeOut('fast',function(){
				$(this).remove();
			});
		}	
	};
	$.fn.feedback.showbar 	= function(o) {
			if($('.jbar').length){
				$.fn.feedback.removebar();
			}
			timeout = setTimeout('$.fn.feedback.removebar()',o.time);
			var _message_span = $(document.createElement('span')).addClass('jbar-content').html(o.message);
			_message_span.css({"color" : o.color});
			var _wrap_bar;
			(o.barposition == 'bottom') ? 
			_wrap_bar	  = $(document.createElement('div')).addClass('jbar jbar-bottom'):
			_wrap_bar	  = $(document.createElement('div')).addClass('jbar jbar-top') ;
			
			_wrap_bar.css({"background-color" 	: o.background_color});
			if(o.removebutton){
				var _remove_cross = $(document.createElement('a')).addClass('jbar-cross');
				_remove_cross.click(function(e){$.fn.feedback.removebar();})
			}
			else{				
				_wrap_bar.css({"cursor"	: "pointer"});
				_wrap_bar.click(function(e){$.fn.feedback.removebar();})
			}	
			_wrap_bar.append(_message_span).append(_remove_cross).hide().insertBefore($('.content')).fadeIn('slow');
		
	};
	$.fn.feedback.defaults = {
		position            : 'topright',
		background_color 	: '#FFFFFF',
		color 				: '#000',
		barposition		 	: 'top',
		removebutton     	: true,
		time			 	: 5000,
		status              : 'ok'	 
	};
	
})(jQuery);