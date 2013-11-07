$(function() {
		//main albums wrapper 
	var $cdContainer		= $('#cd_container'),
		//all the albums (cd_album containers)
		
		$albums				= $cdContainer.children('.cd_album'),
		
		//total number of albums
		totalAlbums			= $albums.length,
		
		//the navigation for the albums
		$cd_navigation		= $('#cd_navigation'),	
		
		$cd_prev			= $cd_navigation.children('.cd_prev').hide(),
		$cd_next			= $cd_navigation.children('.cd_next').hide(),
		
		//current album (first one)
		$albumCurrent		= $albums.eq(0),
		
		//where the bg image is placed
		$cd_background		= $('#cd_background'),
		
		//loading image
		$loading			= $cd_background.children('.cd_loading'),
		
		//the wrapper for the audio player (hidden by default)
		$cd_player			= $('#jp-audio'),
		
		isIElt8				= ($.browser.msie && $.browser.version.substr(0,1) < 9),
		
		Template	 		= (function(){
			//if we want to use bgimages for the albums
			var bgimage				= true,
				
				init				= function() {
					$loading.show();//show loading status image
					
					$.when(loadImages()).done(function(){
						//hide the loading status image
						$loading.hide();
						//show navigation keys
						toggleNav(true);
						//show first album
						$albumCurrent.show();
						//initialize the events
						initEventsHandler();
					});
				},
				/* preloads a set of images */
				loadImages			= function() {
					return $.Deferred(
						function(dfd) {
							var Images = new Array();
							
							$albums.each(function(i) {
								var albumBGImage 	= $(this).data('bgimg'),
									albumImage		= albumBGImage.replace('images','thumbs');
								Images.push(albumBGImage);
								Images.push(albumImage);								
							});
							var total_images 	= Images.length,
								loaded			= 0;
							
							for(var i = 0; i < total_images; ++i){
								
								$('<img/>').load(function() {
									++loaded;
									if(loaded === total_images)
										dfd.resolve();
								}).attr('src' , Images[i]);
							}
						}
					).promise();
				},
				/*
				initialise the jScollPane (scroll plugin) for $el
				*/
				jScollPane			= function($el) {
					$el.jScrollPane({
						verticalDragMinHeight: 40,
						verticalDragMaxHeight: 40
					});
				},
				/*
				initializes some events
				*/
				initEventsHandler	= function() {
					/*
					clicking the title will open the album info and starts playing its songs.
					Also the bg image is changed
					*/
					$albums.find('h1:first').bind('click', function() {
						var $title				= $(this);
						//if the album is opened return
						if($title.data('opened'))
							return false;
						var $album				= $title.parent();
						showAlbum($album);
						//controls if the album is already opened
						$title.data('opened', true);
						return false;
					});
					
					/* navigates to the next album. If last shows first */
					$cd_next.bind('click', function() {
						navigate(1);
						return false;
					});
					
					/* navigates to the previous album. If first shows last */
					$cd_prev.bind('click', function() {
						navigate(0);
						return false;
					});
				},
				/*
				shows the next or previous album.
				if are not using a real browser, 
				we will see the current album rotating before the next / prev is shown
				*/
				navigate			= function(dir) {
					//if animated return
					if($albumCurrent.is(':animated'))
						return false;
					
					//we will animate the opacity..
					var animParam	= {opacity : 0};
					
					
					if (!isIElt8){
						//..and the rotation
						if(dir)
							animParam.rotate	= '360deg';
						else
							animParam.rotate	= '-360deg';
						
						$albumCurrent.stop().animate(animParam, 1000, function() {
							//after the animation reset the rotation and the opacity, 
							//and hide the album
							$(this).transform({'rotate'	: '0deg'})
								   .css('opacity', 1)
								   .hide();
						});
					}
					
					//check which element is next / previous
					var $nextEl	= (dir) ? $albumCurrent.next() : $albumCurrent.prev();
					
					//if none then either the first or the last, depending on dir
					if($nextEl.length === 0){
						$nextEl = (dir) ? $albums.eq(0) : $albums.eq(totalAlbums - 1);
					}	
					
					//new album fades in
					$nextEl.fadeIn(1000, function() {
						$albumCurrent	= $(this);
					});
					
					//special case for the special browser
					if (isIElt8)
						$albumCurrent.fadeOut(1000);
				},
				/*
				opens the album:
				shows some description (where we use the jScollPane scroll);
				> shows a back button to close the album;
				> slides the title to the left;
				> starts playing the albums songs;
				*/
				showAlbum			= function($album) {
					var $cd_back			= $album.find('.cd_back'),
						$cd_content			= $album.find('.cd_content'),
						$cd_content_inner	= $album.find('.cd_content_inner'),
						$title				= $album.find('h1:first'),
						$playlist			= $album.find('div.cd_playlist > ul');
					
					$albumCurrent			= $album; 
					
					//slides the title to the left
					$title.stop().animate({
						left	: - ($title.width() + 50) + 'px'
					}, 400);
					
					//this removes the inner image of the album
					$album.removeClass('cd_album_' + ($album.index() + 1));
					
					//shows the album content wrapper and applies 
					//the jScollPane scoll to the description container
					$cd_content.show();
					jScollPane($cd_content_inner);
					
					//hides navigation buttons
					toggleNav(false);
					
					if(bgimage) {
						//which bg image to show to this album?
						var source	= $album.data('bgimg');
						//change bg image
						changeBGImage(source);
					}
					
					var audioPlaylist = startPlaylist($playlist);
					
					//when clicking the back button 
					//we reverse this actions
					$cd_back.show()
							.unbind('click')
							.bind('click', function(e) {
								//titles slides to the original position
								$title.stop().animate({
									left	: '10px'
								}, 400);
								//hide back button 
								$cd_back.hide();
								//hide player wrapper
								$cd_player.hide();
								//show album image
								$album.addClass('cd_album_' + ($album.index() + 1));
								//hide content wrapper
								$cd_content.hide();
								//show navigation keys
								toggleNav(true);
								//remove the background image
								if(bgimage)
									removeBGImage();
								//stop the player
								audioPlaylist.playlistDestroy();
								//close the album
								$title.data('opened', false);
								return false;
					});
				},
				/*
				hide / show navigation buttons
				*/
				toggleNav			= function(visible) {
					(visible) ? showNav() : hideNav();
				},
				/*
				show navigation buttons
				*/
				showNav				= function() {
					$cd_prev.show();
					$cd_next.show();
				},
				/*
				hide navigation buttons
				*/
				hideNav				= function() {
					$cd_prev.hide();
					$cd_next.hide();
				},
				/*
				changes the background image
				*/
				changeBGImage		= function(img) {
					var $itemImage = $('<img src="'+img+'" alt="Background" class="cd_bgimage" style="display:none;"/>');
					$cd_background.prepend($itemImage);
					$itemImage.fadeIn(700);
				},
				/*
				removes the background image
				*/
				removeBGImage		= function() {
					$cd_background.find('img').fadeOut(700, function() {
						$(this).remove();
					});
				},
				/*
				starts playing the playlist for the current album
				*/
				startPlaylist		= function($playlist) {
					var playlist	= [];
					//obj holding each song's info (name | mp3 source | ogg source)
					$playlist.children('li').each(function(i) {
						var $song			= $(this),
							songName		= $song.html(),
							songMP3			= $song.data('mp3'),
							songOGA			= $song.data('oga'),
							playListSong 	= {
								name	: songName,
								mp3		: songMP3,
								oga		: songOGA
							};
							
						playlist.push(playListSong);
					});
					
					//show the player 
					$cd_player.show();
					
					//initialize a playlist
					var audioPlaylist = new Playlist(playlist, {
						ready		: function() {
							audioPlaylist.displayPlaylist();
							//parameter is a boolean for autoplay.
							audioPlaylist.playlistInit(true);
						},
						ended		: function() {
							//keep playing
							audioPlaylist.playlistNext();
						},
						play		: function() {
							$(this).jPlayer('pauseOthers');
						},
						//path to the jPlayer swf
						swfPath		: 'js/jPlayer',
						supplied	: 'mp3, oga',
						//flash with an HTML5 fallback
						solution	: 'html, flash'
					});
					
					return audioPlaylist;
				};
				
			return {
				init : init
			};
			
		})();
		
	/*
	call the init method of Template
	*/
	
	Template.init();
});