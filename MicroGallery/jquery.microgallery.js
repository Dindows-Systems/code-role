(function($) {
	$.fn.microgallery = function(options) {
		var opts = $.extend({}, $.fn.microgallery.defaults, options);
		return this.each(function() {
			var $this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			var current=1;
			var mode=o.mode;
			var incfactor = 9;
			var _cnt = 0;
			var _all = $this.find('img').size();
			$this.find('img').each(function(){
				var theImage = new Image();
				$(theImage).load(function(){
					++_cnt;
					if(_cnt == _all)
						$.fn.build($this,o,mode,current,incfactor);	
				}).attr('src',$(this).attr('src'));	
			});
			/*  handlers */
			$('.next',$this).live('click',function(){
				if(!$(this).hasClass('disabled')){
					if(mode == 'single'){
						$current 	= $('.images div:nth-child('+current+')',$this);
						$next 		= $current.next();
						if($next.length){
							$current.hide();
							$next.css('display','table-cell');
							++current;	
							$.fn.checkLimits($this,current);
						}
					}
					else{
						$lastinset		= $('.images div:visible:last',$this);
						var idxLast 	= $lastinset.index();					
						
						$('.images div',$this).hide().slice(parseInt(idxLast+1),parseInt(idxLast+incfactor+1)).css('display','table-cell');
						
						$lastinsetnew	= $('.images div:visible:last',$this);
						var idxLastnew 	= $lastinsetnew.index();
						$firstinset		= $('.images div:visible:first',$this);
						var idxFirst 	= $firstinset.index();
						$.fn.checkLimits4Thumbs($this,idxFirst+1,idxLastnew+1);		
					}
				}
			});
			$('.prev',$this).live('click',function(){
				if(!$(this).hasClass('disabled')){
					if(mode == 'single'){
						$current 	= $('.images div:nth-child('+current+')',$this);
						$prev 		= $current.prev();
						if($prev.length){
							$current.hide();
							$prev.css('display','table-cell');
							--current;
							$.fn.checkLimits($this,current);					
						}
					}
					else{
						$firstinset		= $('.images div:visible:first',$this);
						var idxFirst 	= $firstinset.index();
						$('.images div',$this).hide().slice(parseInt(idxFirst-incfactor),parseInt(idxFirst)).css('display','table-cell');
						$lastinset		= $('.images div:visible:last',$this);
						var idxLast 	= $lastinset.index();
						$firstinsetnew		= $('.images div:visible:first',$this);
						var idxFirstnew 	= $firstinsetnew.index();
						$.fn.checkLimits4Thumbs($this,idxFirstnew+1,idxLast+1);		
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
					$.fn.toggleMode($this,mode,current,o);	
					mode='single';
					$.fn.checkLimits($this,current);
					$('.thumbview',$this).removeClass('single').addClass('grid');
				}	
			});
			$('.thumbview',$this).live('click',function(){
				(mode == 'single')?$(this).removeClass('grid').addClass('single'):$(this).removeClass('single').addClass('grid');
				$.fn.toggleMode($this,mode,current,o,incfactor);
				(mode == 'single')?mode='thumbs':mode='single';
				
				if (mode == 'single')
					$.fn.checkLimits($this,current)
				else{
					$lastinset		= $('.images div:visible:last',$this);
					var idxLast 	= $lastinset.index();
					$firstinset		= $('.images div:visible:first',$this);
					var idxFirst	= $firstinset.index();
					$.fn.checkLimits4Thumbs($this,idxFirst+1,idxLast+1);		
				}	
			});
            
		});
	};
	$.fn.microgallery.defaults = {
		size	: 'small',	/*small,medium,large*/
		menu	: true,
        mode    : 'single'
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
	$.fn.build = function($this,o,mode,current,incfactor){
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
			
			var $nav = $('<div/>',{
			    className	:	'nav',
				html		:	'<a class="thumbview grid"></a><button class="next"></button><button class="prev disabled"></button>'
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

			$this.append($nav).append($images);
			
			if(mode=='thumbs'){
				$('.thumbview',$this).removeClass('grid').addClass('single');
                $.fn.toggleMode($this,'single',current,o,incfactor);	
				$.fn.checkLimits($this,current)
            }
	};
	$.fn.toggleMode = function($mg,mode,current,o,incfactor){
		var $images = $('.images',$mg);
		if(mode == 'single'){
			//$.fn.resize($('img',$images),mode,o);
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
			//$.fn.resize($('img',$images),mode,o);
			$('img',$images).each(function(){
				var $theImage = $(this);
				$.fn.resize($theImage,mode,o);
			});
			$images.removeClass('thumbs').addClass('singleImg').find('div').hide();
			$images.find('div:nth-child('+current+')').css('display','table-cell');
		}
	};
	$.fn.checkLimits = function($mg,current){
		$current 	= $('.images div:nth-child('+current+')',$mg);
		$next 		= $current.next();
		$prev 		= $current.prev();
		(!$next.length)?$('.next',$mg).addClass('disabled'):$('.next',$mg).removeClass('disabled');	
		(!$prev.length)?$('.prev',$mg).addClass('disabled'):$('.prev',$mg).removeClass('disabled');	
	};
	$.fn.checkLimits4Thumbs = function($mg,left,right){
		$right 	= $('.images div:nth-child('+right+')',$mg);
		$left 	= $('.images div:nth-child('+left+')',$mg);
		$next 		= $right.next();
		$prev 		= $left.prev();
		(!$next.length)?$('.next',$mg).addClass('disabled'):$('.next',$mg).removeClass('disabled');	
		(!$prev.length)?$('.prev',$mg).addClass('disabled'):$('.prev',$mg).removeClass('disabled');	
	};
	$.fn.resize = function($img,mode,o){
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