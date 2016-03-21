jQuery(document).ready(function()
{
	 jQuery('#mycarousel').jcarousel({
	 	wrap: "both",
	 	scroll: 1, 
	 	animation: "slow"
    });
    if ( $.browser.msie && $.browser.version.substr(0,1) == 6 ) {
	DD_belatedPNG.fix('.slider img');
	DD_belatedPNG.fix('.slider a.download');
	}	
	

});