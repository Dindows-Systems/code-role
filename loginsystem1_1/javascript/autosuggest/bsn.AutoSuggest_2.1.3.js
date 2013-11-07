/**
 *  author:		Timothy Groves - http://www.brandspankingnew.net
 *	version:	1.2 - 2006-11-17
 *              1.3 - 2006-12-04
 *              2.0 - 2007-02-07
 *              2.1.1 - 2007-04-13
 *              2.1.2 - 2007-07-07
 *              2.1.3 - 2007-07-19
 *
 */


if (typeof(bsn) == "undefined")
	_b = bsn = {};


if (typeof(_b.Autosuggest) == "undefined")
	_b.Autosuggest = {};
else
	alert("Autosuggest is already set!");












_b.AutoSuggest = function (id, param)
{
	// no DOM - give up!
	//
	if (!document.getElementById)
		return 0;
	
	
	
	
	// get field via DOM
	//
	this.fld = _b.DOM.gE(id);

	if (!this.fld)
		return 0;
	
	
	
	
	// init variables
	//
	this.sInp 	= "";
	this.nInpC 	= 0;
	this.aSug 	= [];
	this.iHigh 	= 0;
	
	
	
	
	// parameters object
	//
	this.oP = param ? param : {};
	
	// defaults	
	//
	//var k, def = {minchars:1, meth:"get", varname:"input", className:"autosuggest", timeout:2500, delay:500, offsety:-5, shownoresults: true, noresults: "No results!", maxheight: 250, cache: false, maxentries: 25};
	var k, def = {minchars:1, meth:"get", varname:"input", className:"autosuggest", timeout:3500, delay:50, offsety:-5, shownoresults: true, noresults: "No results!", maxheight: 250, cache: true, maxentries: 25};
	for (k in def)
	{
		if (typeof(this.oP[k]) != typeof(def[k]))
			this.oP[k] = def[k];
	}
	
	
	// set keyup handler for field
	// and prevent autocomplete from client
	//
	var p = this;
	
	// NOTE: not using addEventListener because UpArrow fired twice in Safari
	//_b.DOM.addEvent( this.fld, 'keyup', function(ev){ return pointer.onKeyPress(ev); } );
	
	this.fld.onkeypress 	= function(ev){ return p.onKeyPress(ev); };
	this.fld.onkeyup 		= function(ev){ return p.onKeyUp(ev); };
	//changed!
	this.fld.onkeydown 		= function(ev){ return p.onKeyDown(ev); };
	this.fld.onchange 		= function(ev){ document.getElementById('country_code').value = -1; };
	this.fld.setAttribute("autocomplete","off");
};
















_b.AutoSuggest.prototype.onKeyPress = function(ev)
{
	
	var key = (window.event) ? window.event.keyCode : ev.keyCode;



	// set responses to keydown events in the field
	// this allows the user to use the arrow keys to scroll through the results
	// ESCAPE clears the list
	// TAB sets the current highlighted value
	//
	var RETURN = 13;
	var TAB = 9;
	var ESC = 27;
	
	var bubble = 1;

	switch(key)
	{
		case RETURN:
			this.setHighlightedValue();
			bubble = 0;
			break;

		case ESC:
			this.clearSuggestions();
			break;
	}

	return bubble;
};



_b.AutoSuggest.prototype.onKeyUp = function(ev)
{
	var key = (window.event) ? window.event.keyCode : ev.keyCode;
	


	// set responses to keydown events in the field
	// this allows the user to use the arrow keys to scroll through the results
	// ESCAPE clears the list
	// TAB sets the current highlighted value
	//

	var ARRUP = 38;
	var ARRDN = 40;
	
	var bubble = 1;

	
			this.getSuggestions(this.fld.value);
	

	return bubble;
	

};


_b.AutoSuggest.prototype.onKeyDown = function(ev)
{
	var key = (window.event) ? window.event.keyCode : ev.keyCode;
	


	// set responses to keydown events in the field
	// this allows the user to use the arrow keys to scroll through the results
	// ESCAPE clears the list
	// TAB sets the current highlighted value
	//

	var ARRUP = 38;
	var ARRDN = 40;
	
	var bubble = 1;

	switch(key)
	{


		case ARRUP:
			this.changeHighlight(key);
			bubble = 0;
			break;


		case ARRDN:
			this.changeHighlight(key);
			bubble = 0;
			break;
		
		
		default:
			this.getSuggestions(this.fld.value);
	}

	return bubble;
	

};





