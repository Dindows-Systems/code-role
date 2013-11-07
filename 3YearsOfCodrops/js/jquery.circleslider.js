/**
 * jquery.circleslider.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */

;( function( $, window, undefined ) {
	
	'use strict';

	// global
	var $window				= $( window ),
		Modernizr			= window.Modernizr;

	/*
	* debouncedresize: special jQuery event that happens once after a window resize
	*
	* latest version and complete README available on Github:
	* https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
	*
	* Copyright 2011 @louis_remi
	* Licensed under the MIT license.
	*/
	var $event = $.event,
	$special,
	resizeTimeout;

	$special = $event.special.debouncedresize = {
		setup: function() {
			$( this ).on( "resize", $special.handler );
		},
		teardown: function() {
			$( this ).off( "resize", $special.handler );
		},
		handler: function( event, execAsap ) {
			// Save the context
			var context = this,
				args = arguments,
				dispatch = function() {
					// set correct event type
					event.type = "debouncedresize";
					$event.dispatch.apply( context, args );
				};

			if ( resizeTimeout ) {
				clearTimeout( resizeTimeout );
			}

			execAsap ?
				dispatch() :
				resizeTimeout = setTimeout( dispatch, $special.threshold );
		},
		threshold: 50
	};

	$.CircleSlider			= function( options, element ) {
		
		this.$el = $( element );
		this._init( options );
		
	};

	$.CircleSlider.defaults	= {
		speedOut	: '1100ms',
		easingOut	: 'ease-in-out',
		speedIn		: '1100ms',
		easingIn	: 'ease-in-out'
	};

	$.CircleSlider.prototype	= {

		_init				: function( options ) {

			// options
			this.options	= $.extend( true, {}, $.CircleSlider.defaults, options );

			// current item
			this.current	= 0;
			this.isAnimating= false;
			this.nosupport	= !Modernizr.csstransitions || !Modernizr.csstransforms;
			// all items
			this.$items		= this.$el.children( 'li' );
			// total items
			this.itemsCount	= this.$items.length;
			// get window size
			this._getWinSize();
			// https://github.com/twitter/bootstrap/issues/2870
			var transEndEventNames = {
				'WebkitTransition'	: 'webkitTransitionEnd',
				'MozTransition'		: 'transitionend',
				'OTransition'		: 'oTransitionEnd',
				'msTransition'		: 'MSTransitionEnd',
				'transition'		: 'transitionend'
			};
			this.transEndEventName	= transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
			// load events
			this._initEvents();

		},
		// gets the current window width & height
		_getWinSize			: function() {
			
			this.windowProp = {
				width	: $window.width(),
				height	: $window.height()
			};
		
		},
		_initEvents			: function() {

			var self = this;

			this.$el.find( 'a.co-prev' ).on( 'click.circleslider', function( event ) {

				self._navigate( 'prev' );
				return false;

			} ).end().find( 'a.co-next' ).on( 'click.circleslider', function( event ) {

				self._navigate( 'next' );
				return false;

			} );

			$window.on( 'debouncedresize.circleslider', function( event ) {

				self._getWinSize();

			} )

		},
		_navigate			: function( dir ) {

			if( this.isAnimating ) {

				return false;

			}

			this.isAnimating = true;

			var self		= this,

				$current	= this.$items.eq( this.current ),
				$cCircle	= $current.children( 'div.co-circle' ),
				$cShadow	= $current.children( 'div.co-shadow' ),
				$cTitle		= $current.find( 'div.co-title > h3' ),
				$cLink		= $current.find( 'a.co-link' ),
				$cDate		= $current.children( 'div.co-date' ),
				cAnimStyle	= { transition : 'all ' + self.options.speedOut + ' ' + self.options.easingOut },
				translateVal, rotateVal;

			var circunference	= 2 * Math.PI * ( $cCircle.width() / 2 ),
				tval			= this.windowProp.width / 2 + $cCircle.width(),
				rval			= ( tval * 360 ) / circunference;

			if( dir === 'next' ) {

				translateVal	= -tval;
				rotateVal		= -rval;

				( this.current < this.itemsCount - 1 ) ? ++this.current : this.current = 0;

			}
			else if( dir === 'prev' ) {

				translateVal	= tval;
				rotateVal		= rval;

				( this.current > 0 ) ? --this.current : this.current = this.itemsCount - 1;

			}

			// set transitions
			$cCircle.css( cAnimStyle );
			$cShadow.css( cAnimStyle );
			$cTitle.css( cAnimStyle );
			$cDate.css( cAnimStyle );
			
			if( !this.nosupport ) {
				
			setTimeout( function() {

				// apply transformations
				$cCircle.css( 'transform', 'translate(' + translateVal + 'px) rotate(' + rotateVal + 'deg)' );
				$cShadow.css( 'transform', 'translate(' + translateVal + 'px)' );
				$cTitle.css( 'opacity', 0 );
				$cDate.css( 'opacity', 0 );

				$cLink.hide();
			
			}, 0 );

			}

			// ----------------- next item to show --------------------
			
			var $next		= this.$items.eq( this.current ),
				$nCircle	= $next.children( 'div.co-circle' ),
				$nShadow	= $next.children( 'div.co-shadow' ),
				$nTitle		= $next.find( 'div.co-title > h3' ),
				$nDate		= $next.children( 'div.co-date' ),
				nAnimStyle	= { transition : 'all ' + self.options.speedIn + ' ' + self.options.easingIn },
				resetCircleStyle	= {
					'transform' : ( dir === 'prev' ) ? 'translate(-' + translateVal + 'px) rotate(-' + rotateVal + 'deg)' : 'translate(' + Math.abs( translateVal ) + 'px) rotate(' + Math.abs( rotateVal ) + 'deg)'
				},
				resetShadowStyle	= {
					'transform' : ( dir === 'prev' ) ? 'translate(-' + translateVal + 'px)' : 'translate(' + Math.abs( translateVal ) + 'px)'
				};
			
			
			if( this.nosupport ) {

				$current.hide();
				$next.show();
				this.isAnimating = false;
				return false;

			}

			// reset style for coming item
			$nTitle.css( 'opacity', 0 );
			$nCircle.css( resetCircleStyle );
			$nShadow.css( resetShadowStyle );
			$nDate.css( 'opacity', 0 );

			setTimeout( function() {

				// set transitions
				$nTitle.css( nAnimStyle );
				$nCircle.css( nAnimStyle );
				$nShadow.css( nAnimStyle );
				$nDate.css( nAnimStyle );

				// apply transformations
				$nCircle.css( 'transform', 'translate(0px) rotate(0deg)' );
				$nShadow.css( 'transform', 'translate(0px)' );
				$nTitle.css( 'opacity', 1 );
				$nDate.css( 'opacity', 1 );

				// after transitions
				$nCircle.on( self.transEndEventName, function( event ) {

					var style = { transition : 'none' };

					$current.hide();
					$cLink.show();

					$nCircle.off( self.transEndEventName ).css( style );
					$nShadow.css( style );
					$nTitle.css( style );
					$nDate.css( style );
					$cCircle.css( style );
					$cShadow.css( style );
					$cTitle.css( style );
					$cDate.css( style );

					self.isAnimating = false;

				} );

			}, 0 );

			// show next
			$next.show();

		}

	};
	
	var logError		= function( message ) {

		if ( window.console ) {

			window.console.error( message );
		
		}

	};
	
	$.fn.circleslider	= function( options ) {
		
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				var instance = $.data( this, 'circleslider' );
				
				if ( !instance ) {

					logError( "cannot call methods on circleslider prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for circleslider instance" );
					return;
				
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
				
				var instance = $.data( this, 'circleslider' );
				
				if ( instance ) {

					instance._init();
				
				}
				else {

					$.data( this, 'circleslider', new $.CircleSlider( options, this ) );
				
				}

			});
		
		}
		
		return this;
		
	};
	
} )( jQuery, window );