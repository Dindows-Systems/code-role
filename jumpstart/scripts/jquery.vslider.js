// JavaScript Document
jQuery(function($){
	
$.fn.vSlider = function(options){
	
/* ================================================================================================ */
/* ======================================== Plugin Options ======================================== */
/* ================================================================================================ */	
	var defaults = {
		              time:4000,
					  width:600,
					  height:350,
					  effect:'none',
					  autoplay:true,
					  blocksize: {height:'',width:'' },
					  maskInduration:300,
					  maskOutduration:900,
					  listControls:true,
					  arrowControls:true,
					  customblocksize:{
						  maskvertical:{ height:100,width:70 },
						  // image transitions global settings
						  cubegrow:{ height:130,width:130 },
						  cubesidegrow:{ height:130,width:130 },
						  stripfade:{ height:100,width:60 },
						  striphalf:{ height:100,width:40 },
						  block:80,
						  strip:30
						  
						  },
					  callback:function(){   } 
					  
					  
					};
	
	
	var options = $.extend(defaults, options);
/* ================================================================================================ */
/* ==================================== Variables & Precaching ==================================== */
/* ================================================================================================ */	
	
	return this.each(function()
		{	
		var root = $(this).addClass('mainslider');
		root.wrap('<div class="vSlider" />');	
		var parent = root.parent();
		var li = root.find("li");
	    var images = li.find("img");
		var pos,random_no,timer,image_timer,counter,arr,wait,index,block,w,h,src,parent,im,override=false,in_animation = false,controls,canvas,html5_flag=false,imageData,canvas,context,root_parent;
	    var current = li.eq(1).toggleClass('active'),prev = li.first().addClass("reset");
		var bool = true,first_bool = true;
		
		root.css({
			width: options.width,
			height: options.height
			});	
			
		parent.css({
			width: options.width,
			height: options.height
			});	
			
		li.first().find("span").css("display","block");
		type= "img";
		current.find(type).hide();	
		 canvas = document.createElement('canvas');
    if (!canvas.getContext) {
      options.mode= "default";
	  
	   if(!isNaN(options.effect)&&parseInt(options.effect)>=7)
	   options.effect='none';
	   
    }
		if(options.listControls==true)
	    appendControls();
	    if(options.arrowControls==true)
		appendarrowControls()		
/* ================================================================================================ */
/* ======================================== Switcher Module ======================================= */
/* ================================================================================================ */			
		function switcher()
			{
				prev = (current.prev().length>0) ? current.prev() : li.last();
				prev.removeClass("reset");
				current.toggleClass("active reset");
				current = (current.next().length>0) ? current.next() : li.first();
								 
				current.find(type).hide();
				current.addClass("active");
				options.callback(current.find(type)[0]);
		  
		   }

/* ================================================================================================ */
/* ======================================== Custom Effects ======================================== */
/* ================================================================================================ */	

	function Maskvertical(image)
	{
		in_animation =true;
		 im = image;
		
		
			 if(options.blocksize.width!=''){
		 w = Math.floor(options.blocksize.width);
		 h = Math.floor(options.blocksize.height);
		 }
		 else
		 {
		w = Math.floor(options.customblocksize.maskvertical.width);
		 h = Math.floor(options.customblocksize.maskvertical.height);	 
		 }
		
		 parent = im.parent();
		 arr = new Array(); i =0;  j =0; index = 0;
		 block = $("<div />",{
					css:{
						position:"absolute",
						width:w,
						height:options.height,
						'background-color':"#fff",
						'border':options.maskborder,
						zIndex:99,
						display:'none'
						}
							
							}).addClass('disblock');
		
		
		 while(i<options.width)
		 {
			
				arr[index] = block.clone().css({left:i ,top:j,backgroundPosition:-i+"px 0px" });
				 parent.append( arr[index++].fadeIn(i*4+4));
			
			i = i + w;
		 }
		 
			var wait = setInterval(function() {
			  if( ! parent.find(".disblock").is(":animated") ) {
				  clearInterval(wait);
			animateout();	
			  }
		  }, 40);
		
		function animateout()
		{
		im.fadeIn(500); 
		i=0;
		random_no = random_array(arr.length);
	    timer = setInterval(function(){
				
				if(i>=arr.length)
				{ 
				
				clearInterval(timer);
				var wait = setInterval(function() {
			      if( ! parent.find(".disblock").is(":animated") ) {
				  clearInterval(wait);
			      endeffect(image);
			        }
		          }, 80);
				return;
				
				}
									 
				
				arr[random_no[i]].stop(true,true).fadeOut({duration:options.maskOutduration,easing:'easeInSine'});
				i++;
				},90);
		
		
		}
		
	  };
	  
    function striphalf(image)
	{
	in_animation = true;
	w = (options.blocksize.width!='') ? Math.floor(options.blocksize.width) : Math.floor(options.customblocksize.striphalf.width);
	h = options.height;
	parent = image.parent();
	arr = new Array(); i =0;  j =0;
	src = image.attr("src");
	block = $("<div />",{
		css:{
				position:"absolute",
				width:w,
				height:h/2,
				'background-image':'url('+src+')',
				'background-color':options.maskbg,
				'border':options.maskborder,
				 zIndex:99,
				 display:'block',
				 opacity:0
			}
	}).addClass('disblock');
		
	 counter = 60;
	 while(i<options.width)
		 {
			j=0;
			while(j<h)
			{
				if(j==0)
				css ={left:i,top:j ,backgroundPosition:-i+"px "+(-j)+"px" ,marginTop: -(h/2)};
				else
				css ={left:i,top:j ,backgroundPosition:-i+"px "+(-j)+"px" ,marginTop: h};
				parent.append(block.clone().css(css).delay(counter).animate({opacity:1,marginTop:0},{duration: 700, easing:'easeOutBack'}));
				j = j + h/2;
				counter = counter + 45;
			}
			i = i + w;
		 }
		 
		i=0;
		wait = setInterval(function() {
			  if( ! parent.find(".disblock").is(":animated") ) {
				  clearInterval(wait);
				 endeffect(image);
			  }
		  }, 100);
		
	}
	function waveleft(image)
	{
	in_animation = true;
	w = 16;
	h = options.height;
	parent = image.parent();
	arr = new Array(); i =0;  j =0;
	src = image.attr("src");
	block = $("<div />",{
		css:{
				position:"absolute",
				width:w,
				height:h,
				'background-image':'url('+src+')',
				'background-color':options.maskbg,
				'border':options.maskborder,
				 zIndex:99,
				 display:'block',
				 opacity:0
			}
	}).addClass('disblock');
		
	 counter = 10;
	 while(i<options.width)
		 {
				css ={left:i,top:j ,backgroundPosition:-i+"px "+(-j)+"px" ,marginTop: h};
				parent.append(block.clone().css(css).delay(counter).animate({opacity:1,marginTop:0},{duration: 700, easing:'easeOutBack'}));
				counter = counter + 35;
			
			i = i + w;
		 }
		 
		i=0;
		wait = setInterval(function() {
			  if( ! parent.find(".disblock").is(":animated") ) {
				  clearInterval(wait);
				 endeffect(image);
			  }
		  }, 40);
		
	}
	
	 function cubegrow(image)
	{
		in_animation = true;
		 im = image;
		if(options.blocksize.width!=''){
		 w = Math.floor(options.blocksize.width);
		 h = Math.floor(options.blocksize.height);
		 }
		 else
		 {
		w = Math.floor(options.customblocksize.cubegrow.width);
		 h = Math.floor(options.customblocksize.cubegrow.height);	 
		 }
		 parent = im.parent();
		 arr = new Array(); i =0;  j =0; index = 0;
		 src = im.attr("src");
		 block = $("<div />",{
					css:{
						position:"absolute",
						width:0,
						height:0,
						'background-image':'url('+src+')',
						'background-color':options.maskbg,
						'border':options.maskborder,
						zIndex:99
						
						}
							
							}).addClass('disblock');
		
		counter = 40;
		 while(i<options.width)
		 {
			
		    j=0;
			while(j<options.height)
			{
				
				
				parent.append( block.clone().css({left:i ,top:j,backgroundPosition:-i+"px "+-j+"px" }).delay(counter).animate({height:h,width:w},options.maskOutduration));
			j = j + h; counter = counter + 50;
			}
			
			i = i + w;
		 }

		
	  	wait = setInterval(function() {
			  if( ! parent.find(".disblock").is(":animated") ) {
				  clearInterval(wait);
				 endeffect(image);
			  }
		  }, 40);
	};	
	function cubesidegrow(image)
	{
		in_animation =true;
		 im = image;
		if(options.blocksize.width!=''){
		 w = Math.floor(options.blocksize.width);
		 h = Math.floor(options.blocksize.height);
		 }
		 else
		 {
		w = Math.floor(options.customblocksize.cubesidegrow.width);
		 h = Math.floor(options.customblocksize.cubesidegrow.height);	 
		 }
		 parent = im.parent();
		 arr = new Array(); i =0;  j =0; index = 0;
		 src = im.attr("src");
		 block = $("<div />",{
					css:{
						position:"absolute",
						width:0,
						height:0,
						opacity:0,
						top:options.height,
						'background-image':'url('+src+')',
						'background-color':options.maskbg,
						'border':options.maskborder,
						zIndex:99
						
						}
							
							}).addClass('disblock');
		
		
		 while(i<options.width)
		 {
			
		    j=0;
			while(j<options.height)
			{
				
				arr[index] = block.clone().css({left:i ,top:j,backgroundPosition:-i+"px "+-j+"px" });
				parent.append(arr[index++]);
			j = j + h;
			}
			
			i = i + w;
		 }
		 
		i=0;
		random_no = random_array(arr.length);
	    timer = setInterval(function(){
				
				if(i>=arr.length)
				{
				
				wait = setInterval(function() {
			  if( ! parent.find(".disblock").is(":animated") ) {
				  clearInterval(wait);
				 endeffect(image);
			  }
		  }, 40);
		  
					
				
				 clearInterval(timer);
					return;
				}
									 
				arr[random_no[i++]].animate({height:h,width:w,opacity:1}, options.maskOutduration);
				
				},60);
		
	};	
	 function randombricks(image)
	{
		in_animation =true;
	 im = image;
		if(options.blocksize.width!=''){
		 w = Math.floor(options.blocksize.width);
		 h = Math.floor(options.blocksize.height);
		 }
		 else
		 {
		w = Math.floor(options.customblocksize.block);
		 h = Math.floor(options.customblocksize.block);	 
		 }
		 parent = im.parent();
		 arr = new Array(); i =0;  j =0; index = 0;
		 src = im.attr("src");
		 block = $("<div />",{
					css:{
						position:"absolute",
						width:w,
						height:h,
						opacity:0,
						top:options.height,
						'background-image':'url('+src+')',
						'background-color':options.maskbg,
						'border':options.maskborder,
						zIndex:99
						
						}
							
							}).addClass('disblock');
		
		
		 while(i<options.width)
		 {
			
		    j=0;
			while(j<options.height)
			{
				
				arr[index] = block.clone().css({left:i ,top:j,backgroundPosition:-i+"px "+-j+"px" });
				parent.append(arr[index++]);
			j = j + h;
			}
			
			i = i + w;
		 }
		 
		i=0;
		random_no = random_array(arr.length);
	    timer = setInterval(function(){
				
				if(i>=arr.length)
				{
				wait = setInterval(function() {
			  if( ! parent.find(".disblock").is(":animated") ) {
				  clearInterval(wait);
				 endeffect(image);
			  }
		  }, 80);	
				 clearInterval(timer);
					return;
				}
									 
				arr[random_no[i++]].animate({opacity:1},{duration:1100, easing:'easeOutCubic'});
				
				},30);
	};
	
	function curtainsright(image)
	{
		in_animation = true;
		if(options.blocksize.width!='')
		w = Math.floor(options.blocksize.width);
		else
		w = Math.floor(options.customblocksize.stripfade.width);
		
		h = options.height;
		 parent = image.parent();
		 i = options.width; 
		 src = image.attr("src");
		 var css,flag=true;
		 block = $("<div />",{
					css:{
						position:"absolute",
						width:w,
						height:h,
						'background-image':'url('+src+')',
						'background-color':options.maskbg,
						'border':options.maskborder,
						zIndex:99,
						marginTop:options.height,
						opacity:0
						}
							
							}).addClass('disblock');
		
		counter = 0;
		 while(i>-w)
		 {
			
			
				css = {left:i ,backgroundPosition:-i+"px 0px",marginTop:-options.height };
				flag = true;
			
			
			parent.append(block.clone().css(css).delay(counter).animate({marginTop:0,opacity:1},options.maskOutDuration));
			
			i = i - w; counter = counter + 60;
		 }
		 
		
			wait = setInterval(function() {
			  if( ! parent.find(".disblock").is(":animated") ) {
				  clearInterval(wait);
				 endeffect(image);
			  }
		  }, 40);
	};
	function stripfade(image)
	{
		in_animation = true;
		if(options.blocksize.width!='')
		w = Math.floor(options.blocksize.width);
		else
		w = Math.floor(options.customblocksize.stripfade.width);
		
		h = options.height;
		
		
		 parent = image.parent();
		 arr = new Array(); i =0;  j =0; index = 0;
		 src = image.attr("src");
		 block = $("<div />",{
					css:{
						position:"absolute",
						width:w,
						height:h,
						'background-image':'url('+src+')',
						'background-color':options.maskbg,
						'border':options.maskborder,
						zIndex:99,
						opacity:0
						
						}
							
							}).addClass('disblock');
		
		counter = 0;
		 while(i<options.width)
		 {
		parent.append(block.clone().css({left:i ,backgroundPosition:-i+"px 0px" }).delay(counter).animate({opacity:1},{duration: 700, easing:'easeOutSine'}));
			
			i = i + w;counter = counter + 50;
		 }
		 
		i=0;
			var wait = setInterval(function() {
			  if( ! parent.find(".disblock").is(":animated") ) {
				  clearInterval(wait);
				endeffect(image);
			  }
		  }, 40);
		
	};	
	function blindsleft(image)
	{
		in_animation = true;
		if(options.blocksize.width!='')
		w = Math.floor(options.blocksize.width);
		else
		w = Math.floor(options.customblocksize.strip);
		
		h = options.height;
		
		
		 parent = image.parent();
		 arr = new Array(); i =0;  j =0; index = 0;
		 src = image.attr("src");
		 block = $("<div />",{
					css:{
						position:"absolute",
						width:0,
						height:h,
						'background-image':'url('+src+')',
						'background-color':options.maskbg,
						'border':options.maskborder,
						zIndex:99,
						opacity:0
						
						}
							
							}).addClass('disblock');
		
		counter = 0;
		 while(i<options.width)
		 {
		parent.append(block.clone().css({left:i ,backgroundPosition:-i+"px 0px" }).delay(counter).animate({width:w,opacity:1},{duration: 700, easing:'easeOutSine'}));
			
			i = i + w;counter = counter + 50;
		 }
		 
		i=0;
			var wait = setInterval(function() {
			  if( ! parent.find(".disblock").is(":animated") ) {
				  clearInterval(wait);
				endeffect(image);
			  }
		  }, 40);
		
	};	
	
	
/* ================================================================================================ */
/* ================================= Effects Switching & Ending =================================== */
/* ================================================================================================ */		
	
	function endeffect(image)
	{
        if(options.listControls==true)
			   {
			   controls.removeClass("control_active");
			   controls.eq(current.index()).addClass("control_active");
			   }
		clearInterval(timer);
		setTimeout(function(){
				  image.show(); // show the real image
				  parent.find(".disblock").remove(); // remove the divs
				  current.find("span").fadeIn('normal');
				  
				 
				  in_animation = false;
				  
				  if(override==false) // Return if manually triggered
				  image_timer = setTimeout(function() {  current.find("span").fadeOut('fast');    switcher(); effects();  },(options.time-800)); 
			  },1000);
				  
						
	};
	function effects()
	{
		 if(root.find(".disblock").is(":animated"))
		 return;
		 
		var ch = Math.floor(Math.random()* 10);
		
		if(!isNaN(options.effect))
		ch = options.effect;
		  
		if(bool==true)
		 {
			li.first().find("span").hide();
			bool=false;
		     first_bool = false;
		 } 
		
		 switch(ch)
		 {
		 case 0:$(current.find(type)).fadeIn("slow",function(){
			 
			 endeffect($(this));
			  
			 });break;
		 case 1:  cubegrow(current.find("img"));break;
		 case 2:  stripfade(current.find("img"));break;
		 case 3:  striphalf(current.find("img"));break;
		 case 4:  cubesidegrow(current.find("img"));break;
		 case 5:  curtainsright(current.find("img"));break;
		 case 6:  randombricks(current.find("img"));break;
		 case 7:  waveleft(current.find("img"));break;
		 case 8:  blindsleft(current.find("img"));break;
		 case 9:  Maskvertical(current.find("img"));break;

		 
		
		 
		 
		
		 }
	}

/* ================================================================================================ */
/* ======================================== Control Options ======================================= */
/* ================================================================================================ */	

	function appendarrowControls()
	{
		var prev = jQuery("<a href='#'>").addClass('q-prev');
		parent.append(prev);
		var next = jQuery("<a href='#'>").addClass('q-next');
		parent.append(next);
		
		parent.find(".q-prev").bind("click",function(e){
			 var index = current.index()-1;
			 if(first_bool==true&&index==0)
			 index = 4; 
			 
			 if(index<0)
			 index = li.length-1;
			 setImage(index);  
			 e.preventDefault();
			});
		parent.find(".q-next").bind("click",function(e){
			 var index = current.index()+1;
			 if(first_bool==true&&index==2)
			 index = 1; 
			 
			 if(index>li.length-1)
			 index = 0;
			 setImage(index);  
			 e.preventDefault();
			});	
		
	}
		 function appendControls()
	 {
		var str = "<ul class='controls'>";
		for(var i=0;i<li.length;i++)
		str = str + "<li>"+(i+1)+"</li>";
		str = str+"</ul>";
		
		 root.after(str);
		 
		 controls = parent.find(".controls li");
		controls.first().addClass("control_active");
		
		controls.bind({
		click:function(){ setImage($(this).index()); 	},
		mouseover:function(){ $(this).toggleClass("control_hover"); },
		mouseout:function(){ $(this).toggleClass("control_hover"); }
		  });
		 
		
	 }

/* ================================================================================================ */
/* ======================================== Image Settings ======================================== */
/* ================================================================================================ */	
	 
      function setImage(index)
	{  
	
     	if(first_bool==true)
	    {
			 if(in_animation==true||current.index()-1==index)
		return;
		}
		else
	  if(in_animation==true||current.index()==index)
		return;
		
		li.removeClass("reset active");
		current.find("span").hide();	
		clearTimeout(image_timer); // Manual Override...
		
		if(first_bool==true)
		li.first().addClass("reset");
		
		current.addClass("reset");
		prev = current;
		current = li.eq(index).addClass("active");
		current.find('img').hide();
		override = true;
		effects();
	
	}
		
			
			if(options.autoplay==true)
			 image_timer = setTimeout(function() {   effects();  },options.time);  // Starting the Slideshow
			
		});
	
	


};

function random_array(maxn)
 {
	
    var array = new Array();
	var temp,i,flag=true;
	var index =0;
	 while(index<maxn)
	 {
		 flag = true;
		 temp = Math.floor(Math.random() * maxn);
		 for(i=0;i<array.length;i++)
		 {
			 if(temp==array[i])
			 {
				flag=false;
				break;
			 }
		 }
		 
		 if(flag==true)
		 array[index++] = temp;
	 }
	 
	 return array;
 };
 
});
	

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */