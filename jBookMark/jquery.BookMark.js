(function($) {
	
	$.fn.bookmark = function(options) {
		var opts = $.extend({}, $.fn.bookmark.defaults, options);
		
		return this.each(function() {
			$this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			var mousedown 		= '';
			var isShift         = false;
			$('.bookmark').live('click',function(e){
				$(this).remove();
				return false;
			});
			
			$(document).keyup(function(e){
				switch(e.keyCode)
				{
					//"n"
					case 78:	if(isShift == false)
									$.fn.bookmark.navigate(o,'asc');
								break;	
					//"d"
					case 68:	$this.children('.bookmark').remove();
								break;			
					//"b"
					case 66:	if(mousedown != ''){
									if($this.children('.bookmark').length >= o.maximum)
										alert('You have reached the maximum amount of bookmarks allowed!');
									else		
										$('BODY').append($('<div class="bookmark" style="background:transparent url(images/bookmark.png);opacity:0.5;position:absolute;width:13px;height:13px;left:2px;top:'+mousedown+';"></div>'));
								}
								break;
					//"SHIFT"
					case 16:    isShift=false;
								break;		
				}
			});
			$(document).keydown(function(e){
				if(e.keyCode == 16)
					isShift=true;
				if(e.keyCode == 78 && isShift == true){
					$.fn.bookmark.navigate(o,'desc');
					return false;
				}	
			});

			$(document).mousedown(function(e) {
				mousedown = e.pageY + 'px';
			}).mouseup(function(e) {
				mousedown = '';
			});
		});
	};
	var bmark;
	$.fn.bookmark.navigate 	= function(o,order) {
			if($('.bookmark').length){
				$('BODY').children('.bookmark').css('background-color','white');
				if(order=='asc'){
					if(!bmark){
						bmark = $('BODY').children('.bookmark').eq(0);
					}	
					else{
						if(($(bmark).next().length)&&($(bmark).next().hasClass('bookmark')))
							bmark = $(bmark).next();	
						else	
							bmark = $('BODY').children('.bookmark').eq(0);
					}	
					$('html, body').animate({scrollTop: bmark.css('top')}, 200);
					bmark.css('background-color',o.color);
				}
				else{
					if(!bmark){
						bmark = $('BODY').children('.bookmark').eq($('BODY').children('.bookmark').length-1);
					}	
					else{
						if(($(bmark).prev().length)&&($(bmark).prev().hasClass('bookmark')))
							bmark = $(bmark).prev();	
						else	
							bmark = $('BODY').children('.bookmark').eq($('BODY').children('.bookmark').length-1);
					}	
					$('html, body').animate({scrollTop: bmark.css('top')}, 200);
					bmark.css('background-color',o.color);
				}
			}	
	};
	$.fn.bookmark.defaults = {
		color 		: '#1111FF',
		maximum     : 10
	};
})(jQuery);