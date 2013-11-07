/*
This basically taken from the jPlayer demos. 
*/
var Playlist = function(playlist, options) {
	var self = this;

	this.playlist 	= playlist; // Array of Objects: The playlist
	this.options 	= options; // Object: The jPlayer constructor options for this playlist

	this.current = 0;
	
	this.cssId = {
		jPlayer				: "jquery_jplayer",
		interface			: "jp_interface",
		playlist			: "jp_playlist"
	};
	this.cssSelector = {};

	$.each(this.cssId, function(entity, id) {
		self.cssSelector[entity] = "#" + id;
	});

	if(!this.options.cssSelectorAncestor) {
		this.options.cssSelectorAncestor = this.cssSelector.interface;
	}
	
	$(this.cssSelector.jPlayer).jPlayer(this.options);

	$(this.cssSelector.interface + " .jp-previous").click(function() {
		self.playlistPrev();
		$(this).blur();
		return false;
	});

	$(this.cssSelector.interface + " .jp-next").click(function() {
		self.playlistNext();
		$(this).blur();
		return false;
	});
};

Playlist.prototype = {
	displayPlaylist	: function() {
		var self 		= this,
			listItems	= '';
		
		for (i = 0; i < this.playlist.length; i++) {
			var listItem 	= '<li><a href="#" id="item_' + i + '" tabindex="1">' + this.playlist[i].name + '</a></li>';
			
			listItems += listItem;
		}
		var $playlistUl  = $(this.cssSelector.playlist).children('ul');
		$playlistUl.empty().html(listItems);
		$playlistUl.children('li:last').addClass('jp-playlist-last');
		$playlistUl.children('li').bind('click', function() {
			var $el		= $(this);
				index 	= $el.index();
				
			if(self.current !== index) {
				self.playlistChange(index);
			} else {
				$(this.cssSelector.jPlayer).jPlayer('play');
			}
			$el.blur();
			return false;	
		});
	},
	playlistInit	: function(autoplay) {
		if(autoplay) {
			this.playlistChange(this.current);
		} else {
			this.playlistConfig(this.current);
		}
	},
	playlistConfig	: function(index) {
		$("#item_" + this.current).removeClass("jp-playlist-current").parent().removeClass("jp-playlist-current");
		$("#item_" + index).addClass("jp-playlist-current").parent().addClass("jp-playlist-current");
		this.current = index;
		$(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[this.current]);
	},
	playlistChange	: function(index) {
		this.playlistConfig(index);
		$(this.cssSelector.jPlayer).jPlayer("play");
	},
	playlistNext	: function() {
		var index = (this.current + 1 < this.playlist.length) ? this.current + 1 : 0;
		this.playlistChange(index);
	},
	playlistPrev	: function() {
		var index = (this.current - 1 >= 0) ? this.current - 1 : this.playlist.length - 1;
		this.playlistChange(index);
	},
	playlistDestroy	: function() {
		$(this.cssSelector.jPlayer).jPlayer("destroy");
	}
};