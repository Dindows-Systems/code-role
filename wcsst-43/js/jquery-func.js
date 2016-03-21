$(function(){
    $('.blink').
        focus(function() {
            if(this.title==this.value) {
                this.value = '';
            }
        }).
        blur(function(){
            if(this.value=='') {
                this.value = this.title;
            }
        });
})


/**
 * We use the initCallback callback
 * to assign functionality to the controls
 */
function mycarousel_initCallback(carousel) {
 
    jQuery('#mycarousel-next').bind('click', function() {
        carousel.next();
        return false;
    });
 
    jQuery('#mycarousel-prev').bind('click', function() {
        carousel.prev();
        return false;
    });
};
 
// Ride the carousel...
jQuery(document).ready(function() {
    jQuery(".slider-carousel").jcarousel({
        scroll: 1,
        visible: 4,
        auto:4,
        wrap:'both',
        start:1,
        initCallback: mycarousel_initCallback,
        // This tells jCarousel NOT to autobuild prev/next buttons
        buttonNextHTML: null,
        buttonPrevHTML: null
    });
});