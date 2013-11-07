$(document).ready(function() {
	Editor.initEventHandlers();
});

var Editor = {
		initEventHandlers: function () {
			$("#_editor_btt").click(function(e){
				Editor.processSubmit();
			});
			$('.inplaceError').each(
				function(i) {
					var $this = $(this)
					$this.focus(function(e){
						$("#"+ $this.attr('id') +"_error").html('');
					});
				}
			);
		},
		processSubmit: function (event) {
			$('#_editor_btt').hide();	
			$('#ajaxld').show();
			setTimeout("Editor.formsubmit()",500);
		},
		formsubmit: function () {
			var url = 'php/corecontroller.php?ts='+new Date().getTime();
			$.post(url, $('#form_edit').serialize(), Editor.onsubmitcomplete,"json");
		},
		onsubmitcomplete : function(data,textStatus){
			//alert(data.name);
			if(textStatus == "success"){
					if(data.result == "1"){
						//sucessful
						$('#ajaxld').hide();
						$('#_editor_btt').show();
						var htmlstr = "";
						htmlstr += "<div><p>Your changes have been saved!</p></div>";
						$('#editaccountmessage').html(htmlstr);
					}
					else if(data.result == "-2"){
						alert("an error ocurred bla bla we should put a message for this...");
						$('#ajaxld').hide();
						$('#_editor_btt').show();
						$('#_editor_btt').show();
						$('#editaccountmessage').html("<span>an error occurred bla bla</span>");
					}
					else{//errors with form -1
						for(var i=0; i < data.errors.length; i++ ){
							if(data.errors[i].value!="")
								$("#"+data.errors[i].name+'_error').html("<div class='errorimg'>"+data.errors[i].value+"</div>");
						}
						$('#ajaxld').hide();
						$('#_editor_btt').show();
					}
				//}				
			}
			else if(textStatus == "error")//TODO - it can be of more types!
			{
					alert("error ajax");
					$('#ajaxld').hide();
					$('#editaccountmessage').innerHTML = "<span>an error occurred bla bla try later</span>";
			}
		}

};