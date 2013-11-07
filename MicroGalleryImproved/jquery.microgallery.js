(function($) {
	$.fn.microgallery = function(options) {
		var opts = $.extend({}, $.fn.microgallery.defaults, options);
		return this.each(function() {
			var $this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			var current		=1;
			var mode		=o.mode;
			var incfactor 	= 9;
			var _cnt 		= 0;
			var _all 		= $this.find('img').size();
			var autoplayTime;
			var playing 	= false;
			$this.find('img').each(function(){
				var theImage = new Image();
				$(theImage).load(function(){
					++_cnt;
					if(_cnt == _all){
						$.fn.build($this,o,mode,current,incfactor);	
						if(o.autoplay && o.cycle){
							var f_slide 	= function(){$('.next',$this).click()}
							playing			= true;
							autoplayTime 	= setInterval(f_slide,o.autoplayTime);
						}
					}	
				}).attr('src',$(this).attr('src'));	
			});
			/*  handlers */
			$('.next',$this).live('click',function(){
				if(!$(this).hasClass('disabled')){
					if(mode == 'single'){
						$current 	= $('.images div:nth-child('+current+')',$this);
						$next 		= $current.next();
						var descText= '';
						if($next.length){
							descText 	= $('img',$next).attr('alt');
							$current.hide();
							$next.css('display','table-cell');
							++current;	
							if(!o.cycle) $.fn.checkLimits($this,current);
						}
						else if(o.cycle){
							$next 		= $('.images div:nth-child(1)',$this);
							descText 	= $('img',$next).attr('alt');
							$current.hide();
							$next.css('display','table-cell');
							current=1;	
							if(!o.cycle) $.fn.checkLimits($this,current);
						}
						$('.description',$this).stop().animate({'bottom':'0px'},50,function(){
							if(descText!='') $('div',$(this)).html(descText).parent().animate({'bottom':'-40px'},200);
						});
					}
					else{
						$lastinset		= $('.images div:visible:last',$this);
						var idxLast 	= $lastinset.index();
						
						var $testnext 	= $('.images div:nth-child('+parseInt(idxLast+1+1)+')',$this);
						if($testnext.length)						
							$('.images div',$this).hide().slice(parseInt(idxLast+1),parseInt(idxLast+incfactor+1)).css('display','table-cell');
						else
							$('.images div',$this).hide().slice(0,incfactor).css('display','table-cell');
							
						$lastinsetnew	= $('.images div:visible:last',$this);
						var idxLastnew 	= $lastinsetnew.index();
						$firstinset		= $('.images div:visible:first',$this);
						var idxFirst 	= $firstinset.index();
						if(!o.cycle) $.fn.checkLimits4Thumbs($this,idxFirst+1,idxLastnew+1);
					}
				}
			});
			$('.prev',$this).live('click',function(){
				if(!$(this).hasClass('disabled')){
					if(mode == 'single'){
						$current 	= $('.images div:nth-child('+current+')',$this);
						$prev 		= $current.prev();
						var descText= '';
						if($prev.length){
							descText 	= $('img',$prev).attr('alt');
							$current.hide();
							$prev.css('display','table-cell');
							--current;
							if(!o.cycle) $.fn.checkLimits($this,current);
						}
						else if(o.cycle){
							var cnt_childs = $('.images div',$this).children().size();
							$prev 		= $('.images div:nth-child('+cnt_childs+')',$this);
							descText 	= $('img',$prev).attr('alt');
							$current.hide();
							$prev.css('display','table-cell');
							current=cnt_childs;	
							if(!o.cycle) $.fn.checkLimits($this,current);
						}
						$('.description',$this).stop().animate({'bottom':'0px'},50,function(){
							if(descText!='') $('div',$(this)).html(descText).parent().animate({'bottom':'-40px'},200);
						});
					}
					else{
						$firstinset			= $('.images div:visible:first',$this);
						var idxFirst 		= $firstinset.index();
						var cnt_childs 		= $('.images div',$this).children().size();
						var cnt_lastset		= cnt_childs%incfactor;
						if(idxFirst == 0)
							$('.images div',$this).hide().slice(parseInt(cnt_childs-cnt_lastset),parseInt(cnt_childs)).css('display','table-cell');
						else
							$('.images div',$this).hide().slice(parseInt(idxFirst-incfactor),parseInt(idxFirst)).css('display','table-cell');
						
						$lastinset			= $('.images div:visible:last',$this);
						var idxLast 		= $lastinset.index();
						$firstinsetnew		= $('.images div:visible:first',$this);
						var idxFirstnew 	= $firstinsetnew.index();
						if(!o.cycle) $.fn.checkLimits4Thumbs($this,idxFirstnew+1,idxLast+1);
					}
				}
			});
			$('.images div',$this).live('click',function(){
				//only if in thumb mode
				if(mode == 'thumbs'){
					/* get the index of the clickable image */
					var $theImage 	= $('img',$(this));
					var idx 		= $(this).index();
					
					current = idx+1;
					
					var descText 	= $('img',$(this)).attr('alt');
					$('.description',$this).stop().animate({'bottom':'0px'},50,function(){
							if(descText!='') $('div',$(this)).html(descText).parent().animate({'bottom':'-40px'},200);
					});
						
					$.fn.toggleMode($this,mode,current,o);	
					mode='single';
					if(!o.cycle) $.fn.checkLimits($this,current);
					$('.thumbview',$this).removeClass('single').addClass('grid');
				}	
			});
			$('.thumbview',$this).live('click',function(){
				(mode == 'single')?$(this).removeClass('grid').addClass('single'):$(this).removeClass('single').addClass('grid');
				$.fn.toggleMode($this,mode,current,o,incfactor);
				(mode == 'single')?mode='thumbs':mode='single';
				
				if (mode == 'single'){
					if(!o.cycle)
						$.fn.checkLimits($this,current);
					
					$current 	= $('.images div:nth-child('+current+')',$this);
					var descText 	= $('img',$current).attr('alt');
					$('.description',$this).stop().animate({'bottom':'0px'},50,function(){
							if(descText!='') $('div',$(this)).html(descText).parent().animate({'bottom':'-40px'},200);
					});	
				}		
				else{
					$('.description',$this).stop().animate({'bottom':'0px'},50);
					$lastinset		= $('.images div:visible:last',$this);
					var idxLast 	= $lastinset.index();
					$firstinset		= $('.images div:visible:first',$this);
					var idxFirst	= $firstinset.index();
					if(!o.cycle) $.fn.checkLimits4Thumbs($this,idxFirst+1,idxLast+1);
				}	
			});  
			$('.slideshow',$this).live('click',function(){
				if(playing){
					$(this).removeClass('pause').addClass('play');
					clearInterval(autoplayTime);
					playing			= false;
				}
				else{
					$(this).removeClass('play').addClass('pause');
					$('.next',$this).click();
					var f_slide 	= function(){$('.next',$this).click()}
					autoplayTime 	= setInterval(f_slide,o.autoplayTime);
					playing			= true;				
				}
			});			
		});
	};
	$.fn.microgallery.defaults = {
		size		: 'small',	/*small,medium,large*/
		menu		: true,
        mode    	: 'single',
		cycle	: false,
		autoplay	: false,
		autoplayTime: 3000	
	};
	$.fn.microgallery.sizes = {
		smallW		: 102,
		smallH		: 102,
		smallThumbW	: 30,
		smallThumbH	: 30,
		mediumW		: 162,
		mediumH		: 162,
		mediumThumbW: 50,
		mediumThumbH: 50,
		largeW		: 222,
		largeH		: 222,
		largeThumbW	: 70,
		largeThumbH	: 70
	};
	$.fn.build 				= function($this,o,mode,current,incfactor){
			$this.find('img').wrap('<div style="display:none"/>').show();
			switch(o.size){
				case 'small'	:	
					$this.addClass('smallGallery');
					break;
				case 'medium'	:	
					$this.addClass('mediumGallery');
					break;
				case 'large'	:	
					$this.addClass('largeGallery');
					break;	
				default			:
					$this.addClass('smallGallery');
					break;	
			}
			
			var $images = $('<div/>',{
				className	:	'images singleImg'
			});
			
			$this.find('div').each(function(){
				var $theImage = $('img',$(this));
				$.fn.resize($theImage,'thumbs',o);
				$images.append($(this));
			});
			
			$images.find('div:first').css('display','table-cell');
			
			var prevClass = 'disabled';
			if(o.cycle)
				prevClass = '';
			var autoplayHTML  = '';	
			if(o.autoplay && o.cycle){
				autoplayClass = 'pause';
				autoplayHTML  = '<a class="slideshow '+autoplayClass+'"></a>';	
			}
			var $nav = $('<div/>',{
			    className	:	'nav',
				html		:	'<a class="thumbview grid"></a>'+autoplayHTML+'<button class="next"></button><button class="prev '+prevClass+'"></button>'
			});
			if(!o.menu){
				$nav.css('top','0px');
				$this.hover(
					function(){
						$nav.stop().animate({'top':'-30px'},500);
					},
					function(){
						$nav.stop().animate({'top':'0px'},500);
					}
				);
			}	
			var descFirst 	 = $images.find('div:first > img').attr('alt');
			var descHTML	 = '<div class="">'+descFirst+'</div>';
			var $description = $('<div/>',{
			    className	:	'description',
				html		:	descHTML
			});
			$this.append($nav).append($description).append($images);
			if(descFirst!='' && mode=='single')
				$description.stop().animate({'bottom':'-40px'},200);
				
			
				
			if(mode=='thumbs'){
				$('.thumbview',$this).removeClass('grid').addClass('single');
                $.fn.toggleMode($this,'single',current,o,incfactor);	
				if(!o.cycle) $.fn.checkLimits($this,current)
            }
	};
	$.fn.toggleMode 		= function($mg,mode,current,o,incfactor){
		var $images = $('.images',$mg);
		if(mode == 'single'){
			$('img',$images).each(function(){
				var $theImage = $(this);
				$.fn.resize($theImage,mode,o);
			});
			$('div',$images).hide();
			var set = Math.floor((current-1)/incfactor)+1;
			var pos = set*incfactor;
			$images.removeClass('singleImg').addClass('thumbs').find('div').slice(pos-incfactor,pos).css('display','table-cell');
		}	
		else{
			$('img',$images).each(function(){
				var $theImage = $(this);
				$.fn.resize($theImage,mode,o);
			});
			$images.removeClass('thumbs').addClass('singleImg').find('div').hide();
			$images.find('div:nth-child('+current+')').css('display','table-cell');
		}
	};
	$.fn.checkLimits 		= function($mg,current){
		$current 	= $('.images div:nth-child('+current+')',$mg);
		$next 		= $current.next();
		$prev 		= $current.prev();
		(!$next.length)?$('.next',$mg).addClass('disabled'):$('.next',$mg).removeClass('disabled');	
		(!$prev.length)?$('.prev',$mg).addClass('disabled'):$('.prev',$mg).removeClass('disabled');	
	};
	$.fn.checkLimits4Thumbs = function($mg,left,right){
		$right 		= $('.images div:nth-child('+right+')',$mg);
		$left 		= $('.images div:nth-child('+left+')',$mg);
		$next 		= $right.next();
		$prev 		= $left.prev();
		(!$next.length)?$('.next',$mg).addClass('disabled'):$('.next',$mg).removeClass('disabled');	
		(!$prev.length)?$('.prev',$mg).addClass('disabled'):$('.prev',$mg).removeClass('disabled');	
	};
	$.fn.resize 			= function($img,mode,o){
		var maxW = 0;
		var maxH = 0;
		if(mode == 'single'){
			switch(o.size){
				case 'small'	:	
					maxW = $.fn.microgallery.sizes.smallThumbW;
					maxH = $.fn.microgallery.sizes.smallThumbH;
					break;
				case 'medium'	:	
					maxW = $.fn.microgallery.sizes.mediumThumbW;
					maxH = $.fn.microgallery.sizes.mediumThumbH;
					break;
				case 'large'	:	
					maxW = $.fn.microgallery.sizes.largeThumbW;
					maxH = $.fn.microgallery.sizes.largeThumbH;
					break;	
				default			:
					maxW = $.fn.microgallery.sizes.smallThumbW;
					maxH = $.fn.microgallery.sizes.smallThumbH;
					break;	
			}
		}
		else{
			switch(o.size){
				case 'small'	:	
					maxW = $.fn.microgallery.sizes.smallW;
					maxH = $.fn.microgallery.sizes.smallH;
					break;
				case 'medium'	:	
					maxW = $.fn.microgallery.sizes.mediumW;
					maxH = $.fn.microgallery.sizes.mediumH;
					break;
				case 'large'	:	
					maxW = $.fn.microgallery.sizes.largeW;
					maxH = $.fn.microgallery.sizes.largeH;
					break;	
				default			:
					maxW = $.fn.microgallery.sizes.smallW;
					maxH = $.fn.microgallery.sizes.smallH;
					break;	
			}
		}
		var theImage = new Image();
		theImage.src = $img.attr('src');
		var imgwidth = theImage.width;
		var imgheight = theImage.height;
		
		if(imgwidth > maxW){
			var newwidth = maxW;
			var ratio = maxW / imgwidth;
			var newheight = imgheight * ratio;
			if(newheight > maxH){
				var newnewheight = maxH;
				var newratio = maxH/newheight;
				var newnewwidth =maxW * newratio;
				$img.attr('width',newnewwidth);
				$img.attr('height',newnewheight);	
			}
			else{
				$img.attr('width',newwidth);
				$img.attr('height',newheight);	
			}
		}
		else if(imgheight > maxH){
			var newheight = maxH;
			var ratio = maxH / imgheight;
			var newwidth = imgwidth * ratio;
			if(newwidth > maxW){
				var newnewwidth = maxW;
				var newratio = maxW/newwidth;
				var newnewheight =maxH*newratio;
				$img.attr('height',newnewheight);
				$img.attr('width',newnewwidth);	
			}
			else{
				$img.attr('width',newwidth);
				$img.attr('height',newheight);	
			}
		}
		else{
			$img.attr('width',imgwidth);
			$img.attr('height',imgheight);
		}	
	};
})(jQuery);