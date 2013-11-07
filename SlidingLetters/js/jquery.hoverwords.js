/*
hoverwords plugin
*/
(function($) {
	
	var aux		= {
			toggleChars	: function($el, settings) {
				var $wrappers	= $el.find('.sl-wrapper'),
					total		= $wrappers.length,
					c1			= $el.hasClass('sl-w1') ? 'sl-w2' : 'sl-w1',
					c2			= $el.hasClass('sl-w1') ? 'sl-w1' : 'sl-w2';		
				
				$el.addClass(c1).removeClass(c2);
				
				$wrappers.each(function(i) {
					var $wrapper 			= $(this),
						interval;
					
					switch(settings.dir) {
						case 'leftright' : interval = i * settings.delay; break;
						case 'rightleft' : interval = (total - 1 - i) * settings.delay; break;
					};
					
					if(settings.delay) {
						setTimeout(function() {
							aux.switchChar($wrapper, $el, settings, c1, c2);
						}, interval);
					}	
					else
						aux.switchChar($wrapper, $el, settings, c1, c2);
				});
			},
			switchChar	: function($wrapper, $el, settings, c1, c2) {
				var $newChar			= $wrapper.find('span.' + c1),
					$currentChar		= $wrapper.find('span.' + c2),
					nextWrapperW		= $currentChar.width();
					
				if($newChar.length)
					nextWrapperW		= $newChar.width();
				
				//new slides in
				if($newChar.length)	{
					var param	= {left	: '0px'};
					if(!$.browser.msie && settings.opacity)
						param.opacity 	= 1;
					
					$newChar.stop().animate(param, settings.speed, settings.easing);
					
					//animate the wrappers width
					$wrapper.stop().animate({
						width	: nextWrapperW + 'px'
					}, settings.speed);
				}
				
				//current slides out
				if(!settings.overlay || c1 === 'sl-w1') {
					if(settings.dir === 'leftright')
						var param	= {left	: -$currentChar.width() + 'px'};
					else
						var param	= {left	: nextWrapperW + 'px'};
						
					if(!$.browser.msie && settings.opacity)
						param.opacity 	= 0;
					$currentChar.stop().animate(param, settings.speed, settings.easing);
				}
			}
		},
		methods = {
			init 	: function(options) {
				
				if(this.length){
					
					var settings = {
						delay		: false,		// each letter will have different animation times
						speed		: 300,			// animation speed		
						easing		: 'jswing',		// easing animation
						dir			: 'leftright', 	// leftright - current goes left, new one goes right || rightleft - current goes right, new one goes left, 
						overlay		: false,		// hover word is slided on top of the current word (just for the case when the hover word equals word)
						opacity		: true			// animate the letters opacity
					};
					
					return this.each(function(){
						
						// If options exist, lets merge them with our default settings
						if ( options ) {
							$.extend( settings, options );
						}
						
						var $el 			= $(this).addClass('sl-w1'),
							word			= $el.data('hover') || $el.html(); 	// if data-hover was set the hover word is the one specified, otherwise the hover word is also the word
						
						if($el.data('hover')) settings.overlay = false;			// the overlay option will only work for the case when the hover word equals word
						
						$el.lettering();										// apply the lettering.js plugin
							
						var	$chars			= $el.children('span').addClass('sl-w1'),
							$tmp 			= $('<span>' + word + '</span>').lettering();
						
						$chars.each(function(i) {
							var $char		= $(this);
							
							$char.wrap( $('<span/>').addClass('sl-wrapper') )	// wrap each of the words chars, and set width of each wrapper = chars width
								 .parent().css({
									width : $char.width() + 'px'
								  });
						});
						
						$tmp.children('span').each(function(i) {
							var $char		= $(this),
								$wrapper 	= $el.children('.sl-wrapper').eq(i);
							
							if($wrapper.length)									// check if theres a wrapper to insert the char
								$wrapper.prepend( $char.addClass('sl-w2') );
							else {												// otherwise create one		
								$el.append(
									$('<span class="sl-wrapper"></span>').prepend( $char.addClass('sl-w2') )
								);
								
								$char.parent().css({
									width : $char.width() + 'px'
								});
							}
							
							if(!$.browser.msie && settings.opacity)
									$char.css('opacity', 0);
							
																		// "hide" the char
							if(settings.dir === 'leftright')							
								$char.css('left', - $char.width() + 'px');
							else
								$char.css('left', $char.parent().width() + 'px');		
						});
						
						// mouseenter / mouseleave events - swicth to the other word
						$el.bind('mouseenter.hoverwords mouseleave.hoverwords', function(e) {
							aux.toggleChars($el, settings);
						});

					});
				}
			}
		};
	
	$.fn.hoverwords = function(method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.hoverwords' );
		}
	};
})(jQuery);