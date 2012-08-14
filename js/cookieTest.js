function loadCookies() {
	var cr = []; 
	
	if (document.cookie != '') {
	  var ck = document.cookie.split('; ');
		for (var i=ck.length - 1; i>= 0; i--) {
		  var cv = ck.split('=');
		  cr[ck[0]]=ck[1];
		}
	  }
	return cr;
}

/*function displayCookies() {

	var cookies = loadCookies();
	
	var markup = [];
	
	markup.push('<ul>');
	
	$.each( cookies, function(key, value) {
		
		markup.push('<li> cookies
		
	});

}*/


// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
	
	if ( typeof data.toPage === "string" ) {

		var u = $.mobile.path.parseUrl( data.toPage ),
			re = /^#cookies/;
			
		if ( u.hash.search(re) !== -1 ) {
			
			ShowCookies( u, data.options );

			e.preventDefault();
		} 
		
	}
	
});


$(document).live( "pageinit", function(e) {

	//var cookies = loadCookies();
	
	debugger;

});