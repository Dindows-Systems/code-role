$(document).ready(function() {
	Index.initEventHandlers();
});

var Index = {
	init 				: function(){
	},	
	initEventHandlers 	: function(){
		$("#login_button").click(function(e){
			Index.processSubmit();
		});
		
		$('.inplaceError').each(
				function(i) {
					$(this).focus(function(e){
						$("#loginerror").html("");
					});
				}
		);
	},
	processSubmit		: function(event){
		$('#login').submit();
	}
};	