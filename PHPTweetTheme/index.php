<html>
	 <head>
        <title>TweetTheme - Get your color inspiration from Twitter</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <link rel="stylesheet" href="style.css" type="text/css" charset="utf-8"/>
    </head>
	<body>
		<div id="ajaxload" style="display:none;" class="ajaxload"></div>
		<input id="screen_name" type="text" value=""/>
	
		<div id="rgb" style="display:none;" class="wrapper">
			<div id="1"></div>
			<div id="2"></div>
			<div id="3"></div>
			<div id="4"></div>
			<div id="5"></div>
		</div>
		<script src="jquery-1.3.2.js" type="text/javascript"></script>
        <script>
            $(function() {
				$("#screen_name").val('Twitter username & hit enter');
				$("#screen_name").focus(function (e) {$(this).val('');});
				$("#screen_name").click(function (e) {$(this).val('');});
				$("#screen_name").keypress(function (e) {
					 if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
						$('#rgb').hide();
						$('#ajaxload').show();
						$.ajax({
								method: 'get',
								url : 'callTwitter.php?screen_name='+$('#screen_name').val(),
								dataType: "json",
								success: function (data,textStatus) { 
										if(data.result == 1){
											$('<img/>').load(function () {
												$('#ajaxload').hide();
												$('#rgb').show();
												if(data.tile)
													$('BODY').css({
																	'background-image':'url("'+data.image+'")',
																	'background-repeat':'repeat',
																	'background-color':'#'+data.bgcolor
																  });
												else
													$('BODY').css({
																	'background-image':'url("'+data.image+'")',
																	'background-repeat':'no-repeat',
																	'background-color':'#'+data.bgcolor
																  });	
												
												$('#1').css('background-color','#'+data.profile_text_color).attr('title','#'+data.profile_text_color);
												$('#2').css('background-color','#'+data.bgcolor).attr('title','#'+data.bgcolor);
												$('#3').css('background-color','#'+data.profile_link_color).attr('title','#'+data.profile_link_color);
												$('#4').css('background-color','#'+data.profile_sidebar_fill_color).attr('title','#'+data.profile_sidebar_fill_color);
												$('#5').css('background-color','#'+data.profile_sidebar_border_color).attr('title','#'+data.profile_sidebar_border_color);
											}).attr('src', data.image);
										}
										else if(data.result == 0){
											$('#ajaxload').hide();
											$('#rgb').show();
										}
								}
							});	
						 
							return false;  
					 } 
				});
			});
        </script>
	</body>
</html>