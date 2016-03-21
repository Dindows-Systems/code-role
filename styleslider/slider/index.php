<!doctype html>
<html lang="en">
<head>
	<title>jQuery style slider</title>
	<link type="text/css" href="../themes/base/ui.all.css" rel="stylesheet" />
	<script type="text/javascript" src="rgbcolor.js"></script>
	<script type="text/javascript" src="../jquery-1.3.2.js"></script>
	<script type="text/javascript" src="../ui/ui.core.js"></script>
	<script type="text/javascript" src="../ui/ui.slider.js"></script>
	<link type="text/css" href="demos.css" rel="stylesheet" />
	<style type="text/css">
	#red, #green, #blue, #fontsizeslider {
		float: left;
		width: 10px;
		height: 200px;
		margin: 15px;
	}
	#swatch {
		width: 120px;
		height: 100px;
		margin-top: 18px;
		margin-left: 350px;
		background-image: none;
	}
	#red .ui-slider-range { background: #ef2929; }
	#red .ui-slider-handle { border-color: #ef2929; }
	#green .ui-slider-range { background: #8ae234; }
	#green .ui-slider-handle { border-color: #8ae234; }
	#blue .ui-slider-range { background: #729fcf; }
	#blue .ui-slider-handle { border-color: #729fcf; }
	#demo-frame > div.demo { padding: 10px !important; };
	</style>
	<script type="text/javascript">		
	/*controls which element type to change*/
	var Control = {
			init : function() {
				this.current = "body";
			}
	};
	Control.init();
	function hexFromRGB (r, g, b) {
		var hex = [
			r.toString(16),
			g.toString(16),
			b.toString(16)
		];
		$.each(hex, function (nr, val) {
			if (val.length == 1) {
				hex[nr] = '0' + val;
			}
		});
		return hex.join('').toUpperCase();
	}
	//when the sliders stops we save the current state to the database:
	function stopSlider() {
		var url = '../php/ajaxcontroller.php?save=1';
		switch(Control.current){
			case "body": 
				url+= '&bgred='    + $("#red").slider("value");
				url+= '&bggreen='  + $("#green").slider("value");
				url+= '&bgblue='   + $("#blue").slider("value");
				break;
			case "span": 
				url+= '&spanred='    + $("#red").slider("value");
				url+= '&spangreen='  + $("#green").slider("value");
				url+= '&spanblue='   + $("#blue").slider("value");
				url+= '&spansize='   + $("#fontsizeslider").slider("value");
				break;	
			case "h1": 
				url+= '&h1red='    + $("#red").slider("value");
				url+= '&h1green='  + $("#green").slider("value");
				url+= '&h1blue='   + $("#blue").slider("value");
				url+= '&h1size='   + $("#fontsizeslider").slider("value");
				break;
			case "h2": 
				url+= '&h2red='    + $("#red").slider("value");
				url+= '&h2green='  + $("#green").slider("value");
				url+= '&h2blue='   + $("#blue").slider("value");
				url+= '&h2size='   + $("#fontsizeslider").slider("value");
				break;
			case "h3": 
				url+= '&h3red='    + $("#red").slider("value");
				url+= '&h3green='  + $("#green").slider("value");
				url+= '&h3blue='   + $("#blue").slider("value");
				url+= '&h3size='   + $("#fontsizeslider").slider("value");
				break;
			case "p": 
				url+= '&pred='    + $("#red").slider("value");
				url+= '&pgreen='  + $("#green").slider("value");
				url+= '&pblue='   + $("#blue").slider("value");
				url+= '&psize='   + $("#fontsizeslider").slider("value");
				break;
			case "container": 
				url+= '&containerred='    + $("#red").slider("value");
				url+= '&containergreen='  + $("#green").slider("value");
				url+= '&containerblue='   + $("#blue").slider("value");
				break;					
		}
		url+= '&ts='       +new Date().getTime();
		$.post(url, {} ,function(){},"json");
	}

	function refresh(elem) {
		switch(elem){
			case "body":
				var red = $("#red").slider("value")
				,green = $("#green").slider("value")
				,blue = $("#blue").slider("value")
				,hex = hexFromRGB(red, green, blue);
				$("#swatch").css("background-color", "#" + hex);
				break;
			case "span":
				$("span").css("color","rgb("+$('#red').slider('value')+","+$('#green').slider('value')+","+$('#blue').slider('value')+")");
				break;	
			case "h1":
				$("h1").css("color","rgb("+$('#red').slider('value')+","+$('#green').slider('value')+","+$('#blue').slider('value')+")");
				break;
			case "h2":
				$("h2").css("color","rgb("+$('#red').slider('value')+","+$('#green').slider('value')+","+$('#blue').slider('value')+")");
				break;
			case "h3":
				$("h3").css("color","rgb("+$('#red').slider('value')+","+$('#green').slider('value')+","+$('#blue').slider('value')+")");
				break;
			case "p":
				$("p").css("color","rgb("+$('#red').slider('value')+","+$('#green').slider('value')+","+$('#blue').slider('value')+")");
				break;
			case "container":	
				$(".container").css("background-color","rgb("+$('#red').slider('value')+","+$('#green').slider('value')+","+$('#blue').slider('value')+")");
				break;				 
		}		
	}
	
	
	
	$(function() {
		//When loading hide the font size slider
		$("#fontsizeslider, #amountsize").hide();

		//button events
		$("#s1,#s2,#s3,#s4,#s5").click(function(e){
			var url = '../php/ajaxcontroller.php?save=1';
			
			var id = e.target.id;
			switch(id){
				case "s1":
					$("#swatch").css("background-image", "url(stripes1.png)");
					$("#swatch").css("background-repeat", "repeat");
					url+= '&bgimage=url(stripes1.png)';
					break;
				case "s2":
					$("#swatch").css("background-image", "url(stripes2.png)");
					$("#swatch").css("background-repeat", "repeat");
					url+= '&bgimage=url(stripes2.png)';
					break;
				case "s3":
					$("#swatch").css("background-image", "url(stripes3.png)");
					$("#swatch").css("background-repeat", "repeat");
					url+= '&bgimage=url(stripes3.png)';
					break;
				case "s4":
					$("#swatch").css("background-image", "url(stripes4.png)");
					$("#swatch").css("background-repeat", "repeat");
					url+= '&bgimage=url(stripes4.png)';
					break;
				case "s5":
					$("#swatch").css("background-image", "none");
					$("#swatch").css("background-repeat", "repeat");
					url+= '&bgimage=none';
					break;				
			}
			url+= '&ts='       +new Date().getTime();
			$.post(url, {} ,function(){},"json");	
		});
		
		$("#bodybtn, span, h1, h2, h3, p, #containerbtn").click(function(e){
			var $target = $(e.target);
			if($target.is("span")){
				$("#fontsizeslider, #amountsize").show();
				Control.current = "span";
				color = new RGBColor($("span").css("color"));
				$("#fontsizeslider").slider("value",parseFloat($("span").css("font-size"), 10));
				$("#amountsize").html(parseFloat($("span").css("font-size"), 10));
			}
			else if($target.is("h1")){
				$("#fontsizeslider, #amountsize").show();
				Control.current = "h1";
				color = new RGBColor($("h1").css("color"));
				$("#fontsizeslider").slider("value",parseFloat($("h1").css("font-size"), 10));
				$("#amountsize").html(parseFloat($("h1").css("font-size"), 10));
			}
			else if($target.is("h2")){
				$("#fontsizeslider, #amountsize").show();
				Control.current = "h2";
				color = new RGBColor($("h2").css("color"));
				$("#fontsizeslider").slider("value",parseFloat($("h2").css("font-size"), 10));
				$("#amountsize").html(parseFloat($("h2").css("font-size"), 10));
			}
			else if($target.is("h3")){
				$("#fontsizeslider, #amountsize").show();
				Control.current = "h3";
				color = new RGBColor($("h3").css("color"));
				$("#fontsizeslider").slider("value",parseFloat($("h3").css("font-size"), 10));
				$("#amountsize").html(parseFloat($("h3").css("font-size"), 10));
			}
			else if($target.is("p")){
				$("#fontsizeslider, #amountsize").show();
				Control.current = "p";
				color = new RGBColor($("p").css("color"));
				$("#fontsizeslider").slider("value",parseFloat($("p").css("font-size"), 10));
				$("#amountsize").html(parseFloat($("p").css("font-size"), 10));
			}
			else if(e.target.id == "bodybtn"){
				$("#fontsizeslider, #amountsize").hide();
				Control.current = "body";
				color = new RGBColor($("#swatch").css("background-color"));
			}
			else if(e.target.id == "containerbtn"){
				$("#fontsizeslider, #amountsize").hide();
				Control.current = "container";
				color = new RGBColor($(".container").css("background-color"));				
			}  
			if (color.ok) {
				$("#red").slider("value",parseInt(color.r));
				$("#green").slider("value",parseInt(color.g));
				$("#blue").slider("value",parseInt(color.b));
				$("#amountred").html(parseInt(color.r));
				$("#amountgreen").html(parseInt(color.g));
				$("#amountblue").html(parseInt(color.b));
			}
		});


		/*font size*/
		$("#fontsizeslider").slider({
			orientation: "vertical",
			range: "min",
			min: 10,
			max: 100,
			value: 60,
			slide: function(event, ui) {
				switch(Control.current){
					case "span" :
						$("span").css("font-size", ui.value+"px");
						$("span").css("margin-top", "0px");
						break;
					case "h1" :
						$("h1").css("font-size", ui.value+"px");
						$("h1").css("margin-top", "0px");
						break;
					case "h2" :
						$("h2").css("font-size", ui.value+"px");
						$("h2").css("margin-top", "0px");
						break;
					case "h3" :
						$("h3").css("font-size", ui.value+"px");
						$("h3").css("margin-top", "0px");
						break;
					case "p" :
						$("p").css("font-size", ui.value+"px");
						$("p").css("margin-top", "0px");
						break;
				}
				$("#amountsize").html(ui.value);
			},
			stop: stopSlider
		});
		
		
		/*rgb slider init*/
		$("#red, #green, #blue").slider({
			orientation: 'vertical',
			range: "min",
			min: 0,
			max: 255,
			value: 127,
			slide: function(event, ui) {
				switch(event.target.id){
					case "red"  :	
						$("#amountred").html(ui.value);
						break;
					case "green":	
						$("#amountgreen").html(ui.value);
						break;
					case "blue" :	
						$("#amountblue").html(ui.value);
						break;
				}
				refresh(Control.current);
			},
			change: function(event, ui) {
				refresh(Control.current);
			},
			stop: stopSlider
		});
		
		
		
		/*gets values from db*/
		var url = '../php/ajaxcontroller.php?load=1&ts='+new Date().getTime();
		$.post(url, {} , function(data,textStatus){
			if(textStatus == "success"){
				if(data.result == "1"){
					
					$("#red").slider("value",parseInt(data.style[0].value));
					$("#green").slider("value",parseInt(data.style[1].value));
					$("#blue").slider("value",parseInt(data.style[2].value));
					$("#amountred").html(parseInt(data.style[0].value));
					$("#amountgreen").html(parseInt(data.style[1].value));
					$("#amountblue").html(parseInt(data.style[2].value));

					$("span").css("color","rgb("+parseInt(data.style[3].value)+","+parseInt(data.style[4].value)+","+parseInt(data.style[5].value)+")");
					$("span").css("font-size", parseInt(data.style[6].value)+"px");

					$("h1").css("color","rgb("+parseInt(data.style[7].value)+","+parseInt(data.style[8].value)+","+parseInt(data.style[9].value)+")");
					$("h1").css("font-size", parseInt(data.style[10].value)+"px");

					$("h2").css("color","rgb("+parseInt(data.style[11].value)+","+parseInt(data.style[12].value)+","+parseInt(data.style[13].value)+")");
					$("h2").css("font-size", parseInt(data.style[14].value)+"px");

					$("h3").css("color","rgb("+parseInt(data.style[15].value)+","+parseInt(data.style[16].value)+","+parseInt(data.style[17].value)+")");
					$("h3").css("font-size", parseInt(data.style[18].value)+"px");

					$("p").css("color","rgb("+parseInt(data.style[19].value)+","+parseInt(data.style[20].value)+","+parseInt(data.style[21].value)+")");
					$("p").css("font-size", parseInt(data.style[22].value)+"px");

					$(".container").css("background-color","rgb("+parseInt(data.style[23].value)+","+parseInt(data.style[24].value)+","+parseInt(data.style[25].value)+")");

					$("#swatch").css("background-image",data.style[26].value );
					$("#swatch").css("background-repeat", "repeat");
					
				}
				else if(data.result == "-1"){
					alert("error in database request!");
				}			
			}
			else if(textStatus == "error")
			{
				alert("error in ajax request!");
			}
		},"json");


		
		
		//shows and hides the rgb panel
		$(".trigger").click(function(){
			$(".panel").toggle("fast");
			$(this).toggleClass("active");
			return false;
		});	
	});
	</script>
