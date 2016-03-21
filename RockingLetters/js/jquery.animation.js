$(function() {
	
	var LLAnimation	= (function() {
		
		var $wrapper		= $('#ll-wrapper'),
			support			= Modernizr.csstransforms,
			init			= function() {
				
				$wrapper.find('h3').lettering();
				initEvents();
			
			},
			initEvents		= function() {
				
				$('#ll-button').on( 'click', function( event ) {
					
					$wrapper.removeClass('active');
					$('#ll-message').removeClass('active');
					setTimeout( function() {
						if( support ) {
						$wrapper.addClass('active');
						$('#ll-message').addClass('active');
						}
						else {
							$('#ll-message').css( 'opacity', 1 );
							$wrapper.find('h3:last > span').css( 'opacity', 1 );
						}
					}, 1 );
					return false;
					
				});
			
			};
		
		return { init : init };
	
	})();
	
	LLAnimation.init();
	
});