_b.AutoSuggest.prototype.getSuggestions = function (val)
{
	
	// if input stays the same, do nothing
	//
	if (val == this.sInp)
		return 0;
	
	
	// kill list
	//
	_b.DOM.remE(this.idAs);
	
	
	this.sInp = val;
	
	
	// input length is less than the min required to trigger a request
	// do nothing
	//
	if (val.length < this.oP.minchars)
	{
		this.aSug = [];
		this.nInpC = val.length;
		return 0;
	}
	
	
	
	
	var ol = this.nInpC; // old length
	this.nInpC = val.length ? val.length : 0;
	
	
	
	// if caching enabled, and user is typing (ie. length of input is increasing)
	// filter results out of aSuggestions from last request
	//
	var l = this.aSug.length;
	/*alert(l)
	if((l<10)||(l==0))
	{
		var pointer = this;
		var input = this.sInp;
		clearTimeout(this.ajID);
		this.ajID = setTimeout( function() { pointer.doAjaxRequest(input) }, this.oP.delay );
	}
	else*/
	if (this.nInpC > ol && l && l<this.oP.maxentries && this.oP.cache)
	{
		var arr = [];
		for (var i=0;i<l;i++)
		{
			if (this.aSug[i].value.substr(0,val.length).toLowerCase() == val.toLowerCase())
				arr.push( this.aSug[i] );
				
		}
		this.aSug = arr;
		
		this.createList(this.aSug);
		
		
		
		return false;
	}
	else
	// do new request
	//
	{
		var pointer = this;
		var input = this.sInp;
		clearTimeout(this.ajID);
		this.ajID = setTimeout( function() { pointer.doAjaxRequest(input) }, this.oP.delay );
	}

	return false;
};





_b.AutoSuggest.prototype.doAjaxRequest = function (input)
{
	// check that saved input is still the value of the field
	//
	if (input != this.fld.value)
		return false;
	
	
	var pointer = this;
	
	
	// create ajax request
	//
	if (typeof(this.oP.script) == "function")
		var url = this.oP.script(encodeURIComponent(this.sInp));
	else
		var url = this.oP.script+this.oP.varname+"="+encodeURIComponent(this.sInp);
	//alert(url);
	if (!url)
		return false;
	
	var meth = this.oP.meth;
	var input = this.sInp;
	var onSuccessFunc = function (req) { pointer.setSuggestions(req, input) };
	var onErrorFunc = function (status) { alert("AJAX error: "+status); };

	var myAjax = new _b.Ajax();
	
	myAjax.makeRequest( url, meth, onSuccessFunc, onErrorFunc );
};





_b.AutoSuggest.prototype.setSuggestions = function (req, input)
{
	// if field input no longer matches what was passed to the request
	// don't show the suggestions
	//
	if (input != this.fld.value)
		return false;
	
	
	this.aSug = [];
	
	
	if (this.oP.json)
	{
		var jsondata = eval('(' + req.responseText + ')');
		
		for (var i=0;i<jsondata.results.length;i++)
		{
			this.aSug.push(  { 'id':jsondata.results[i].id, 'value':jsondata.results[i].value, 'info':jsondata.results[i].info }  );
		}
	}
	else
	{

		var xml = req.responseXML;
	
		// traverse xml
		//
		var results = xml.getElementsByTagName('results')[0].childNodes;

		for (var i=0;i<results.length;i++)
		{
			if (results[i].hasChildNodes())
				this.aSug.push(  { 'id':results[i].getAttribute('id'), 'value':results[i].childNodes[0].nodeValue, 'info':results[i].getAttribute('info') }  );
		}
	
	}
	
	this.idAs = "as_"+this.fld.id;
	

	this.createList(this.aSug);

};














