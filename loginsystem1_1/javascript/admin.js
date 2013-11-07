$(document).ready(function() {
	Admin.initEventHandlers();
	Admin.getMapData();
});
var Admin = {
		initEventHandlers: function () {
			$('._op_admin').each(
				function(i) {
					var $this = $(this)
					$this.click(function(e){
						Admin.opsubmit($this);
					});
				}
			);
			$('#mapstart').click(function(){
				var $this = $(this);
				if($this.html()=='map'){
					$('#visualization').show();
					$('#mapstart').html('close');
				}
				else{
					$('#visualization').hide();
					$this.html('map');
				}
			});
			
		},
		opsubmit: function (obj) {
			var op		= obj.next().next().val();
			var uk 		= obj.next().val();
			if(op!='delete')
				var currval	= obj.prev().html();
			
			var url = 'php/corecontroller.php?ts='+new Date().getTime();
			$.ajax({
				   type: "POST",
				   url: url,
				   timeout : 30000,
				   dataType: "json",
				   data: (op!='delete')?'adminopactionx=1&uk='+uk+'&currval='+currval+'&op='+op:'adminopactionx=1&uk='+uk+'&op='+op,
				   success: function(data,textStatus){
								if(data.result == "1"){
									if(op!='delete'){
										if(op=='block'){
											if(currval=='0')
												$('#tr_'+uk).removeClass('statusadmin').removeClass('statusblocked').addClass('statusblocked');
											else{
												$('#tr_'+uk).removeClass('statusblocked');
												if(obj.parent().next().children(".admin_no").html()=='1')
													$('#tr_'+uk).addClass('statusadmin');
											}	
										}	
										else if(op=='admin'){
												if(currval=='0'){
													if($('#tr_'+uk).attr('class') != 'statusblocked')
														$('#tr_'+uk).removeClass('statusadmin').addClass('statusadmin');
												}	
												else
													$('#tr_'+uk).removeClass('statusadmin');
										}	
										(currval=='0') ? obj.prev().html(parseInt('1')) : obj.prev().html(parseInt('0'));
									}
									else{
										$('#tr_'+uk).remove();
										$countusrs = parseInt($('#countusers').html());
										$countusrsnow = $countusrs-1;
										$('#countusers').html($countusrsnow);
										Admin.getMapData();
									}
									//$('#ajaxld').hide();//??
								}
								else if(data.result == "-1"){
									//$('#ajaxld').hide();
								}
							},
				   error: Admin.onopsubmiterror
			});
		},
		onopsubmiterror :  function(XMLHttpRequest, textStatus, errorThrown){
			if(textStatus=="error"){
				//$('#ajaxld').hide();
				//$('#error_div').html("We cant process this information right now blabla.check ur connection blabla");
			}
			else{//TODO: check other possible errors and change the error message accordingly
				//$('#ajaxld').hide();
				//$('#error_div').html("We cant process this information right now blabla.check ur connection blabla");
			}
		},
		getMapData: function () {
		
			var url = 'php/corecontroller.php?ts='+new Date().getTime()+'&mapdata=1';
			$.post(url, {}, Admin.ongetMapData,"json");
		},
		ongetMapData : function(data,textStatus){
		
			if(textStatus == "success"){
				if(data.results.length!=0){
					var map = new google.visualization.DataTable();
					map.addRows(data.results.length);
					map.addColumn('string', 'Country');
					map.addColumn('string', 'Users');
					for(var i=0; i < data.results.length; i++ ){
						map.setValue(i, 0, data.results[i].country_name);
						map.setValue(i, 1, data.results[i].value);
					}
					var geomap = new google.visualization.GeoMap(document.getElementById('visualization'));
				    geomap.draw(map, null);
				    
				}
				else{
					$('#mapstart').remove();
					$('#visualization').remove();
					$('#userslist').remove();
					$('#adminpanel').append('<div>No registered Users except you :)</div>');
					
				}
			}
			else if(textStatus == "error")//TODO - it can be of more types!
			{
					alert("error ajax");
			}
		}
};