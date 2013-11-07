(function($) {
	$.fn.cssmania = function(options) {
		var opts = $.extend({}, $.fn.cssmania.defaults, options);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			o.onInit();
			$.get("php/class.cssmania.php", {website:o.website}, function(data){
			   o.onComplete(data);
			},'json');
	};
	$.fn.cssmania.defaults = {
		website		: '',
		onInit		: function(){return false;},
		onComplete	: function(){return false;}
	};
})(jQuery);