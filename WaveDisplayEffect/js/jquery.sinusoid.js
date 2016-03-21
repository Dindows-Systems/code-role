(function( window, $, undefined ) {
	
	/*
	* smartresize: debounced resize event for jQuery
	*
	* latest version and complete README available on Github:
	* https://github.com/louisremi/jquery.smartresize.js
	*
	* Copyright 2011 @louis_remi
	* Licensed under the MIT license.
	*/

	var $event = $.event, resizeTimeout;

	$event.special.smartresize 	= {
		setup: function() {
			$(this).bind( "resize", $event.special.smartresize.handler );
		},
		teardown: function() {
			$(this).unbind( "resize", $event.special.smartresize.handler );
		},
		handler: function( event, execAsap ) {
			// Save the context
			var context = this,
				args 	= arguments;

			// set correct event type
			event.type = "smartresize";

			if ( resizeTimeout ) { clearTimeout( resizeTimeout ); }
			resizeTimeout = setTimeout(function() {
				jQuery.event.handle.apply( context, args );
			}, execAsap === "execAsap"? 0 : 300 );
		}
	};

	$.fn.smartresize 			= function( fn ) {
		return fn ? this.bind( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] );
	};
	
	$.Sinusoid 				= function( options, element ) {
		
		this.$wrapper		= $( element );
		this.$scroller		= this.$wrapper.find('div.wd-scroll-wrapper');
		this.$el			= this.$wrapper.find('div.wd-container');
		this.$slider		= this.$wrapper.find('div.wd-slider');
		
		// the items
		this.$items			= this.$el.children('div.wd-element');
		
		// image sizes and ratios
		this.itemXSize		= this.$items.width();
		this.itemYSize		= this.$items.height();
		this.ratio			= this.itemXSize / this.itemYSize;
		
		// total items
		this.itemsCount		= this.$items.length;
		
		// mode - we start with small
		this.mode			= 'small';
		
		// current item's index
		// the current item will always be shown on the viewport
		this.current		= 0;
		
		// initialize sinusoid
		this._init( options );
		
	};
	
	$.Sinusoid.defaults 		= {
		speed				: 1000,				// speed for the animations
		easing				: 'easeInOutExpo',	// easing for the animations
		minImgW				: 50,				// minimum width the thumb image will have (randomly set)
		maxImgW				: 90,				// maximum width the thumb image will have (randomly set)
		minImgAngle			: -15,				// minimum rotation angle the thumb image will have (randomly set)
		maxImgAngle			: 15,				// maximum rotation angle the thumb image will have (randomly set)
		leftFactor			: 40,				// space between images on the x-axis  
		startFactor			: 1,				// the higher this value, the more space between the first thumb and the left of the container
		sinusoidFunction 	: {
			A	: 100,	// amplitude
			T 	: 700, 	// period
			P	: 0		// phase
		}
		
    };
	
	$.Sinusoid.prototype 		= {
		_init 				: function( options ) {
			
			this.options 			= $.extend( true, {}, $.Sinusoid.defaults, options );
			
			this.sinusoidFunction	= {
				A	: this.options.sinusoidFunction.A,
				T 	: this.options.sinusoidFunction.T,
				P	: this.options.sinusoidFunction.P
			};
			
			this._set();
			this._validate();
			
			this.$items.addClass( 'wd-element-small' );
			
			// draw the sinusoid
			this._render();
			
			// initialize the jquery ui slider
			this._initSlider();
			
			// initialize the events
			this._initEvents();
			
		},
		// initializes the jquery ui slider
		_initSlider			: function() {
			
			var instance 	= this,
				$lastItem	= instance.$items.eq( instance.itemsCount - 1 ),
				
				max			= $lastItem.position().left + $lastItem.width() - instance.$wrapper.width();
			
			if( max < 0) max = 0;
			
			this.$slider.slider({
					max			: max,
				min			: 0,
				value		: 0,
				slide		: function(event, ui) {
					
					instance.$el.css( 'left' , -ui.value + 'px' );
								 
				}
			});
		
			if( max === 0 ) this.$slider.hide();
			
		},
		// when changing modes, we need to calculate the slider max value
		_reinitSlider		: function() {
			
			var instance 	= this,
				$lastItem	= instance.$items.eq( instance.itemsCount - 1 ),
				lastItemLeft, lastItemWidth;
			
			( this.mode === 'small' ) 
								? ( lastItemLeft = $lastItem.data('originalLeft'), lastItemWidth = $lastItem.data('originalWidth') )
								: ( lastItemLeft = ( this.itemsCount * this.itemXSize ) - ( this.itemXSize / 2 ), lastItemWidth	= this.itemXSize )
			
			var max = lastItemLeft + lastItemWidth - instance.$wrapper.width();
			
			if( max < 0) { 
				
				max = 0;
				this.$slider.hide();
			
			}
			else {
				
				this.$slider.show();
				
			}
			
			this.$slider.slider( 'option', 'max', max );
			
		},
		// sets the slider's value, and also the left of the container (to show the current item on the viewport)
		_setSlider			: function() {
			
			var currentLeft;
			
			( this.mode === 'small' ) 
								? currentLeft = ( this.$wrapper.width() / 2 ) - this.$items.eq( this.current ).data('originalLeft') - ( this.$items.eq( this.current ).data('originalWidth') / 2 )
								: currentLeft = ( this.$wrapper.width() / 2 ) - ( ( this.current + 1 ) * this.itemXSize );
			
			var elLeft;
			
			if( currentLeft > 0 )
				elLeft = 0;
			else
				elLeft = - Math.min ( Math.abs( currentLeft ), this.$slider.slider( 'option', 'max' ) );
			
			this.$slider.slider( 'value', Math.abs( elLeft ) );			
			
			this.$el.stop().animate( { 'left' : elLeft }, this.options.speed, this.options.easing );
			
		},
		// checks and sets some values for the sinusoid function (used initially and on window resize)
		_set				: function() {
			
			var wrapperH	= this.$wrapper.height(),
				margin		= 50;
			
			( this.options.sinusoidFunction.A > wrapperH / 2 - margin )	? this.sinusoidFunction.A = wrapperH / 2 - margin : this.sinusoidFunction.A = this.options.sinusoidFunction.A;
			
			this.sinusoidFunction.D = wrapperH / 2; // central amplitude
			
		},
		// validates some options values and sizes
		_validate			: function() {
		
			if( this.itemYSize > this.$wrapper.height() ) {
			
				this.itemYSize	= this.$wrapper.height();
				this.itemXSize	= this.itemYSize * this.ratio;
			
			}
		
			// check on minImgW / maxImgW
			if( this.options.minImgW < 1 || this.options.minImgW > this.options.maxImgW )
				this.options.minImgW = this.options.maxImgW;
				
			if( this.options.maxImgW > this.itemXSize || this.options.maxImgW < 1 )
				this.options.maxImgW = this.itemXSize;
				
			if( this.options.leftFactor < 0 )
				this.options.leftFactor = this.options.minImgW;
			
		},
		// draws the sinusoid with the images (for both modes) and its respective sizes
		_render				: function( anim, callback ) {
			
			var instance	= this;
			
			$.fn.applyStyle = ( anim !== undefined ) ? $.fn.animate : $.fn.css;
			
			this.$items.each( function(i) {
			
				var $item		= $(this);
				
				var w			= ( instance.mode === 'medium' ) 
									? instance.itemXSize
									: ( $item.data( 'originalWidth' ) ? $item.data( 'originalWidth' ) : Math.floor( Math.random() * ( instance.options.maxImgW - instance.options.minImgW + 1 ) + instance.options.minImgW ) ),
					
					h			= w / instance.ratio,
					
					leftFactor	= ( instance.mode === 'medium' ) ? instance.itemXSize : instance.options.leftFactor,
					
					startFactor	= ( instance.mode === 'medium' ) ? 1 : instance.options.startFactor,
					
					angle		= $item.data( 'originalAngle' ) || Math.floor( Math.random() * ( instance.options.maxImgAngle - instance.options.minImgAngle + 1 ) + instance.options.minImgAngle ),
					
					itemCSS	= {
						'width'				: w,
						'height'			: h,
						'left'				: ( i + startFactor ) * leftFactor - w / 2,
						'top'				: ( instance.mode === 'medium' ) ? instance._getTop( ( i + startFactor ) * leftFactor, 70, 2000 ) - h / 2 : instance._getTop( ( i + startFactor ) * leftFactor ) - h / 2,
						'-webkit-transform'	: 'rotate(' + angle + 'deg)',
						'-moz-transform'	: 'rotate(' + angle + 'deg)',
						'-o-transform'	: 'rotate(' + angle + 'deg)',
						'transform'			: 'rotate(' + angle + 'deg)'
					};
					
				if( instance.mode === 'small' ) {
					
					$item.removeClass( 'wd-element-medium' ).addClass( 'wd-element-small' );
					
				}
				
				$item.stop().applyStyle( itemCSS, $.extend( true, [], { duration : instance.options.speed, easing : instance.options.easing, complete : function() {
					
					if( instance.mode === 'medium' )
						$(this).removeClass( 'wd-element-small' ).addClass( 'wd-element-medium' );
					
					if( i === instance.itemsCount - 1 && callback ) {
						
						callback.call();
						
					}
					
				}}));
				
				if( !$item.data( 'originalWidth' ) ) {
					$item.data({
						originalWidth	: w,
						originalAngle	: angle,
						originalLeft	: ( i + startFactor ) * leftFactor - w / 2
					});
				}
				
				if( !anim && callback ) callback.call();
				
			});
		
		},
		// gets the y-axis value for the given x-axis value
		// sinusoid formula : http://mathworld.wolfram.com/Sinusoid.html
		_getTop				: function( X, A, T ) {
			
			var D	= this.sinusoidFunction.D,
				P	= this.sinusoidFunction.P,
				A, T;
			
			( A !== undefined ) ? A = A : A = this.sinusoidFunction.A;
			( T !== undefined ) ? T = T : T = this.sinusoidFunction.T;
			
			return A * Math.sin( ( ( ( 2 * Math.PI ) / T ) * X ) + P ) + D;
		
		},
		_initEvents			: function() {
			
			var instance	= this;
			
			// click one item
			// if mode is small goes to medium mode by changing the sinusoid shape, and enlarging the items
			// if mode is medium, shows the item in fullscreen and reveals the description
			this.$items.bind('click.sinusoid', function( event ) {
				
				var $item	= $(this);
				
				instance.current= $item.index(); 
				
				if( instance.mode === 'small' ) {
					
					instance.mode	= 'medium';
					
					instance._reinitSlider();
					instance._setSlider();
					
					instance._render( true, function() {
					
						// need to add zoom out button
						instance._addControls();
						
					} );
					
				}	
				else if( instance.mode === 'medium' ) {
					
					instance._setSlider();
					instance._showItem( $item );
				
				}	
				
			});
			
			// resizing the window resets the sinusoid to its initial state
			$(window).bind('smartresize.sinusoid', function( event ) {
				
				// just render it again like the first step...
				instance.mode	= 'small';
				if( instance.$overlay )
					instance.$overlay.hide();
				instance.$zoomOut.hide();	
				instance._set();
					instance._reinitSlider();
				instance._setSlider();
				instance._render( true );
			
			});
			
		},
		// shows the item in fullscreen
		_showItem			: function( $item ) {
			
			var itemSource		= $item.find('img').attr('src'),
				itemTitle		= $item.find('div.wd-info-title').html(),
				itemDescription	= $item.find('div.wd-info-desc').html(),
				instance		= this;
			
			if( !this.$overlay ) {
				
				$('#fullscreenTmpl').tmpl({
					source		: itemSource,
					title		: itemTitle,
					description	: itemDescription
				}).prependTo( this.$wrapper ).show();
				
				this.$overlay				= $('#wd-overlay');
				this.$overlayImg			= this.$overlay.find('img');
				this.$overlayTitle			= this.$overlay.find('div.wd-info-title');
				this.$overlayDescription	= this.$overlay.find('div.wd-info-desc');
				this.$overlayNavNext		= this.$overlay.find('span.wd-nav-next');
				this.$overlayNavPrev		= this.$overlay.find('span.wd-nav-prev');
				
				this.$overlay.find('span.wd-close').bind('click.sinusoid', function( event ) {
				
					instance.$overlay.hide();
					
				});
			
				this.$overlayNavNext.bind('click.sinusoid', function( event ) {
				
					instance._navigate( 'next' );
					
				});
				
				this.$overlayNavPrev.bind('click.sinusoid', function( event ) {
				
					instance._navigate( 'prev' );
					
				});
				
			}
			else {
				
				this.$overlayImg.attr( 'src', itemSource );
				this.$overlayTitle.html( itemTitle );
				this.$overlayDescription.html( itemDescription );
				this.$overlay.show();
				
			}
		
		},
		// navigates the items in fullscreen
		_navigate			: function( dir ) {
			
			if( dir === 'next' ) {
				
				++this.current;
				if( this.current > this.itemsCount - 1 )
					this.current = 0;
				
			}
			else if( dir === 'prev' ) {
			
				--this.current;
				if( this.current < 0 )
					this.current = this.itemsCount - 1;
			
			}
			
			this._setSlider();
			this._showItem( this.$items.eq( this.current ) );
			
		},
		// adds the zoom out button on the top left side  
		_addControls		: function() {
			
			var instance	= this;
			
			if( !this.$zoomOut ) {
				
				this.$zoomOut	= $('<div class="wd-zoom-out">Zoom out</div>').prependTo( this.$wrapper ).bind('click.sinusoid', function( event ) {
				
					instance.mode	= 'small';
						
					instance._reinitSlider();
					instance._setSlider();
					instance._render( true );
					
					$(this).hide();
			
			});
				
			}
			else
				this.$zoomOut.show();
			
		}
	};
	
	var logError 				= function( message ) {
		
		if ( this.console ) {
			
			console.error( message );
			
		}
		
	};
	
	$.fn.sinusoid 				= function( options ) {
	
		if ( typeof options === 'string' ) {
		
			var args = Array.prototype.slice.call( arguments, 1 );

			this.each(function() {
			
				var instance = $.data( this, 'sinusoid' );
				
				if ( !instance ) {
					logError( "cannot call methods on sinusoid prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for sinusoid instance" );
					return;
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
				var instance = $.data( this, 'sinusoid' );
				if ( !instance ) {
					$.data( this, 'sinusoid', new $.Sinusoid( options, this ) );
				}
			});
		
		}
		
		return this;
		
	};
	
})( window, jQuery );