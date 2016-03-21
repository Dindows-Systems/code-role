(function($) {
	jQuery.fn.reverse = Array.prototype.reverse;
	
	var temp	= {},
		aux		= {
			// sets the panels bg image & position
			setPanelBackground	: function( bgimage, $panels, panelWidth ) {
				$panels.css({ 
					'background-image'	: 'url(' + bgimage + ')'
				}).each(function(i) {
					$(this).css('background-position', ( - i * panelWidth )  + 'px 0px');
				});
			},
			preloadImages		: function( $panels, nmbPanels ) {
				var cnt	= 0;
				$panels.each(function(i) {
					var $panel	= $(this),
						bgimage	= $panel.data('bg');
					
					$('<img/>').attr( 'src', bgimage );
				});
			},
			setup				: function( $panels, nmbPanels, panelWidth, $panelBg, $el , $content, settings ) {
				
				$content.each(function(i) {
					var $el	= $(this);
					// save each content's height (where the menu items are)
					// and hide them by setting the height to 0px
					$el.data( 'height', $el.outerHeight(true) ).css( 'height', '0px' ).show();
				});
				
				// set the width for the panels;
				$panels.css( 'width' , panelWidth + 'px' );
				
				// set the width of the panelBgs
				$panelBg.css( 'width' , panelWidth + 'px' );
				
				// set the width, height and background image of the main container
				$el.css({
					'width'				: panelWidth * nmbPanels + 'px',
					'height'			: settings.height + 'px'
				});
				// if defaultBg is passed then defaultBg is set as background, 
				// otherwise we set the image of the default opened panel
				if( settings.defaultBg )
					aux.setPanelBackground( settings.defaultBg, $panels, panelWidth );
				else
					aux.setPanelBackground( temp.currentBgImage, $panels, panelWidth );
				
				// apply a margin right of settings.border pixels for all the panels except the last one
				$panels.not( $panels.eq( nmbPanels - 1 ) ).css( 'margin-right', settings.border + 'px' );
				var spaces	= (nmbPanels - 1) * settings.border;
				
				// adjust the sbi_container's width given the margins
				$el.css( 'width', $el.width() + spaces + 'px' );
			}
		},
		// animation types
		anim	= {
			def					: {
				slide		: function( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					var $panel		= $label.closest('div.sbi_panel'),
						panelIdx	= $panel.index(),
						bgimage		= $panel.data('bg'),
						dir;
					
					if( temp.current === panelIdx ) {
						$el.data( 'anim', false );
						return false;
					}
					
					temp.current	= $panel.index();
					
					anim[settings.type.mode].slideAux( bgimage, dir, nmbPanels, panelWidth, $panelBg, $el , $panels, settings );
					
				},
				slideAux	: function( bgimage, dir, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					var cnt 		= 0;
						
					// set the correct left to the $panelBg
					// and also the bg image
					$panelBg.css({ 
						'left' 				: '0px',
						'background-image'	: 'url(' + bgimage + ')'
					}).each(function(i) {
						$(this).css('background-position', ( - i * panelWidth )  + 'px 0px');
					});
					$el.data( 'anim', false );
				} 
			},
			fade				: {
				slide		: function( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					// same like def mode
					anim['def'].slide( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings );
				},
				slideAux	: function( bgimage, dir, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					var cnt 		= 0;
					
					// set the correct left to the $panelBg
					// and also the bg image
					$panelBg.css({ 
						'left' 				: '0px',
						'background-image'	: 'url(' + bgimage + ')'
					}).each(function(i) {
						$(this).hide()
							   .css('background-position', ( - i * panelWidth )  + 'px 0px')
							   .fadeIn(settings.type.speed, settings.type.easing, function() {
									++cnt;
									if( cnt === nmbPanels ) {
										$el.data( 'anim', false );
										// set default bg
										aux.setPanelBackground( bgimage, $panels, panelWidth );
									}
							   });
					});
					
				} 
			},
			seqFade				: {
				slide		: function( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					var $panel		= $label.closest('div.sbi_panel'),
						panelIdx	= $panel.index(),
						bgimage		= $panel.data('bg'),
						dir;
					
					if( temp.current < panelIdx )
						dir			= 1;
					else if( temp.current > panelIdx )
						dir			= -1;	
					else {
						$el.data( 'anim', false );
						return false;
					}
					temp.current	= $panel.index();
					
					anim[settings.type.mode].slideAux( bgimage, dir, nmbPanels, panelWidth, $panelBg, $el , $panels, settings );
				},
				slideAux	: function( bgimage, dir, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					var cnt 		= 0,
						seq_t		= settings.type.seqfactor,
						$elems		= $el.find('div.sbi_panel_img');
					
					if( dir === -1 )
						$elems = $elems.reverse();
						
					// set the correct left to the $panelBg
					// and also the bg image
					$elems.css({ 
						'left' 				: '0px',
						'background-image'	: 'url(' + bgimage + ')'
					}).each(function(i) {
						var $thePanelBg	= $(this).hide();
						setTimeout(function() {
							var factor	= - i * panelWidth;
							if( dir === -1 )
								factor	= - (nmbPanels - 1 - i) * panelWidth;
							
							$thePanelBg.css('background-position', factor  + 'px 0px')
									   .fadeIn(settings.type.speed, settings.type.easing, function() {
											++cnt;
											if( cnt === nmbPanels ) {
												$el.data( 'anim', false );
												// set default bg
												aux.setPanelBackground( bgimage, $panels, panelWidth );
											}
									   });
						}, i * seq_t);
	
					});
					
				} 
			},
			horizontalSlide 	: {
				slide		: function( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					// same like seqFade mode
					anim['seqFade'].slide( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings );
				},
				slideAux	: function( bgimage, dir, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					var cnt 		= 0;
						
					// set the correct left to the $panelBg depending on dir
					// and also the bg image
					$panelBg.css({
						'left' 				: dir * panelWidth + 'px',
						'background-image'	: 'url(' + bgimage + ')'
					}).each(function(i) {
						$(this).css('background-position', ( - i * panelWidth )  + 'px 0px')
							   .stop()
							   .animate({
								   left	: '0px'
							   }, settings.type.speed, settings.type.easing, function() {
							       ++cnt;		
								   if( cnt === nmbPanels ) {
								       $el.data( 'anim', false );
									   // set default bg
								       aux.setPanelBackground( bgimage, $panels, panelWidth );
								   }
							   });
					});
				} 
			},
			seqHorizontalSlide 	: {
				slide		: function( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					// same like seqFade mode
					anim['seqFade'].slide( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings );
				},
				slideAux	: function( bgimage, dir, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					var cnt 		= 0,
						seq_t		= settings.type.seqfactor,
						$elems		= $el.find('div.sbi_panel_img');
					
					if( dir === 1 )
						$elems = $elems.reverse();
						
					// set the correct left to the $panelBg depending on dir
					// and also the bg image
					$elems.css({
						'left' 				: dir * panelWidth + 'px',
						'background-image'	: 'url(' + bgimage + ')'
					}).each(function(i) {
						var $thePanelBg	= $(this);
						setTimeout(function() {
							var factor	= - i * panelWidth;
							if( dir === 1 )
								factor	= - (nmbPanels - 1 - i) * panelWidth;
								
							$thePanelBg.css('background-position', factor  + 'px 0px')
									   .stop()
									   .animate({
										   left	: '0px'
									   }, settings.type.speed, settings.type.easing, function() {
										   ++cnt;		
										   if( cnt === nmbPanels ) {
											   $el.data( 'anim', false );
											   // set default bg
											   aux.setPanelBackground( bgimage, $panels, panelWidth );
										   }
									   });
						}, i * seq_t);
					});
				} 
			},
			verticalSlide 		: {
				slide		: function( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					// same like seqFade mode
					anim['seqFade'].slide( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings );
				},
				slideAux	: function( bgimage, dir, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					var cnt 		= 0;
						
					// set the correct top to the $panelBg depending on dir
					// and also the bg image
					$panelBg.css({
						'top' 				: dir * settings.height + 'px',
						'background-image'	: 'url(' + bgimage + ')'
					}).each(function(i) {
						$(this).css('background-position', ( - i * panelWidth )  + 'px 0px')
							   .stop()
							   .animate({
								   top	: '0px'
							   }, settings.type.speed, settings.type.easing, function() {
							       ++cnt;		
								   if( cnt === nmbPanels ) {
								       $el.data( 'anim', false );
									   // set default bg
								       aux.setPanelBackground( bgimage, $panels, panelWidth );
								   }
							   });
					});
				} 
			},
			seqVerticalSlide 	: {
				slide		: function( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					// same like seqFade mode
					anim['seqFade'].slide( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings );
				},
				slideAux	: function( bgimage, dir, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					var cnt 		= 0,
						seq_t		= settings.type.seqfactor,
						$elems		= $el.find('div.sbi_panel_img');
					
					if( dir === 1 )
						$elems = $elems.reverse();
						
					// set the correct top to the $panelBg depending on dir
					// and also the bg image
					$elems.css({
						'top' 				: dir * settings.height + 'px',
						'background-image'	: 'url(' + bgimage + ')'
					}).each(function(i) {
						var $thePanelBg	= $(this);
						setTimeout(function() {
							var factor	= - i * panelWidth;
							if( dir === 1 )
								factor	= - (nmbPanels - 1 - i) * panelWidth;
								
							$thePanelBg.css('background-position', factor  + 'px 0px')
									   .stop()
									   .animate({
										   top	: '0px'
									   }, settings.type.speed, settings.type.easing, function() {
										   ++cnt;		
										   if( cnt === nmbPanels ) {
											   $el.data( 'anim', false );
											   // set default bg
											   aux.setPanelBackground( bgimage, $panels, panelWidth );
										   }
									   });
						}, i * seq_t);
					});
				} 
			},
			verticalSlideAlt 	: {
				slide		: function( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					// same like seqFade mode
					anim['seqFade'].slide( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings );
				},
				slideAux	: function( bgimage, dir, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					var cnt 		= 0, j;
						
					// set the correct top to the $panelBg
					// and also the bg image
					$panelBg.css({
						'background-image'	: 'url(' + bgimage + ')'
					}).each(function(i) {
						if( i % 2 === 0 )
							j = 1;
						else
							j = -1;
						$(this).css('top', j * settings.height + 'px')
							   .css('background-position', ( - i * panelWidth )  + 'px 0px')
							   .stop()
							   .animate({
								   top	: '0px'
							   }, settings.type.speed, settings.type.easing, function() {
							       ++cnt;		
								   if( cnt === nmbPanels ) {
								       $el.data( 'anim', false );
									   // set default bg
								       aux.setPanelBackground( bgimage, $panels, panelWidth );
								   }
							   });
					});
				} 
			},
			seqVerticalSlideAlt : {
				slide		: function( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					// same like seqFade mode
					anim['seqFade'].slide( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings );
				},
				slideAux	: function( bgimage, dir, nmbPanels, panelWidth, $panelBg, $el , $panels, settings ) {
					var cnt 		= 0,
						seq_t		= settings.type.seqfactor,
						$elems		= $el.find('div.sbi_panel_img'),
						j;
					
					if( dir === 1 )
						$elems = $elems.reverse();
						
					// set the correct top to the $panelBg depending on dir
					// and also the bg image
					$elems.css({
						'top'				: dir * settings.height + 'px',
						'background-image'	: 'url(' + bgimage + ')'
					}).each(function(i) {
						var $thePanelBg	= $(this);
						
						setTimeout(function() {
							var factor	= - i * panelWidth;
							if( dir === 1 )
								factor	= - (nmbPanels - 1 - i) * panelWidth;
							
							if( i % 2 === 0 )
								j = 1;
							else
								j = -1;
							
							$thePanelBg.css('top', j * settings.height + 'px')
									   .css('background-position', factor  + 'px 0px')
									   .stop()
									   .animate({
										   top	: '0px'
									   }, settings.type.speed, settings.type.easing, function() {
										   ++cnt;		
										   if( cnt === nmbPanels ) {
											   $el.data( 'anim', false );
											   // set default bg
											   aux.setPanelBackground( bgimage, $panels, panelWidth );
										   }
									   });
						}, i * seq_t);
					});
				} 
			}
		},
		methods = {
			init 	: function( options ) {
				
				if( this.length ) {
					
					var settings = {
						/* 
						by default the first item is opened
						if defaultBg is passed, then pos will be ignored
						*/
						pos			: 0,
						// width of the sbi_container (image width)
						width		: '900',
						// height of the sbi_container (image height)
						height		: '510',
						// border / margin size (distance between panels)
						border		: 0,
						// time that the menu takes to expand / collapse
						menuSpeed	: 450,
						// animation type
						type		: {
							// name : use def | fade | seqFade | horizontalSlide | 
							// seqHorizontalSlide | verticalSlide | seqVerticalSlide | 
							// verticalSlideAlt | seqVerticalSlideAlt
							mode		: 'def',
							// speed of the panel animation
							speed		: 250,
							// easing type for the animation
							easing		: 'jswing',
							// this is the interval between each panel's animation 
							// used for seqFade & seqHorizontalSlide & seqVerticalSlide & seqVerticalSlideAlt  
							seqfactor	: 100
						}
					};
					
					return this.each(function() {
						
						// if options exist, lets merge them with our default settings
						if ( options ) {
							$.extend( settings, options );
						}
						
						var $el 			= $(this),
							
							$panels			= $el.children('div.sbi_panel'),
							nmbPanels		= $panels.length,
							
							$labels			= $el.find('a.sbi_label'),
							
							$content		= $el.find('div.sbi_content'),
							
							animTime,
						
						// width for each panel
							panelWidth		= Math.floor( settings.width / nmbPanels );
						
						// preload images
						aux.preloadImages( $panels, nmbPanels );
						
						// current panel
						temp.current		= settings.pos;
						
						if( settings.defaultBg )
							temp.current	= -1;
						else {
							var $defaultPanel	= $panels.eq( settings.pos );
							temp.currentBgImage	= $defaultPanel.data('bg');
						}
						
						// prepend a bg image container for each one of the panels
						// this will have the right image as background
						$panels.prepend('<div class="sbi_panel_img"></div>');
						
						// have a reference to those containers - $panelBg
						var $panelBg		= $el.find('div.sbi_panel_img');
						
						// set this and that...
						aux.setup( $panels, nmbPanels, panelWidth, $panelBg, $el , $content, settings );
						
						// if defaultBg is not passed we show the menu of the default panel
						if( !settings.defaultBg ) {
							var $defContent	= $defaultPanel.children('div.sbi_content');
							$defContent.css( 'height' , $content.data('height') + 'px' );
						}
						
						// mouseenter event on the labels:
						$labels.bind( 'mouseenter', function(e) {
							var $label		= $(this),
								$content	= $label.next();
							
							clearTimeout(animTime);
							
							animTime	= setTimeout(function() {
								if( $el.data( 'anim' ) ) return false;
								$el.data( 'anim', true );
								
								if( temp.current != -1 ) {
									$panels.eq( temp.current )
										   .find('div.sbi_content')
										   .stop()
										   .animate({height : '0px'}, settings.menuSpeed);
								}
								
								anim[settings.type.mode].slide( $label, nmbPanels, panelWidth, $panelBg, $el , $panels, settings );
								
								$content.stop().animate({height : $content.data('height') + 'px'}, settings.menuSpeed);
							}, 100);
							
						})
						
						
						// mouseleave event on the main container (just if we have set a default bg image for the menu)
						// this will reset the menu to the original / default image
						
						$el.bind('mouseleave', function(e) {
							if( temp.current != -1 ) {
								
								$panels.eq( temp.current )
									   .find('div.sbi_content')
									   .stop()
									   .animate({height : '0px'}, settings.menuSpeed);
								
								temp.current= -1;
								
								if( settings.defaultBg ) {
									clearTimeout(animTime);
									if( $el.data( 'anim' ) ) return false;
									$el.data( 'anim', true );
									anim[settings.type.mode].slideAux( settings.defaultBg, -1, nmbPanels, panelWidth, $panelBg, $el , $panels, settings );
								}
							}
							return false;	
						});
						
						
					});
				}
			}
		};
	
	$.fn.bgImageMenu = function(method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.bgImageMenu' );
		}
	};
	
})(jQuery);		
