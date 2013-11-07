(function($) {
	
	$.fn.translate = function(options) {
		var opts = $.extend({}, $.fn.translate.defaults, options);
		return this.each(function() {
			$this = $(this);
			var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			
			var text_to_translate = $this.html();
			
			var _translate_button = $(document.createElement('a')).addClass('jtt-translate-icon').attr('title','Translate this');
			
			_translate_button.click(function(e){
				var _overlay = $(document.createElement('div')).addClass('jtt-overlay');
				
				var _boxclose 		= $(document.createElement('a')).addClass('jtt-boxclose');
				_boxclose.click(function(e){
					_overlay.remove();
					_wrapper.remove();
				});
				var _title	 		= $(document.createElement('h1')).html(o.title);
				var _p_language		= $(document.createElement('p'));
				
				var _boxtext		= $(document.createElement('div')).addClass('jtt-boxtext');
				var _wrapper		= $(document.createElement('div')).addClass('jtt-box');
				
				var _select = $.fn.translate.createLanguageCombo(o);
				
				_select.change(function(e){
					if($(this).val()!='default'){
						_boxtext.empty();
						_ajaximg.show();
						var to = $(this).val();
						$.fn.translate.initialize(o,to,text_to_translate,_boxtext,_ajaximg);
					}
				})
				
				var _ajaximg 		= $(document.createElement('img')).attr('src','images/ajaxload_small.gif').css('display','none');
				
				_p_language.append(_select).append(_ajaximg);
				$('BODY').append(_overlay).append(_wrapper.append(_boxclose).append(_title).append(_p_language).append(_boxtext));	
			});
			
			$this.prepend(_translate_button);
		});
	};
	$.fn.translate.initialize = function(o,to,text,_boxtext,_ajaximg) {
		google.language.translate(text, o.original, to, 
			function(result) {
				_ajaximg.hide();
				if (result.translation){
					_boxtext.html('<p>'+result.translation+'</p>');
				}	
				else
					_boxtext.html('<p>'+o.notfound+'</p>');
			}
		);
	};
	$.fn.translate.createLanguageCombo = function(o) {
		var _opt0	=  $(document.createElement('option')).attr('value','default').html(o.firstOptionText);	
		var _opt1	=  $(document.createElement('option')).attr('value','af').html('Afrikaans');
		var _opt2	=  $(document.createElement('option')).attr('value','sq').html('Albanian');
		var _opt3	=  $(document.createElement('option')).attr('value','am').html('Amharic');
		var _opt4	=  $(document.createElement('option')).attr('value','ar').html('Arabic');
		var _opt5	=  $(document.createElement('option')).attr('value','hy').html('Armenian');
		var _opt6	=  $(document.createElement('option')).attr('value','az').html('Azerbaijani');
		var _opt7	=  $(document.createElement('option')).attr('value','eu').html('Basque');
		var _opt8	=  $(document.createElement('option')).attr('value','be').html('Belarusian');
		var _opt9	=  $(document.createElement('option')).attr('value','bn').html('Bengali');
		var _opt10	=  $(document.createElement('option')).attr('value','bh').html('Bihari');
		var _opt11	=  $(document.createElement('option')).attr('value','bg').html('Bulgarian');
		var _opt12	=  $(document.createElement('option')).attr('value','my').html('Burmese');
		var _opt13	=  $(document.createElement('option')).attr('value','ca').html('Catalan');
		var _opt14	=  $(document.createElement('option')).attr('value','zh').html('Chinese');
		var _opt15	=  $(document.createElement('option')).attr('value','hr').html('Croatian');
		var _opt16	=  $(document.createElement('option')).attr('value','cs').html('Czech');
		var _opt17	=  $(document.createElement('option')).attr('value','da').html('Danish');
		var _opt18	=  $(document.createElement('option')).attr('value','dv').html('Dhivehi');
		var _opt19	=  $(document.createElement('option')).attr('value','nl').html('Dutch');
		var _opt20	=  $(document.createElement('option')).attr('value','en').html('English');
		var _opt21	=  $(document.createElement('option')).attr('value','eo').html('Esperanto');
		var _opt22	=  $(document.createElement('option')).attr('value','et').html('Estonian');
		var _opt23	=  $(document.createElement('option')).attr('value','tl').html('Filipino');
		var _opt24	=  $(document.createElement('option')).attr('value','fi').html('Finnish');
		var _opt25	=  $(document.createElement('option')).attr('value','fr').html('French');
		var _opt26	=  $(document.createElement('option')).attr('value','gl').html('Galician');
		var _opt27	=  $(document.createElement('option')).attr('value','ka').html('Georgian');
		var _opt28	=  $(document.createElement('option')).attr('value','de').html('German');
		var _opt29	=  $(document.createElement('option')).attr('value','el').html('Greek');
		var _opt30	=  $(document.createElement('option')).attr('value','gn').html('Guarani');
		var _opt31	=  $(document.createElement('option')).attr('value','gu').html('Gujarati');
		var _opt32	=  $(document.createElement('option')).attr('value','he').html('Hebrew');
		var _opt33	=  $(document.createElement('option')).attr('value','hi').html('Hindi');
		var _opt34	=  $(document.createElement('option')).attr('value','hu').html('Hungarian');
		var _opt35	=  $(document.createElement('option')).attr('value','is').html('Icelandic');
		var _opt36	=  $(document.createElement('option')).attr('value','id').html('Indonesian');
		var _opt37	=  $(document.createElement('option')).attr('value','iu').html('Inuktitut');
		var _opt38	=  $(document.createElement('option')).attr('value','ga').html('Irish');
		var _opt39	=  $(document.createElement('option')).attr('value','it').html('Italian');
		var _opt40	=  $(document.createElement('option')).attr('value','ja').html('Japanese');
		var _opt41	=  $(document.createElement('option')).attr('value','kn').html('Kannada');
		var _opt42	=  $(document.createElement('option')).attr('value','kk').html('Kazakh');
		var _opt43	=  $(document.createElement('option')).attr('value','km').html('Khmer');
		var _opt44	=  $(document.createElement('option')).attr('value','ko').html('Korean');
		var _opt45	=  $(document.createElement('option')).attr('value','ku').html('Kurdish');
		var _opt46	=  $(document.createElement('option')).attr('value','ky').html('Kyrgyz');
		var _opt47	=  $(document.createElement('option')).attr('value','lo').html('Lao');
		var _opt48	=  $(document.createElement('option')).attr('value','lv').html('Latvian');
		var _opt49	=  $(document.createElement('option')).attr('value','lt').html('Lithuanian');
		var _opt50	=  $(document.createElement('option')).attr('value','mk').html('Macedonian');
		var _opt51	=  $(document.createElement('option')).attr('value','ms').html('Malay');
		var _opt52	=  $(document.createElement('option')).attr('value','ml').html('Malayalam');
		var _opt53	=  $(document.createElement('option')).attr('value','mt').html('Maltese');
		var _opt54	=  $(document.createElement('option')).attr('value','mr').html('Marathi');
		var _opt55	=  $(document.createElement('option')).attr('value','mn').html('Mongolian');
		var _opt56	=  $(document.createElement('option')).attr('value','ne').html('Nepali');
		var _opt57	=  $(document.createElement('option')).attr('value','no').html('Norwegian');
		var _opt58	=  $(document.createElement('option')).attr('value','or').html('Oriya');
		var _opt59	=  $(document.createElement('option')).attr('value','ps').html('Pashto');
		var _opt60	=  $(document.createElement('option')).attr('value','fa').html('Persian');
		var _opt61	=  $(document.createElement('option')).attr('value','pl').html('Polish');
		var _opt62	=  $(document.createElement('option')).attr('value','pt').html('Portuguese');
		var _opt63	=  $(document.createElement('option')).attr('value','pa').html('Punjabi');
		var _opt64	=  $(document.createElement('option')).attr('value','ru').html('Russian');
		var _opt65	=  $(document.createElement('option')).attr('value','ro').html('Romanian');
		var _opt66	=  $(document.createElement('option')).attr('value','sa').html('Sanskrit');
		var _opt67	=  $(document.createElement('option')).attr('value','sr').html('Serbian');
		var _opt68	=  $(document.createElement('option')).attr('value','sd').html('Sindhi');
		var _opt69	=  $(document.createElement('option')).attr('value','si').html('Sinhalese');
		var _opt70	=  $(document.createElement('option')).attr('value','sk').html('Slovak');
		var _opt71	=  $(document.createElement('option')).attr('value','sl').html('Slovenian');
		var _opt72	=  $(document.createElement('option')).attr('value','es').html('Spanish');
		var _opt73	=  $(document.createElement('option')).attr('value','sw').html('Swahili');
		var _opt74	=  $(document.createElement('option')).attr('value','sv').html('Swedish');
		var _opt75	=  $(document.createElement('option')).attr('value','tg').html('Tajik');
		var _opt76	=  $(document.createElement('option')).attr('value','ta').html('Tamil');
		var _opt77	=  $(document.createElement('option')).attr('value','te').html('Telugu');
		var _opt78	=  $(document.createElement('option')).attr('value','th').html('Thai');
		var _opt79	=  $(document.createElement('option')).attr('value','bo').html('Tibetan');
		var _opt80	=  $(document.createElement('option')).attr('value','tr').html('Turkish');
		var _opt81	=  $(document.createElement('option')).attr('value','uk').html('Ukranian');
		var _opt82	=  $(document.createElement('option')).attr('value','ur').html('Urdu');
		var _opt83	=  $(document.createElement('option')).attr('value','uz').html('Uzbek');
		var _opt84	=  $(document.createElement('option')).attr('value','ug').html('Uighur');
		var _opt85	=  $(document.createElement('option')).attr('value','vi').html('Vietnamese');
		var _opt86	=  $(document.createElement('option')).attr('value','cy').html('Welsh');
		var _opt87	=  $(document.createElement('option')).attr('value','yi').html('Yiddish');
		
		var _select	= $(document.createElement('select'))
						.append(_opt0).append(_opt1).append(_opt2).append(_opt3).append(_opt4).append(_opt5).append(_opt6).append(_opt7)
						.append(_opt8).append(_opt9).append(_opt10).append(_opt11).append(_opt12).append(_opt13).append(_opt14).append(_opt15)
						.append(_opt16).append(_opt17).append(_opt18).append(_opt19).append(_opt20).append(_opt21).append(_opt22).append(_opt23)
						.append(_opt24).append(_opt25).append(_opt26).append(_opt27).append(_opt28).append(_opt29).append(_opt30).append(_opt31)
						.append(_opt32).append(_opt33).append(_opt34).append(_opt35).append(_opt36).append(_opt37).append(_opt38).append(_opt39)
						.append(_opt40).append(_opt41).append(_opt42).append(_opt43).append(_opt44).append(_opt45).append(_opt46).append(_opt47)
						.append(_opt48).append(_opt49).append(_opt50).append(_opt51).append(_opt52).append(_opt53).append(_opt54).append(_opt55)
						.append(_opt56).append(_opt57).append(_opt58).append(_opt59).append(_opt60).append(_opt61).append(_opt62).append(_opt63)
						.append(_opt64).append(_opt65).append(_opt66).append(_opt67).append(_opt68).append(_opt69).append(_opt70).append(_opt71)
						.append(_opt72).append(_opt73).append(_opt74).append(_opt75).append(_opt76).append(_opt77).append(_opt78).append(_opt79)
						.append(_opt80).append(_opt81).append(_opt82).append(_opt83).append(_opt84).append(_opt85).append(_opt86).append(_opt87);
		return _select;
	};			
	$.fn.translate.defaults = {
		original 		: 'en',
		notfound 		: 'No translation found',
		title    		: 'Translate',
		firstOptionText : 'Choose Language:'
	};
})(jQuery);