_b.AutoSuggest.prototype.createList = function(arr)
{
	var pointer = this;
	
	
	
	
	// get rid of old list
	// and clear the list removal timeout
	//
	_b.DOM.remE(this.idAs);
	this.killTimeout();
	
	
	// if no results, and shownoresults is false, do nothing
	//
	if (arr.length == 0 && !this.oP.shownoresults)
		return false;
	
	
	// create holding div
	//
	var div = _b.DOM.cE("div", {id:this.idAs, className:this.oP.className});	
	
	var hcorner = _b.DOM.cE("div", {className:"as_corner"});
	var hbar = _b.DOM.cE("div", {className:"as_bar"});
	var header = _b.DOM.cE("div", {className:"as_header"});
	header.appendChild(hcorner);
	header.appendChild(hbar);
	div.appendChild(header);
	
	
	
	
	// create and populate ul
	//
	var ul = _b.DOM.cE("ul", {id:"as_ul"});
	
	
	
	
	// loop throught arr of suggestions
	// creating an LI element for each suggestion
	//
	for (var i=0;i<arr.length;i++)
	{
		// format output with the input enclosed in a EM element
		// (as HTML, not DOM)
		//
		var val = this.html_entity_decode(arr[i].value);
		var st = val.toLowerCase().indexOf( this.sInp.toLowerCase() );
		var output = val.substring(0,st) + "<em>" + val.substring(st, st+this.sInp.length) + "</em>" + val.substring(st+this.sInp.length);
		
		
		var span 		= _b.DOM.cE("span", {}, output, true);
		if (arr[i].info != "")
		{
			var br			= _b.DOM.cE("br", {});
			span.appendChild(br);
			var small		= _b.DOM.cE("small", {}, arr[i].info);
			span.appendChild(small);
		}
		
		var a 			= _b.DOM.cE("a", { href:"#" });
		
		var tl 		= _b.DOM.cE("span", {className:"tl"}, " ");
		var tr 		= _b.DOM.cE("span", {className:"tr"}, " ");
		a.appendChild(tl);
		a.appendChild(tr);
		
		a.appendChild(span);
		
		a.name = i+1;
		a.onclick = function () { pointer.setHighlightedValue(); return false; };
		a.onmouseover = function () { pointer.setHighlight(this.name); };
		
		var li = _b.DOM.cE(  "li", {}, a  );
		
		ul.appendChild( li );
	}
	
	
	// no results
	//
	if (arr.length == 0 && this.oP.shownoresults)
	{
		var li = _b.DOM.cE(  "li", {className:"as_warning"}, this.oP.noresults  );
		ul.appendChild( li );
	}
	
	
	div.appendChild( ul );
	
	
	var fcorner = _b.DOM.cE("div", {className:"as_corner"});
	var fbar = _b.DOM.cE("div", {className:"as_bar"});
	var footer = _b.DOM.cE("div", {className:"as_footer"});
	footer.appendChild(fcorner);
	footer.appendChild(fbar);
	div.appendChild(footer);
	
	
	
	// get position of target textfield
	// position holding div below it
	// set width of holding div to width of field
	//
	var pos = _b.DOM.getPos(this.fld);
	
	div.style.left 		= pos.x + "px";
	div.style.top 		= ( pos.y + this.fld.offsetHeight + this.oP.offsety ) + "px";
	div.style.width 	= this.fld.offsetWidth + "px";
	
	
	
	// set mouseover functions for div
	// when mouse pointer leaves div, set a timeout to remove the list after an interval
	// when mouse enters div, kill the timeout so the list won't be removed
	//
	div.onmouseover 	= function(){ pointer.killTimeout() };
	div.onmouseout 		= function(){ pointer.resetTimeout() };


	// add DIV to document
	//
	document.getElementsByTagName("body")[0].appendChild(div);
	
	
	
	// currently no item is highlighted
	//
	this.iHigh = 0;
	
	
	
	
	
	
	// remove list after an interval
	//
	var pointer = this;
	this.toID = setTimeout(function () { pointer.clearSuggestions() }, this.oP.timeout);
};















_b.AutoSuggest.prototype.changeHighlight = function(key)
{	
	var list = _b.DOM.gE("as_ul");
	if (!list)
		return false;
	
	var n;

	if (key == 40)
		n = this.iHigh + 1;
	else if (key == 38)
		n = this.iHigh - 1;
	
	
	if (n > list.childNodes.length)
		n = list.childNodes.length;
	if (n < 1)
		n = 1;
	
	
	this.setHighlight(n);
};



