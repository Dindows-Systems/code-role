$(document).ready(function(){
	
	$(".socials a").hover(function(){
			$(this).animate({ height: "+=10px" }, "fast")
		}, function(){
			$(this).animate({ height: "-=10px" }, "fast")
		});	
	
	$("#slider ul").jcarousel({
		auto:4,
		scroll:1,
		wrap: "both",
		visible: 1
	});
	
	createOverlays("#latest-projects .image a");
	
	$("#latest-projects .image").hover(function(){
			$(".overlay", this).show();
		}, function(){
			$(".overlay", this).hide();			
		});
		
		
	$("#latest-projects .image a").fancybox({
		
		'transitionIn'		:	'elastic',
		'transitionOut'		:	'elastic',
		'speedIn'			:	600, 
		'speedOut'			:	200, 
		'overlayShow'		:	true,		
		"showCloseButton"   :	true,
		"showNavArrows"     :   true
	
	});
	
	$(".flickr-pics a").fancybox({
		
		'transitionIn'		:	'elastic',
		'transitionOut'		:	'elastic',
		'speedIn'			:	600, 
		'speedOut'			:	200, 
		'overlayShow'		:	true,		
		"showCloseButton"   :	true,
		"showNavArrows"     :   true
	
	});
		
});


function createOverlays(div)
{
	$.each($(div),function(){
		
	oldHtml = $(this).html();
	$(this).html(oldHtml+"<span class='overlay'></span>");
		
	});
}
