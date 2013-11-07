(function($) {
	
	$.fn.TwitterConnections = function(options) {
		var opts = $.extend({}, $.fn.TwitterConnections.defaults, options);
		return this.each(function() {
			$this = $(this);
			
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			
					
			$this.click(function(){
				if(options.screen_name)	var user = options.screen_name;
				else var user = $('#username').val();
				
				$('#jf-grid').empty();
				$('#rightbtn,#leftbtn').fadeOut();
				$('#jf-grid').append('<div id="load" class="load"></div>');
				
					
				$.ajax({
						method: 'get',
						url : 'callTwitter.php?screen_name='+user+'&type='+o.type,
						dataType: "json",
						success: function (data,textStatus) { 
								if(data.result == 1){
									_all = 0;
									var toeval = "";
									var images_length = data.images.length;
									if(data.images.length < 25)
										var images_length = data.images.length;
									else	
										var images_length = 25;
										
									for(var i = 0;i<images_length;i++){
										toeval+= "$('<img />')";
										toeval+= ".load(function () {";
										toeval+= "_all+=1;";
										toeval+= "if(_all=="+images_length+") {";
											toeval+= "$('#rightbtn').fadeIn();";
											toeval+= "$('#title').html(o.type+': "+data.total+"');";
											toeval+= "$('#jf-grid').html('"+data.res+"').fadeIn();";
											
											toeval+= "$('#jf-grid').find('._img_profile').each(function(){$(this).qtip({";
											toeval+= "content: { text:";
											toeval+= " '<div class=\"jf-tooltip\"><label>Name:</label><span>'+$(this).find('._name').val()+'</span>'+'<label>Followers:</label><span>'+$(this).find('._nmb_followers').val()+'</span>'+'<label>Friends:</label><span>'+$(this).find('._nmb_friends').val()+'</span></div>' ";
											toeval+= "},";
											toeval+= "show: 'mouseover',";
											toeval+= "hide: 'mouseout',";
											toeval+= "position: {corner: {target: 'bottomMiddle',tooltip: 'topMiddle'}},";
											toeval+= "style: {width: 200,padding: 5,background: '#222',color: '#fff',textAlign: 'center',border: {width: 1,radius: 3,color: '#000'},tip: 'topMiddle',name: 'dark'},";
											toeval+= "show: {delay: 0,when: 'mouseover'}" 
											toeval+= "})});";
											
										toeval+= "}";	
										toeval+= "})";
										toeval+= ".attr('src', '"+data.images[i]+"');";	
									}
									
									eval(toeval);
								}
								else if(data.result == 0){
									$('#jf-grid').html('User not found');
								}
								else if(data.result == -1){
									$('#jf-grid').html('Twitter doesn\'t seem to respond');
								}
						}
					});
			});
			
			$('#rightbtn').click(function(){
				$('#leftbtn').show();
				if(options.screen_name)	var user = options.screen_name;
				else var user = $('#username').val();
				
				var visible = $('#jf-grid').find('div:visible').attr('id');
				var next = parseInt(visible) + 1;
				
				if($('#'+next).length){
					$('#'+visible).hide();
					$('#'+next).fadeIn();
				}
				var nextnext = next+1;
				if(!$('#'+nextnext).length)
					$(this).hide();
					
				
			});
			$('#leftbtn').click(function(){
				$('#rightbtn').show();
				var visible = $('#jf-grid').find('div:visible').attr('id');
				var next = parseInt(visible) - 1;
				
				if($('#'+next).length){
					$('#'+visible).hide();
					$('#'+next).fadeIn();
				}
				var nextnext = next-1;
				if(nextnext==0)
					$(this).hide();
			});
			$('#refresh').click(function(){
				$this.click();
			});
			
		});
	};
	$.fn.TwitterConnections.defaults = {
		screen_name         : 'codrops', 
		type                : 'Followers'
	};
})(jQuery);