_b.AutoSuggest.prototype.setHighlight = function(n)
{
	var list = _b.DOM.gE("as_ul");
	if (!list)
		return false;
	
	if (this.iHigh > 0)
		this.clearHighlight();
	
	this.iHigh = Number(n);
	
	list.childNodes[this.iHigh-1].className = "as_highlight";


	this.killTimeout();
};


_b.AutoSuggest.prototype.clearHighlight = function()
{
	var list = _b.DOM.gE("as_ul");
	if (!list)
		return false;
	
	if (this.iHigh > 0)
	{
		list.childNodes[this.iHigh-1].className = "";
		this.iHigh = 0;
	}
};


_b.AutoSuggest.prototype.setHighlightedValue = function ()
{
	if (this.iHigh)
	{
		
		this.sInp = this.fld.value = this.html_entity_decode(this.aSug[ this.iHigh-1 ].value);
		
		// move cursor to end of input (safari)
		//
		this.fld.focus();
		if (this.fld.selectionStart)
			this.fld.setSelectionRange(this.sInp.length, this.sInp.length);
		

		this.clearSuggestions();
		
		// pass selected object to callback function, if exists
		//
		if (typeof(this.oP.callback) == "function")
			this.oP.callback( this.aSug[this.iHigh-1] );
	}
};













_b.AutoSuggest.prototype.killTimeout = function()
{
	clearTimeout(this.toID);
};

_b.AutoSuggest.prototype.resetTimeout = function()
{
	clearTimeout(this.toID);
	var pointer = this;
	this.toID = setTimeout(function () { pointer.clearSuggestions() }, 1000);
};







_b.AutoSuggest.prototype.clearSuggestions = function ()
{
	
	this.killTimeout();
	
	var ele = _b.DOM.gE(this.idAs);
	var pointer = this;
	if (ele)
	{
		var fade = new _b.Fader(ele,1,0,250,function () { _b.DOM.remE(pointer.idAs) });
	}
};



_b.AutoSuggest.prototype.get_html_translation_table = function (table, quote_style)
{
   var entities = {}, histogram = {}, decimal = 0, symbol = '';
    var constMappingTable = {}, constMappingQuoteStyle = {};
    var useTable = {}, useQuoteStyle = {};
    
    useTable      = (table ? table.toUpperCase() : 'HTML_SPECIALCHARS');
    useQuoteStyle = (quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT');
    
    // Translate arguments
    constMappingTable[0]      = 'HTML_SPECIALCHARS';
    constMappingTable[1]      = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';
    
    // Map numbers to strings for compatibilty with PHP constants
    if (!isNaN(useTable)) {
        useTable = constMappingTable[useTable];
    }
    if (!isNaN(useQuoteStyle)) {
        useQuoteStyle = constMappingQuoteStyle[useQuoteStyle];
    }

    if (useTable == 'HTML_SPECIALCHARS') {
        // ascii decimals for better compatibility
        entities['38'] = '&amp;';
        if (useQuoteStyle != 'ENT_NOQUOTES') {
            entities['34'] = '&quot;';
        }
        if (useQuoteStyle == 'ENT_QUOTES') {
            entities['39'] = '&#039;';
        }
        entities['60'] = '&lt;';
        entities['62'] = '&gt;';
    } else if (useTable == 'HTML_ENTITIES') {
        // ascii decimals for better compatibility
	    entities['38']  = '&amp;';
        if (useQuoteStyle != 'ENT_NOQUOTES') {
            entities['34'] = '&quot;';
        }
        if (useQuoteStyle == 'ENT_QUOTES') {
            entities['39'] = '&#039;';
        }
	    entities['60']  = '&lt;';
	    entities['62']  = '&gt;';
	    entities['160'] = '&nbsp;';
	    entities['161'] = '&iexcl;';
	    entities['162'] = '&cent;';
	    entities['163'] = '&pound;';
	    entities['164'] = '&curren;';
	    entities['165'] = '&yen;';
	    entities['166'] = '&brvbar;';
	    entities['167'] = '&sect;';
	    entities['168'] = '&uml;';
	    entities['169'] = '&copy;';
	    entities['170'] = '&ordf;';
	    entities['171'] = '&laquo;';
	    entities['172'] = '&not;';
	    entities['173'] = '&shy;';
	    entities['174'] = '&reg;';
	    entities['175'] = '&macr;';
	    entities['176'] = '&deg;';
	    entities['177'] = '&plusmn;';
	    entities['178'] = '&sup2;';
	    entities['179'] = '&sup3;';
	    entities['180'] = '&acute;';
	    entities['181'] = '&micro;';
	    entities['182'] = '&para;';
	    entities['183'] = '&middot;';
	    entities['184'] = '&cedil;';
	    entities['185'] = '&sup1;';
	    entities['186'] = '&ordm;';
	    entities['187'] = '&raquo;';
	    entities['188'] = '&frac14;';
	    entities['189'] = '&frac12;';
	    entities['190'] = '&frac34;';
	    entities['191'] = '&iquest;';
	    entities['192'] = '&Agrave;';
	    entities['193'] = '&Aacute;';
	    entities['194'] = '&Acirc;';
	    entities['195'] = '&Atilde;';
	    entities['196'] = '&Auml;';
	    entities['197'] = '&Aring;';
	    entities['198'] = '&AElig;';
	    entities['199'] = '&Ccedil;';
	    entities['200'] = '&Egrave;';
	    entities['201'] = '&Eacute;';
	    entities['202'] = '&Ecirc;';
	    entities['203'] = '&Euml;';
	    entities['204'] = '&Igrave;';
	    entities['205'] = '&Iacute;';
	    entities['206'] = '&Icirc;';
	    entities['207'] = '&Iuml;';
	    entities['208'] = '&ETH;';
	    entities['209'] = '&Ntilde;';
	    entities['210'] = '&Ograve;';
	    entities['211'] = '&Oacute;';
	    entities['212'] = '&Ocirc;';
	    entities['213'] = '&Otilde;';
	    entities['214'] = '&Ouml;';
	    entities['215'] = '&times;';
	    entities['216'] = '&Oslash;';
	    entities['217'] = '&Ugrave;';
	    entities['218'] = '&Uacute;';
	    entities['219'] = '&Ucirc;';
	    entities['220'] = '&Uuml;';
	    entities['221'] = '&Yacute;';
	    entities['222'] = '&THORN;';
	    entities['223'] = '&szlig;';
	    entities['224'] = '&agrave;';
	    entities['225'] = '&aacute;';
	    entities['226'] = '&acirc;';
	    entities['227'] = '&atilde;';
	    entities['228'] = '&auml;';
	    entities['229'] = '&aring;';
	    entities['230'] = '&aelig;';
	    entities['231'] = '&ccedil;';
	    entities['232'] = '&egrave;';
	    entities['233'] = '&eacute;';
	    entities['234'] = '&ecirc;';
	    entities['235'] = '&euml;';
	    entities['236'] = '&igrave;';
	    entities['237'] = '&iacute;';
	    entities['238'] = '&icirc;';
	    entities['239'] = '&iuml;';
	    entities['240'] = '&eth;';
	    entities['241'] = '&ntilde;';
	    entities['242'] = '&ograve;';
	    entities['243'] = '&oacute;';
	    entities['244'] = '&ocirc;';
	    entities['245'] = '&otilde;';
	    entities['246'] = '&ouml;';
	    entities['247'] = '&divide;';
	    entities['248'] = '&oslash;';
	    entities['249'] = '&ugrave;';
	    entities['250'] = '&uacute;';
	    entities['251'] = '&ucirc;';
	    entities['252'] = '&uuml;';
	    entities['253'] = '&yacute;';
	    entities['254'] = '&thorn;';
	    entities['255'] = '&yuml;';
    } else {
        throw Error("Table: "+useTable+' not supported');
        return false;
    }
    
    // ascii decimals to real symbols
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal);
        histogram[symbol] = entities[decimal];
    }
    
    return histogram;	
   
};
_b.AutoSuggest.prototype.html_entity_decode = function (string, quote_style)
{
	
    var histogram = {}, symbol = '', tmp_str = '', entity = '';
    tmp_str = string.toString();
    
    if (false === (histogram = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }

    // &amp; must be the last character when decoding!
    delete(histogram['&']);
    histogram['&'] = '&amp;';

    for (symbol in histogram) {
        entity = histogram[symbol];
        tmp_str = tmp_str.split(entity).join(symbol);
    }
    
    return tmp_str;
};







// AJAX PROTOTYPE _____________________________________________


if (typeof(_b.Ajax) == "undefined")
	_b.Ajax = {};



_b.Ajax = function ()
{
	this.req = {};
	this.isIE = false;
};



_b.Ajax.prototype.makeRequest = function (url, meth, onComp, onErr)
{
	
	if (meth != "POST")
		meth = "GET";
	
	this.onComplete = onComp;
	this.onError = onErr;
	
	var pointer = this;
	
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest)
	{
		this.req = new XMLHttpRequest();
		this.req.onreadystatechange = function () { pointer.processReqChange() };
		this.req.open("GET", url, true); //
		this.req.send(null);
	// branch for IE/Windows ActiveX version
	}
	else if (window.ActiveXObject)
	{
		this.req = new ActiveXObject("Microsoft.XMLHTTP");
		if (this.req)
		{
			this.req.onreadystatechange = function () { pointer.processReqChange() };
			this.req.open(meth, url, true);
			this.req.send();
		}
	}
};


_b.Ajax.prototype.processReqChange = function()
{
	
	// only if req shows "loaded"
	if (this.req.readyState == 4) {
		// only if "OK"
		if (this.req.status == 200)
		{
			this.onComplete( this.req );
		} else {
			this.onError( this.req.status );
		}
	}
};










// DOM PROTOTYPE _____________________________________________


if (typeof(_b.DOM) == "undefined")
	_b.DOM = {};



/* create element */
_b.DOM.cE = function ( type, attr, cont, html )
{
	var ne = document.createElement( type );
	if (!ne)
		return 0;
		
	for (var a in attr)
		ne[a] = attr[a];
	
	var t = typeof(cont);
	
	if (t == "string" && !html)
		ne.appendChild( document.createTextNode(cont) );
	else if (t == "string" && html)
		ne.innerHTML = cont;
	else if (t == "object")
		ne.appendChild( cont );

	return ne;
};



/* get element */
_b.DOM.gE = function ( e )
{
	var t=typeof(e);
	if (t == "undefined")
		return 0;
	else if (t == "string")
	{
		var re = document.getElementById( e );
		if (!re)
			return 0;
		else if (typeof(re.appendChild) != "undefined" )
			return re;
		else
			return 0;
	}
	else if (typeof(e.appendChild) != "undefined")
		return e;
	else
		return 0;
};



/* remove element */
_b.DOM.remE = function ( ele )
{
	var e = this.gE(ele);
	
	if (!e)
		return 0;
	else if (e.parentNode.removeChild(e))
		return true;
	else
		return 0;
};



/* get position */
_b.DOM.getPos = function ( e )
{
	var e = this.gE(e);

	var obj = e;

	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft;
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	
	var obj = e;
	
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;

	return {x:curleft, y:curtop};
};










// FADER PROTOTYPE _____________________________________________



if (typeof(_b.Fader) == "undefined")
	_b.Fader = {};





_b.Fader = function (ele, from, to, fadetime, callback)
{	
	if (!ele)
		return 0;
	
	this.e = ele;
	
	this.from = from;
	this.to = to;
	
	this.cb = callback;
	
	this.nDur = fadetime;
		
	this.nInt = 50;
	this.nTime = 0;
	
	var p = this;
	this.nID = setInterval(function() { p._fade() }, this.nInt);
};




_b.Fader.prototype._fade = function()
{
	this.nTime += this.nInt;
	
	var ieop = Math.round( this._tween(this.nTime, this.from, this.to, this.nDur) * 100 );
	var op = ieop / 100;
	
	if (this.e.filters) // internet explorer
	{
		try
		{
			this.e.filters.item("DXImageTransform.Microsoft.Alpha").opacity = ieop;
		} catch (e) { 
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			this.e.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+ieop+')';
		}
	}
	else // other browsers
	{
		this.e.style.opacity = op;
	}
	
	
	if (this.nTime == this.nDur)
	{
		clearInterval( this.nID );
		if (this.cb != undefined)
			this.cb();
	}
};



_b.Fader.prototype._tween = function(t,b,c,d)
{
	return b + ( (c-b) * (t/d) );
};