$(document).ready(function(){
	$("#big-slider .slider-holder ul").jcarousel({
		scroll:1,
		auto: 4,
		wrap: "both"
	});
	
	$("#small-slider .slider-holder ul").jcarousel({
		visible: 7,
		scroll: 3,
		auto: 4,
		wrap: "both"
	});
	
	$("#small-slider .slider-holder li a").fancybox({
		'transitionIn'		:	'elastic',
		'transitionOut'		:	'elastic',
		'speedIn'			:	600, 
		'speedOut'			:	200, 
		'overlayShow'		:	true,		
		"showCloseButton"   :	true,
		"showNavArrows"     :   true
	});
});