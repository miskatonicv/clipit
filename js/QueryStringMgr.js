var QueryStringMgr = function() {

	this.http_get = function( name ) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);
		if(results == null) {
			return "";
		} else {
			return decodeURIComponent(results[1].replace(/\+/g, " "));
		}	
	};

	this.customer = this.http_get( 'customer' ); 

	this.opco = this.http_get( 'opco' );
	
	this.app = this.http_get( 'app' );
	
	this.store = this.http_get( 'store' );	
	
};