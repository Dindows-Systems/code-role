
$(document).ready(function() {
	$('.slider').jcarousel( {
		initCallback: slider_initCallback,
		itemFirstInCallback: slider_firstInCallback,
		scroll: 1,
		wrap : 'both',
		auto : 3,
		// This tells jCarousel NOT to autobuild prev/next buttons
		buttonNextHTML: null,
		buttonPrevHTML: null
	});
	
	$('a[rel=facebox]').fancybox();
	
	$('.blink')
		.focus(function(){
			if( $(this).val() == $(this).attr('title') ) {
				$(this).val('');
			}
		})
		.blur(function(){
			if( $(this).val() == '' ) {
				$(this).val( $(this).attr('title') );
			}
		});
});

function slider_initCallback (carousel) {
	$('.slider-holder .nav a').bind('click', function() {
		carousel.scroll($.jcarousel.intval($(this).attr('rel')));
		carousel.stopAuto();
		return false;
	});
}

function slider_firstInCallback(carousel, item, idx, state) {
	$('.slider-holder .nav a').removeClass('active');
	$('.slider-holder .nav a').eq(idx-1).addClass('active');
}