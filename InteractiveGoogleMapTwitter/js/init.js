var map, geocoder, marker,
	ey, my, mouseDown = false;
var o = {
	init: function(){
		this.map.init();
		this.twitter.show();
		this.twitter.click();
		this.scroll.init();
	},
	twitter: {
		get: function(){
			var arr = new Array;
			$('.get').find('input').each(function(i){
				var t = $(this), 
					val = t.val();
				arr[i] = val;				
			});
			return arr;
		},
		show: function(){
			var users = o.twitter.get(), arr = new Array;
			for (i in users){
				var user = users[i];
				$.getJSON('http://twitter.com/users/show/'+user+'.json?callback=?', function(data) {
					var img = data.profile_image_url,
						screen_name = data.screen_name;
					geocoder.geocode({ address: data.location }, function(response, status){
						if (status == google.maps.GeocoderStatus.OK) {
							var x = response[0].geometry.location.lat(),
								y = response[0].geometry.location.lng();
							marker = new google.maps.Marker({
								icon: img,
								map: map,
								title: screen_name,
								position: new google.maps.LatLng(x, y)
							});
							arr.push('<div class="item">');
							arr.push('<p class="img"><a href="#" class="open" rel="'+screen_name+'"><img src="'+img+'" alt="" /></a></p>');
							arr.push('<div class="entry">');
							arr.push('<a href="#" class="open title" rel="'+screen_name+'">'+data.name+'</a>');
							arr.push('<p class="description">'+data.description+'</p>');
							arr.push('<p class="url"><a href="'+data.url+'" target="_blank">'+data.url+'</a></p>');
							arr.push('<p class="count">Followers: '+data.followers_count+', Following: '+data.friends_count+'</p>');
							arr.push('</div>');
							arr.push('</div>');
							var html = arr.join('');
							arr = [];
							$('.twitter').find('.inside').append(html);
							google.maps.event.addListener(marker, 'click', function(){
								o.twitter.open(this.title);
							}); 
						}
					});
				});
			}
		},
		click: function(){
			$('.twitter').find('.open').live('click', function(){
				var t = $(this), rel = t.attr('rel');
				o.twitter.open(rel);
			});
		},
		open: function(user){
			var posts = $('.posts'), arr = new Array;
			$.getJSON('http://twitter.com/status/user_timeline/'+user+'.json?count=5&callback=?', function(data) {
				$.each(data, function(i, post){
					arr.push('<div class="post">');
					arr.push(post.text);
					arr.push('</div>');
				});
				var html = arr.join('');
				posts.html(html).fadeIn();
			});
		}
	},
	map: {
		size: function(){
			var w = $(window).width(),
				h = $(window).height();
			return { width: w, height: h }
		},
		data: {
			zoom: 3,
			center: new google.maps.LatLng(52, 23),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		},
		init: function(){
			var size = o.map.size();
			$('#map').css({ width: size.width, height: size.height });
			map = new google.maps.Map(document.getElementById('map'), o.map.data),
			geocoder = new google.maps.Geocoder();
			google.maps.event.addListener(map, 'dragstart', function(){
				$('.posts').hide();
			}); 
		}
	},
	scroll: {
		mouse: function(e){
			var y = e.pageY; 
			return y;
		},
		check: function(y){
			var all = $('.twitter').height(),
				inside = $('.twitter').find('.inside').height();
			if (y < (all - inside)) {
				y = all - inside;
			} else if (y > 0) {
				y = 0;
			}
			return y;
		},
		update: function(e){
			var y = o.scroll.mouse(e),
				movey = y-my,
				top = ey+movey;
				check = o.scroll.check(top);
			$('.twitter').find('.inside').css({ top: check+'px' });
		},
		init: function(){
			$('.twitter').find('.inside').bind({
				mousedown: function(e){
					e.preventDefault();
					mouseDown = true;
					var mouse = o.scroll.mouse(e);
						my = mouse;
					var element = $(this).position();
						ey = element.top;
					o.scroll.update(e);
				},
				mousemove: function(e){
					if (mouseDown)
						o.scroll.update(e);
					return false;
				},
				mouseup: function(){
					if (mouseDown)
						mouseDown = false;
					return false;
				},
				mouseleave: function(){
					if (mouseDown)
						mouseDown = false;
					return false;
				}
			});
		}
	}
}

$(function(){ o.init(); });
