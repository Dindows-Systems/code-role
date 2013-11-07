(function(window,$) {
	$.fn.twitterpopup = function(options) {
		var opts 	= $.extend({}, $.fn.twitterpopup.defaults, options);
		return this.each(function() {
			var $this 	= $(this);
			var o 		= $.meta ? $.extend({}, opts, $this.data()) : opts;
			$this.bind('click',function(e){
				var $this 	= $(this);
				if($this.data('active'))
					return;
				var $search = $('<div class="search_results"></div>').appendTo($('BODY')); 
				$search.twitterSearch({ 
					term			: $this.html(), 
					bird			: false, 
					colorExterior	: '#ddd',
					colorInterior	: '#f6f6f6',
					pause			: true, 
					//time			: false, 
					timeout			: 3000 
				});
				var PopupPositions	= $.fn.twitterpopup.calculatePopupPositions($this,$search);
				
				$search.resizable({
					alsoResize	: $search.find('.twitterSearchContainter'),
					handles		: 'se'
				}).draggable();
				$search.css({
					left		: (PopupPositions.left 	+ 'px'),
					top			: (PopupPositions.top	+ 'px')
				}).show();
				$this.data('active',true);
				$search.find('.twitterSearchClose').bind('click',function(){
					$search.remove();
					$this.data('active',false);
				});
			});
			
		});	
	};
	/*
	gets the current viewport width and height
	*/
	$.fn.twitterpopup.getWindowSize			=	function (){
		var WindowSize = {
			width	: window.width(),
			height	: window.height()
		};
		return WindowSize;
	};
	/*
	calculates left and top for the popup to be displayed, based on the viewport width and height
	*/
	$.fn.twitterpopup.calculatePopupPositions	=	function ($elem,$popup){
		var WindowSize 	= $.fn.twitterpopup.getWindowSize();

		/* defaults sould be: */
		var popupL				= $elem.offset().left + $elem.width() + 20;
		var popupT				= $elem.offset().top;
		
		/* if final left+width of popup exceeds window width then popup should be placed on the left side */
		var popupWidth			= $popup.width();
		if(popupL + popupWidth  >  WindowSize.width)
			popupL		= $elem.offset().left - popupWidth - 20;
		
		/* if final top+height of popup exceeds window height then popup should be adjusted to fit the window */
		var $elemOffsetTop		= $elem.offset().top - window.scrollTop(); 
		var popupHeight			= $popup.height();
		
		/* cases: 
			1) when popup would be hidden on top of viewport 
			2) when popup would be hidden on bottom of viewport 
		*/
		if($elemOffsetTop < 0){				
			popupT 		= $elem.offset().top - $elemOffsetTop;
		}
		else if($elemOffsetTop + popupHeight  >  WindowSize.height){
			var diff 	= $elemOffsetTop + popupHeight - WindowSize.height;
			popupT 		= $elem.offset().top - diff - 20;	
		}
		
		/* new popup positions */
		var PopupPositions = {
			left	: popupL,
			top		: popupT
		};
		
		return PopupPositions;
	};
	
})(jQuery( window ), jQuery);