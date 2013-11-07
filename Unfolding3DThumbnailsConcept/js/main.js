$(function() {
				
	var $wrapper 			= $( '#th-wrap' ),
		$img				= $wrapper.children( 'img' ),
		// https://github.com/twitter/bootstrap/issues/2870
		transEndEventNames	= {
			'WebkitTransition'	: 'webkitTransitionEnd',
			'MozTransition'		: 'transitionend',
			'OTransition'		: 'oTransitionEnd',
			'msTransition'		: 'MSTransitionEnd',
			'transition'		: 'transitionend'
		},
		transEndEventName	= transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		endCount			= 0,
		isAnimating			= false,
		notsupported		= !Modernizr.csstransforms || !Modernizr.csstransforms3d || !Modernizr.csstransitions;

	$( '#th-view' ).on( 'click', toggleView );
	
	function toggleView() {

		var $btn = $( this );
		
		if( !isAnimating ) {

			isAnimating = true;
			
			var view = $wrapper.data( 'view' );
			
			if( view === 'thumbs' ) {
				
				$wrapper.data( 'view', 'single' );
				$btn.removeClass(' th-toggle-active' );
				if( notsupported ) {

					$wrapper.removeClass( 'th-active' ).children( 'div.th-inner' ).hide();
					isAnimating = false;
					return false;
				
				}
			
			}
			else {
				
				$wrapper.data( 'view', 'thumbs' );
				$btn.addClass(' th-toggle-active' );
				if( notsupported ) {

					$wrapper.addClass( 'th-active' ).children( 'div.th-inner' ).show();
					isAnimating = false;
					return false;
				
				}

			}
			
			$wrapper.children( 'img' )
					.remove()
					.end()
					.children( 'div.th-inner' )
					.show()
					.wrap( $( '<div class="th-part"></div>' ) )
					.append( '<div class="th-overlay"></div>' )
					.parent()
					.clone()
					.appendTo( $wrapper );
					
			$wrapper.append( '<div class="th-part"></div>' )
					.prepend( $( '<div class="th-part"></div>' ) )
					.find( 'div.th-part' )
					.on( transEndEventName, function( event ) {
						
						++endCount;
						// 4 transitions
						if( endCount === 4 ) {
							
							$wrapper.off( transEndEventName );
							endCount = 0;
							clear( view );

						}
						
					} ) ;
					
			setTimeout( function() { ( view === 'thumbs' ) ? $wrapper.removeClass( 'th-active' ) : $wrapper.addClass( 'th-active' ); }, 0 );

		}
		
		return false;
	
	}

	function clear( view ) {
		
		$wrapper.find( 'div.th-inner:first' ).unwrap().end().find( 'div.th-overlay' ).remove();
		var $inner = $wrapper.find( 'div.th-inner' );
		( view !== 'thumbs' ) ? $inner.show() : $inner.hide();
		$wrapper.find( 'div.th-part' ).remove();
		$img.prependTo( $wrapper );
		isAnimating = false;

	}

	$( '.main' ).on( 'click', function() { alert( 'This is just a concept, the slider is a dummy!' ); } );

});