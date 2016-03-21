// the gpCarousel plugin
(function($) {
	var methods = {
		init 					: function( options ) {
			
			if( this.length ) {
				
				var settings = {
					start	: 1,			// where to start the carousel
					speed	: 300,			// carousel sliding speed 
					easing	: 'easeOutExpo'	// carousel sliding easing 
				};
				
				return this.each(function() {
					
					// if options exist, lets merge them with our default settings
					if ( options ) {
						$.extend( settings, options );
					}
					
					var $el 			= $(this),
						$thumbs			= $el.find('div.thumbs'),
						$images			= $thumbs.children('img'),
						totalImages		= $images.length,
						imagesW			= $images.width();
					
					// insert navigation		
					$('<div class="thumbs-nav"><span class="thumbs-nav-prev">Previous</span><span class="thumbs-nav-next">Next</span></div>')
					.insertAfter( $thumbs );
						
					var	$navNext		= $el.find('span.thumbs-nav-next'),
						$navPrev		= $el.find('span.thumbs-nav-prev'),
						current			= settings.start;
					
					// confirm current boundaries
					if( totalImages <= 1 || current < 1 )
						current = 1;
					
					$el.data( 'currentImage', current );
					
					if( totalImages > 1 && current < totalImages )
						$navNext.show();
					if( totalImages > 1 && current > 1 )
						$navPrev.show();
					
					$el.css( 'width', imagesW + 'px' );
					$thumbs.css( 'width', imagesW * totalImages + 'px' );
					
					// position on thumb with index settings.start - 1
					$thumbs.css( 'margin-left', - ( current - 1 ) * imagesW + 'px' );
					
					$navNext.bind('click.gpCarousel', function(e) {
						if( $thumbs.is(':animated') || current === totalImages )
							return false;
						
						if( current === totalImages - 1 )
							$navNext.hide();
						
						$navPrev.show();
						
						$thumbs.stop().animate({
							marginLeft	: - current * imagesW + 'px'
						}, settings.speed, settings.easing, function() { ++current; $el.data( 'currentImage', current ); });
					});
					
					$navPrev.bind('click.gpCarousel', function(e) {
						if( $thumbs.is(':animated') || current === 1 )
							return false;
						
						if( current === 2 )
							$navPrev.hide();
						$navNext.show();
						
						$thumbs.stop().animate({
							marginLeft	: - ( current - 2 ) * imagesW + 'px'
						}, settings.speed, settings.easing, function() { --current; $el.data( 'currentImage', current ); });
					});
						
				});
			}
		}
	};
	
	$.fn.gpCarousel = function(method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.gpCarousel' );
		}
	};
})(jQuery);