</head>
<body id="swatch" class="ui-widget-content" style="border:0;">

	<div class="panel">		
		<div class="demo">
			<div id="red"></div>
			<div id="green"></div>
			<div id="blue"></div>
			<div id="fontsizeslider"></div>
			<div class="astripes">
		        <div id="s1" class="astripe s1"></div>
		        <div id="s2" class="astripe s2"></div>
		        <div id="s3" class="astripe s3"></div>
		        <div id="s4" class="astripe s4"></div>
		        <div id="s5" class="astripe s5"></div>    
     		</div>
			<div style="clear:both;"></div>
			<div id="amountred" class="avalue"></div>
	  		<div id="amountgreen" class="avalue"></div>
	  		<div id="amountblue" class="avalue"></div>
	  		<div id="amountsize" class="avalue"></div>
  		</div>
	</div>
	<a class="trigger" href="#">style</a>
	
	<div class="aselect">
  	<div id="bodybtn" class="abutton">body</div>
  	<span class="abutton">span</span>
  	<h1 class="abutton">h1</h1>
  	<h2 class="abutton">h2</h2>
  	<h3 class="abutton">h3</h3>
  	<p class="abutton">p</p>
  	<div id="containerbtn" class="abutton container">container</div>
	</div>
	
	<div id="adiv" class="acontainer container">
		<h1> Heading h1 </h1>
		<h2> Heading h2 </h2>
		<h3> Heading h3 </h3>
		<p> Paragraph p </p>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pellentesque accumsan egestas. In rhoncus metus sit amet est ullamcorper consequat. Fusce placerat turpis malesuada nibh condimentum sit amet molestie lectus feugiat. Etiam at augue lacus, vel porta augue. Nullam faucibus consectetur felis, nec dignissim erat hendrerit vel. Aliquam pellentesque nisi facilisis libero tristique sit amet eleifend urna laoreet. Mauris eleifend purus nec nisi dapibus venenatis.</p>
	  	<span> Span </span>
  	</div>
	
	
</body>
</html>
