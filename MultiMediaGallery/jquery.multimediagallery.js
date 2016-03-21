$(function() {
var ready 		= true;
var navigate 	= false;
var MultimediaGallery = {
	/**
	* loaded 	: how many files were loaded already;
	* total		: total number of existing files
	* set		: number of items to load for each ajax call,
	* except the first one - it will load as much it fits in the window
	*/
	data				: {
		'loaded' 				: 0,	
		'total'					: 0,
		'set'					: 25
	},
	/**
	* method called innitially: register events 
	* and starts the gallery
	*/
	init					: function () {
		MultimediaGallery.initEventHandlers();
		MultimediaGallery.start();
	},
	/**
	* init the events
	*/
	initEventHandlers		: function () {
		$('#mmg_media_wrapper ul').delegate('a','mouseenter',function () {
			var $this   = $(this);
			$this.find('img').stop().animate({'opacity':'1.0'},200);
		}).delegate('a','mouseleave',function () {
			var $this   = $(this);
			$this.find('img').stop().animate({'opacity':'0.6'},200);
		}).delegate('a','click',function(e){
			MultimediaGallery.data.currentItem = $(this).parent().index()+1;
			MultimediaGallery.showItem();
			e.preventDefault();
		});
		$(window).bind('resize', function() {
			MultimediaGallery.centerWrapper();
			
			if(!$('#mmg_preview .preview_wrap').is(':empty')){
				if($('#mmg_large_photo').length > 0)
					MultimediaGallery.resize($('#mmg_large_photo'));
			}
		});
		$('#mmg_nav .next').bind('click',function(e){
			MultimediaGallery.data.currentItem = MultimediaGallery.data.currentItem+1;
			MultimediaGallery.showItem();
			e.preventDefault();
		});
		$('#mmg_nav .prev').bind('click',function(e){
			MultimediaGallery.data.currentItem = MultimediaGallery.data.currentItem-1;
			MultimediaGallery.showItem();
			e.preventDefault();
		});
		$('#mmg_item_close').live('click',function(e){
			MultimediaGallery.hideItem();
			e.preventDefault();
		});
		$('#mmg_more').bind('click',function(e){
			MultimediaGallery.more();
			e.preventDefault();
		});
	},
	/**
	* checks how many files we have
	* draws the structure
	* displays the first set
	*/
	start					: function () {
		$.get('multimedia.class.php', {op:'getTotalFiles'}, function(data) {
			MultimediaGallery.data.total = data;
			/**
			* draws the containers where our thumbs will be displayed,
			*/
			if(ready){
				var nmb_containers 		= MultimediaGallery.countSpaces();
				MultimediaGallery.draw(nmb_containers);
			}	
		},'text');
	},
	draw					: function (nmb_containers) {
		/**
		* load innitially the number of items that fit
		* on the window + a certain margin.
		* When resizing the window we follow the
		* same approach. All the other items will load
		* when the User clicks the more button
		*/
		var $list = $('#mmg_media_wrapper ul');
		for(var i=0; i < nmb_containers; ++i){
			$list.append($('<li />'));
		}
		MultimediaGallery.centerWrapper();
		MultimediaGallery.display();
	},
	/**
	* checks how many more thumbs we can display 
	* given the window dimentions
	*/
	countSpaces				: function () {
		var containerSizeW 				= $(window).width()-100;
		var photosPerRow 				= Math.floor(containerSizeW/188);
		var containerSizeH 				= $(window).height()-50;
		var photosPerColumn 			= Math.floor(containerSizeH/148) + 1;
		var nmb_containers 				= Math.min(MultimediaGallery.data.total,photosPerRow * photosPerColumn);
		var nmb_containers_in_viewport 	= $('#mmg_media_wrapper li:in-viewport').length;
		return nmb_containers-nmb_containers_in_viewport;
	},
	/**
	* centers the thumbs grid
	*/
	centerWrapper			: function () {
		var photosLength = $('#mmg_media_wrapper li').size();
		if(photosLength > 0) {
			var containerSize 	= $(window).width()-100;
			var photosPerRow 	= Math.floor(containerSize/188);

			//0 of paddings (if you want more...)
			var left = Math.floor((containerSize-(photosPerRow*188))/2);
			$('#mmg_media_wrapper li').each(function(i){
				var $this = $(this);
				if(i%photosPerRow == 0) {
					$this.css('margin-left',left+'px');
				}
				else {
					$this.css('margin-left','0px');
				}
			});
		}
	},
	/**
	* displays the first set of files
	* we need to check how many we can display for our window size!
	*/
	display					: function () {
		ready = false;
		if(MultimediaGallery.data.loaded == MultimediaGallery.data.total)
			return;
			
		var $list 			= $('#mmg_media_wrapper ul');
		
		var nmb_toLoad 		= $list.find('li:empty').length;
		if(nmb_toLoad == 0){
			ready = true;
			return;
		}	
		$.get('multimedia.class.php', {op:'display',req:nmb_toLoad,cursor:MultimediaGallery.data.loaded} , function(data) {
			var res  		= JSON.parse(data);
			var res_length 	= res.length;
			if(res_length == 0) ready = true;
			MultimediaGallery.incrementLoadedFiles(res.length);
			MultimediaGallery.showOptionMore();
			var total_loaded= 0;
			for(var i=0; i<res_length; ++i){
				var elem 			= res[i];
				var elem_thumb 		= elem.thumb;
				var elem_sources 	= elem.sources;
				var elem_type 		= elem.type;
				var elem_description= elem.description;
				$('<img alt="'+elem_type+'"/>').load(function(){
					var $this = $(this);
					total_loaded 	+= 1;
					MultimediaGallery.resizeGridImage($this);
					var $elem		= $('<a class="'+ $this.attr('alt') +'" href="#" />').append($this);
					$list.find('li:empty:first').append($elem);
					if(total_loaded == res_length){
						ready = true;
						/**
						* if the user was navigating through the items
						* show the next one...
						*/
						if(navigate){
							navigate = false;
							MultimediaGallery.showItem();
						}		
					}
				}).attr('src',elem_thumb)
				  .data('sources',elem_sources)
				  .data('type',elem_type)
				  .data('description',elem_description);
				
			}
			
		},'text');

	},
	/**
	* shows the button "more" if there are more items
	*/
	showOptionMore			: function () {
		if(MultimediaGallery.data.loaded == MultimediaGallery.data.total)
			$('#mmg_media_wrapper .more').hide();
		else
			$('#mmg_media_wrapper .more').show();
	},
	/**
	* increments the amount of loaded files
	*/
	incrementLoadedFiles	: function (newfiles) {
		MultimediaGallery.data.loaded += newfiles;	
	},
	/**
	* user clicks on more button
	*/
	more					: function (){
		if(ready){
			var nmb_containers 		= Math.min(MultimediaGallery.data.total-MultimediaGallery.data.loaded,MultimediaGallery.data.set)	
			MultimediaGallery.draw(nmb_containers);
		}					
	},
	/**
	* displays the item when user clicks on thumb (photo,video or audio)
	*/
	showItem				: function () {
		if(MultimediaGallery.data.currentItem < 1) return;
		
		$('#mmg_overlay,#mmg_preview').show();
		var $preview_wrap 	= $('#mmg_preview .preview_wrap');
		
		var $list 			= $('#mmg_media_wrapper ul');
		var $item 			= $list.find('li:nth-child('+ MultimediaGallery.data.currentItem +')').find('img');
		if(!$item.length){
			/**
			* reached the end, let's load more
			*/
			if(MultimediaGallery.data.currentItem == parseInt(MultimediaGallery.data.total)+1) {
				MultimediaGallery.data.currentItem = MultimediaGallery.data.currentItem-1;
				return
			};
			
			MultimediaGallery.more();
			navigate = true;
			return;
		}	
		$('#mmg_preview_loading').show();	
		/**
		* photo, video or audio
		*/
		var item_type 		= $item.data('type');
		var item_sources 	= $item.data('sources');
		var item_description= $item.data('description');
		switch(item_type){
			case 'photo':
				var $photo = $('<img id="mmg_large_photo"/>').load(function(){
					var $theImage = $(this);
					$preview_wrap.fadeOut(100,function(){
						$('#mmg_preview_loading').hide();
						$(this).empty().append('<a href="#" id="mmg_item_close" class="close"></a>').append($theImage).fadeIn();
						MultimediaGallery.changeDescription(item_description);
						MultimediaGallery.resize($theImage);
					})
				}).attr('src',item_sources[0].source);
				break;
			case 'audio':
				var $mediawrapper = $('<div />',{
					className	: 'media-player'
				});
				var sources_length 	= item_sources.length;
				var $sources		= '';
				for(var i = 0; i < sources_length; ++i){
					var theSource 	= item_sources[i].source;
					var format 		= theSource.substr(theSource.lastIndexOf('.')+1);
					$sources       += '<source src="'+theSource+'" type="'+ item_type +'/'+ format +'"/>';
				}
				var $audio = '<audio controls="controls">'+$sources+'</audio>';
				
				$preview_wrap.fadeOut(100,function(){
					$('#mmg_preview_loading').hide();
					$(this).empty().append('<a href="#" id="mmg_item_close" class="close"></a>').append($mediawrapper.html($.fixHTML5($audio))).fadeIn();
					MultimediaGallery.changeDescription(item_description);
					$mediawrapper.jmeEmbedControls();
					var audioW 	= 432;
					var audioH 	= 32;
					MultimediaGallery.centerPreview(audioW,audioH);
				});
				break;
			case 'video':
				var $mediawrapper = $('<div />',{
					className	: 'media-player _video'
				});
				
				var sources_length 	= item_sources.length;
				var $sources		= '';
				for(var i = 0; i < sources_length; ++i){
					var theSource 	= item_sources[i].source;
					$sources       += '<source src="'+theSource+'"/>';
				}
				var $video = '<video controls="controls" preload="none">'+$sources+'<div class="fallback"><div class="fallback-text"><p>Please use a modern browser or install <a href="http://www.videolan.org/">VLC (check Mozilla Plugin)</a> or <a href="http://get.adobe.com/flashplayer/">Flash-Plugin</a></p></div></div>'+'</video>';
				
				$preview_wrap.fadeOut(100,function(){
					$('#mmg_preview_loading').hide();
					$(this).empty().append('<a href="#" id="mmg_item_close" class="close"></a>').append($mediawrapper.html($.fixHTML5($video))).fadeIn();
					MultimediaGallery.changeDescription(item_description);
					$mediawrapper.jmeEmbedControls({
						timeSlider: {
							range: 'min'
						}
					}).bind('useractive', function(){
						$('div.media-controls', this).stop().animate({opacity: 1});
					}).bind('userinactive', function(){
						$('div.media-controls', this).stop().animate({opacity: 0});
					}).find('div.media-controls').css('opacity', 0);
					var videoW 	= 432;
					var videoH 	= 240;
					MultimediaGallery.centerPreview(videoW,videoH);
				});
				break;	
		}
	},
	/**
	* adds a description when there is one
	*/
	changeDescription		: function (item_description) {
		if(item_description=='')
			$('#mmg_description').hide();
		else	
			$('#mmg_description').empty().html('<p>' + item_description + '</p>').show();
	},
	/**
	* user clicks on the cross to close the item
	*/
	hideItem				: function () {
		var $preview_wrap 	= $('#mmg_preview .preview_wrap');
		$('#mmg_overlay,#mmg_preview,#mmg_description').hide();
		$preview_wrap.empty();
	},
	/**
	* resize the image (large image), based on windows width and height
	*/
	resize 					: function ($image){
		var widthMargin		= 10
		var heightMargin 	= 120;
		
		var windowH      = $(window).height()-heightMargin;
		var windowW      = $(window).width()-widthMargin;
		var theImage     = new Image();
		theImage.src     = $image.attr("src");
		var imgwidth     = theImage.width;
		var imgheight    = theImage.height;

		if((imgwidth > windowW)||(imgheight > windowH)){
			if(imgwidth > imgheight){
				var newwidth = windowW;
				var ratio = imgwidth / windowW;
				var newheight = imgheight / ratio;
				theImage.height = newheight;
				theImage.width= newwidth;
				if(newheight>windowH){
					var newnewheight = windowH;
					var newratio = newheight/windowH;
					var newnewwidth =newwidth/newratio;
					theImage.width = newnewwidth;
					theImage.height= newnewheight;
				}
			}
			else{
				var newheight = windowH;
				var ratio = imgheight / windowH;
				var newwidth = imgwidth / ratio;
				theImage.height = newheight;
				theImage.width= newwidth;
				if(newwidth>windowW){
					var newnewwidth = windowW;
					var newratio = newwidth/windowW;
					var newnewheight =newheight/newratio;
					theImage.height = newnewheight;
					theImage.width= newnewwidth;
				}
			}
		}
		$image.css({
			'width':theImage.width+'px',
			'height':theImage.height+'px'
		});
		MultimediaGallery.centerPreview(theImage.width,theImage.height);
	},
	/**
	* center the large image / video / audio on the page
	*/
	centerPreview			: function (width,height){
		var $preview_wrap 	= $('#mmg_preview .preview_wrap');
		$preview_wrap.css({
			'width':width+'px',
			'height':height+'px',
			'margin-top':-(height/2)-20+'px',
			'margin-left':-(width/2)-30+'px'
		});
	},
	/**
	* resize each thumb image in the grid view
	*/
	resizeGridImage 		: function ($image){
		var theImage 	= new Image();
		theImage.src 	= $image.attr("src");
		var imgwidth 	= theImage.width;
		var imgheight 	= theImage.height;
		
		var containerwidth  = 140;
		var containerheight = 100;
		
		if(imgwidth	> containerwidth){
			var newwidth = containerwidth;
			var ratio = imgwidth / containerwidth;
			var newheight = imgheight / ratio;
			if(newheight > containerheight){
				var newnewheight = containerheight;
				var newratio = newheight/containerheight;
				var newnewwidth =newwidth/newratio;
				theImage.width = newnewwidth;
				theImage.height= newnewheight;
			}
			else{
				theImage.width = newwidth;
				theImage.height= newheight;
			}
		}
		else if(imgheight > containerheight){
			var newheight = containerheight;
			var ratio = imgheight / containerheight;
			var newwidth = imgwidth / ratio;
			if(newwidth > containerwidth){
				var newnewwidth = containerwidth;
				var newratio = newwidth/containerwidth;
				var newnewheight =newheight/newratio;
				theImage.height = newnewheight;
				theImage.width= newnewwidth;
			}
			else{
				theImage.width = newwidth;
				theImage.height= newheight;
			}
		}
		$image.css({
			'width':theImage.width,
			'height':theImage.height
			});
	}
};

MultimediaGallery.init();
});