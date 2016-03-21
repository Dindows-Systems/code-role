$(document).ready(function () {
    $('#featurednews').galleryView({
        show_panels: true,              //BOOLEAN - flag to show or hide panel portion of gallery
        show_filmstrip: true,           //BOOLEAN - flag to show or hide filmstrip portion of gallery
        
		panel_width: 600,               //INT - width of gallery panel (in pixels)
        panel_height: 280,              //INT - height of gallery panel (in pixels)
        
		frame_width: 100,               //INT - width of filmstrip frames (in pixels)
        frame_height: 60,               //INT - width of filmstrip frames (in pixels)
        
		start_frame: 1,                 //INT - index of panel/frame to show first when gallery loads
        
		filmstrip_size: 3,
        
		transition_speed: 800,          //INT - duration of panel/frame transition (in milliseconds)
        transition_interval: 4000,      //INT - delay between panel/frame transitions (in milliseconds)
        
		overlay_opacity: 0.7,           //FLOAT - transparency for panel overlay (1.0 = opaque, 0.0 = transparent)
        frame_opacity: 0.3,             //FLOAT - transparency of non-active frames (1.0 = opaque, 0.0 = transparent)
        
		pointer_size: 0,                //INT - Height of frame pointer (in pixels)
        
		nav_theme: 'dark',              //STRING - name of navigation theme to use (folder must exist within 'themes' directory)
        
		easing: 'swing',                //STRING - easing method to use for animations (jQuery provides 'swing' or 'linear', more available with jQuery UI or Easing plugin)
        
		filmstrip_position: 'bottom',   //STRING - position of filmstrip within gallery (bottom, top, left, right)
        overlay_position: 'bottom',     //STRING - position of panel overlay (bottom, top, left, right)
        
		panel_scale: 'nocrop',          //STRING - cropping option for panel images (crop = scale image and fit to aspect ratio determined by panel_width and panel_height, nocrop = scale image and preserve original aspect ratio)
        frame_scale: 'crop',            //STRING - cropping option for filmstrip images (same as above)
        frame_gap: 5,                   //INT - spacing between frames within filmstrip (in pixels)
        
		show_captions: false,           //BOOLEAN - flag to show or hide frame captions
        
		fade_panels: true,              //BOOLEAN - flag to fade panels during transitions or swap instantly
        
		pause_on_hover: true            //BOOLEAN - flag to pause slideshow when user hovers over the gallery				   
    });
});