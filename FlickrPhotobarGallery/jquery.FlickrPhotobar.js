$(function() {
	var api_key 			= '96cb831abdd3e122354be4f414c96fe4';
	var user_id  			= '8381313@N08';
	
	/*
	use:
	Square,Thumbnail,Small,Medium or Original for the large image size you want to load!
	*/
	var large_image_size 	= 'Medium';
	/*
	the current Set id / the current Photo id
	*/
	var photo_set_id,photo_id;
	var current	= -1;
	var continueNavigation = false;
	/*
	flickr API Call to get List of Sets
	*/
	var sets_service 		= 'http://api.flickr.com/services/rest/?&method=flickr.photosets.getList' + '&api_key=' + api_key;
	var sets_url			= sets_service + '&user_id=' + user_id + '&format=json&jsoncallback=?';
	/*
	flickr API Call to get List of Photos from a Set
	*/
	var photos_service 		= 'http://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos' + '&api_key=' + api_key;
	/*
	flickr API Call to get List of Sizes of a Photo
	*/
	var large_photo_service = 'http://api.flickr.com/services/rest/?&method=flickr.photos.getSizes' + '&api_key=' + api_key;
	/* 
	elements caching... 
	*/
	var $setsContainer 		= $('#sets').find('ul');
	var $photosContainer 	= $('#images').find('ul');
	var $photopreview		= $('#flickr_photopreview');
	var $flickrOverlay		= $('#flickr_overlay');
	var $loadingStatus		= $('#flickr_toggle').find('.loading_small');
	
	var ul_width,spacefit,fit;
	
	/* start: open Flickr Photostream */
	$('#flickr_toggle').toggle(function(){
		$('#photobar').stop().animate({'bottom':'0px'},200,function(){
			if($setsContainer.is(':empty')){
				/*
				if sets not loaded, load them
				*/
				LoadSets();
			}
		});
	},function(){
		/*
		minimize the main bar, and minimize the photos bar.
		next time we maximize, the view will be on the sets
		*/
		$('#photobar').stop().animate({'bottom':'-96px'},200,function(){
			$('#images').css('bottom','-125px');
		});
	});
	
	/*
	Loads the User Photo Sets
	*/
	function LoadSets(){
		$loadingStatus.css('visibility','visible');
		
		$.getJSON(sets_url,function(data){
			if(data.stat != 'fail') {
				var sets_count = data.photosets.photoset.length;
				/*
				adapt ul width based on number of results
				*/
				ul_width = sets_count * 85 + 85;
				$setsContainer.css('width',ul_width + 'px');
				
				for(var i = 0; i < sets_count; ++i){
					var photoset		= data.photosets.photoset[i];
					var primary 		= photoset.primary;
					var secret			= photoset.secret;
					var server			= photoset.server;
					var farm			= photoset.farm;
					/*
					source for the small thumbnail
					*/
					var photoUrl		= 'http://farm'+farm+'.static.flickr.com/'+server+'/'+primary+'_'+secret+'_s.jpg';
					var $elem 			= $('<li />');
					var $link 			= $('<a class="toLoad" href="#" />');
					/*
					save the info of the set in the li element,
					we will use it later	
					*/
					$link.data({
						'primary'	:primary,
						'secret'	:secret,
						'server'	:server,
						'farm'		:farm,
						'photoUrl'	:photoUrl,
						'setName'	:photoset.title._content,
						'id'		:photoset.id
					});
					
					$setsContainer.append($elem.append($link));
					$link.bind('click',function(e){
						var $this = $(this);
						/*
						save the current Set id in the photo_set_id variable
						and load the photos of that Set
						*/
						$('#images').stop().animate({'bottom':'0px'},200);
						if(photo_set_id!=$this.data('id')){
							photo_set_id = $this.data('id');
							$('#setName').html($this.data('setName'));
							LoadPhotos();
						}
						e.preventDefault();
					});
				}
				/*
				now we load the images 
				(the ones in the viewport)
				*/
				LoadSetsImages();
			}
		});	
	}
	
	/*
	loads the images of the sets that are in the viewport
	*/
	function LoadSetsImages(){
		var toLoad 			= $('.toLoad:in-viewport').size();
		if(toLoad > 0)
			$loadingStatus.css('visibility','visible');
		var images_loaded 	= 0;
		$('.toLoad:in-viewport').each(function(i){
			var $space			= $setsContainer.find('.toLoad:first');
			var $img 			= $('<img style="display:none;" />').load(function(){
				++images_loaded;
				if(images_loaded == toLoad){
					$loadingStatus.css('visibility','hidden');
					$setsContainer.find('img').fadeIn();
				}	
			}).error(function(){
				//TODO
				++images_loaded;
				if(images_loaded == toLoad){
					$loadingStatus.css('visibility','hidden');
					$setsContainer.find('img').fadeIn();
				}	
			}).attr('src',$space.data('photoUrl')).attr('alt',$space.data('id'));
			var $set_name		= $('<span />',{'html':$space.data('setName')});
			$space.append($set_name).append($img).removeClass('toLoad');
		});
	}
	
	/*
	Loads the Set's Photos
	*/
	function LoadPhotos(){
		$photosContainer.empty();
		$loadingStatus.css('visibility','visible');
		var photos_url	= photos_service + '&photoset_id=' + photo_set_id + '&media=photos&format=json&jsoncallback=?';
		
		$.getJSON(photos_url,function(data){
			if(data.stat != 'fail') {
				var photo_count = data.photoset.photo.length;
				/*
				adapt ul width based on number of results
				*/
				var photo_count_total = photo_count + $photosContainer.children('li').length;
				ul_width = photo_count_total * 85 + 85;
				$photosContainer.css('width',ul_width + 'px');
				
				for(var i = 0; i < photo_count; ++i){	
					var photo			= data.photoset.photo[i];
					var photoid			= photo.id;
					
					var secret			= photo.secret;
					var server			= photo.server;
					var farm			= photo.farm;
					
					var photoUrl		= 'http://farm'+farm+'.static.flickr.com/'+server+'/'+photoid+'_'+secret+'_s.jpg';
					
					var $elem 			= $('<li />');
					var $link 			= $('<a class="toLoad" href="#" />');
					
					$link.data({
						'photoid'		:photoid,
						'secret'		:secret,
						'server'		:server,
						'farm'			:farm,
						'photoUrl'		:photoUrl,
						'photo_title'	:photo.title
					});
					$photosContainer.append($elem.append($link));
					
					$link.bind('click',function(e){
						var $this	= $(this);
						current		= $this.parent().index();
						photo_id 	= $this.data('photoid');
						LoadLargePhoto();
						e.preventDefault();
					});
				}
				LoadPhotosImages();
			}
			
		});
	}
	
	/*
	loads the images of the set's 
	photos that are in the viewport
	*/
	function LoadPhotosImages(){
		var toLoad 			= $('.toLoad:in-viewport').size();
		if(toLoad > 0)
			$loadingStatus.css('visibility','visible');
		var images_loaded 	= 0;
		
		$('.toLoad:in-viewport').each(function(i){
			var $space			= $photosContainer.find('.toLoad:first');
			var $img 			= $('<img style="display:none;" />').load(function(){
				++images_loaded;
				if(images_loaded == toLoad){
					$loadingStatus.css('visibility','hidden');
					$photosContainer.find('img').fadeIn();
					/*
					if we were navigating through the large images set:
					*/
					if(continueNavigation){
						continueNavigation 	= false;
						var $thumb 			= $photosContainer.find('li:nth-child(' + parseInt(current + 1) + ')').find('img');
						photo_id 			= $thumb.attr('alt');
						LoadLargePhoto();
					}
				}	
			}).error(function(){
				//TODO
				++images_loaded;
				if(images_loaded == toLoad){
					$loadingStatus.css('visibility','hidden');
					$photosContainer.find('img').fadeIn();
					/*
					if we were navigating through the large images set:
					*/
					if(continueNavigation){
						continueNavigation 	= false;
						var $thumb 			= $photosContainer.find('li:nth-child(' + parseInt(current + 1) + ')').find('img');
						photo_id 			= $thumb.attr('alt');
						LoadLargePhoto();
					}
				}				
			}).attr('src',$space.data('photoUrl'))
			  .attr('alt',$space.data('photoid'));
			
			var $photo_title	= $('<span/>',{'html':$space.data('photo_title')});
			$space.append($photo_title).append($img).removeClass('toLoad');
		});
	}
	
	/*
	loads the main image
	*/
	function LoadLargePhoto(){
		removeLargeImage();
		
		var $theThumb 	= $photosContainer.find('li:nth-child(' + parseInt(current + 1) + ')').find('img');
		var photo_title = $theThumb.parent().data('photo_title');
		
		var $loading	= $photopreview.find('.loading');
		$loading.show();
		$photopreview.show();
		$flickrOverlay.show();
		$('#preview_close').show();
		
		var large_photo_url = large_photo_service + '&photo_id=' + photo_id + '&format=json&jsoncallback=?';
		$.getJSON(large_photo_url,function(data){
			if(data.stat != 'fail') {
				var count_sizes 		= data.sizes.size.length;
				var largest_photo_src;
				for(var i = 0; i < count_sizes; ++i){
					if(data.sizes.size[i].label == large_image_size)
						largest_photo_src 	= data.sizes.size[i].source;
				}
				$('<img />').load(function(){
					var $this = $(this);
					/*
					resize the image to fit in the browser's window
					*/
					resize($this);
					
					$loading.hide();
					/*just to make sure theres no image:*/
					removeLargeImage();
					$photopreview.find('.preview').append($this);
					$('#large_phototitle').empty().html(photo_title);						
				}).attr('src',largest_photo_src);
			}
		});
	}
	
	/*
	close the Large Image View
	*/
	$('#preview_close').bind('click',function(){
		$photopreview.hide();
		$flickrOverlay.hide();
		$('#preview_close').hide();
		$('#large_phototitle').empty()
		removeLargeImage();
	});
	
	/*
	removes the large image from the DOM
	*/
	function removeLargeImage(){
		$photopreview.find('img').remove();
	}
	
	/*
	events to navigate through the Large Images
	*/
	$('#preview_img_next').bind('click',function(e){
		/*
		get the next one
		*/
		++current;
		
		var $link 	= $photosContainer.find('li:nth-child(' + parseInt(current + 1) + ')');
		var $thumb 	= $link.find('img');
		
		/* 
		if the next image is not loaded, 
		we need to scroll the photos container 
		and just then continue with the navigation
		*/
		if(!$thumb.length && $link.length){
			continueNavigation = true;
			removeLargeImage();
			$photopreview.find('.loading').show();
			$('#images').find('.next').trigger('click');
		}
		else if(!$thumb.length && !$link.length){
			--current;
			return;
		}	
		else{	
			photo_id 	= $thumb.attr('alt');
			LoadLargePhoto();
		}	
		e.preventDefault();
	});
	$('#preview_img_prev').bind('click',function(e){
		/*
		get the previous one
		*/
		var $link 	= $photosContainer.find('li:nth-child(' + parseInt(current) + ')');
		--current;
		var $thumb 	= $link.find('img');
		
		/* 
		if the previous image is not in the viewport, 
		we need to scroll the photos container 
		and just then continue with the navigation
		*/
		if(!$thumb.length && !$link.length){
			++current;
			return;
		}
		if(!$thumb.is(':in-viewport') && $link.length){
			$('#images').find('.prev').trigger('click');
		}						
		photo_id 	= $thumb.attr('alt');
		LoadLargePhoto();	
		e.preventDefault();
	});
	
	/*
	events to navigate through the sets / photos containers
	*/
	var scrollAllow = true;
	$('#sets,#images').find('.next').bind('click',function(e) {
		var target_id = $(e.target).parent().attr('id');
		
		var $theContainer;
		if(target_id == 'sets')
			$theContainer = $setsContainer;
		else if(target_id == 'images')
			$theContainer = $photosContainer;
			
		if(scrollAllow){
			scrollAllow		= false;
			spacefit 		= $(window).width() -44;
			fit 			= Math.floor(spacefit / 85);
			var left 		= parseFloat($theContainer.css('left'),10);
			var moveleft 	= left - (fit*85);
			if(ul_width - Math.abs(left) < $(window).width()){ 
				scrollAllow = true;
				e.preventDefault();
				return;
			}
			$theContainer.animate({'left':moveleft+'px'},1000,function(){
				scrollAllow = true;
				if(target_id == 'sets')
					LoadSetsImages();
				else if(target_id == 'images')
					LoadPhotosImages();
			});
			e.preventDefault();
		}
	});
	$('#sets,#images').find('.prev').bind('click',function(e) {
		var target_id = $(e.target).parent().attr('id');
		
		var $theContainer;
		if(target_id == 'sets')
			$theContainer = $setsContainer;
		else if(target_id == 'images')
			$theContainer = $photosContainer;
			
		if(scrollAllow){
			scrollAllow		= false;
			spacefit 		= $(window).width() -44;
			fit 			= Math.floor(spacefit / 85);
			var left = parseFloat($theContainer.css('left'),10);
			var moveleft = left + (fit*85);
			if(left >= 0){ 
				scrollAllow = true;
				e.preventDefault();
				return;
			}
			$theContainer.animate({'left':moveleft+'px'},1000,function(){
				scrollAllow = true;
			});
			e.preventDefault();
		}
	});
	
	/*
	when cliking "Back to Sets"
	minimize photos bar
	*/
	$('#images_toggle').bind('click',function(){
		$('#images').stop().animate({'bottom':'-125px'},200);
	});	
	
	/*
	when resizing the window, resize the main image
	*/
	$(window).bind('resize', function() {
		var $theLargeImage = $photopreview.find('img');
		if($theLargeImage.length)
			resize($theLargeImage);
	});	
	
	/*
	resizes the main image based on the windows sizes
	*/		
	function resize($image){
		var widthMargin		= 10
		var heightMargin 	= 60;
		var windowH      = $(window).height()-heightMargin;
		var windowW      = $(window).width()-widthMargin;
		$photopreview.find('.preview').css({'width':$(window).width()+'px','height':($(window).height()-25)+'px'});
		var theImage     = new Image();
		theImage.src     = $image.attr("src");
		var imgwidth     = theImage.width;
		var imgheight    = theImage.height;

		if((imgwidth > windowW)||(imgheight > windowH)){
			if(imgwidth > imgheight){
				var newwidth 	= windowW;
				var ratio 		= imgwidth / windowW;
				var newheight	= imgheight / ratio;
				theImage.height = newheight;
				theImage.width	= newwidth;
				if(newheight>windowH){
					var newnewheight= windowH;
					var newratio 	= newheight/windowH;
					var newnewwidth = newwidth/newratio;
					theImage.width 	= newnewwidth;
					theImage.height	= newnewheight;
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
		$image.css({'width':theImage.width+'px','height':theImage.height+'px'});
	}
});