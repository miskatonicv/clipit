/************************************************
* 	ProxyMgr
*	param: windowLocationSearch (a.k.a QueryString)
*	
*	This class is used to store the QueryString to
*  	parsed for building the API URLs.
*************************************************/

var ProxyMgr = function( windowLocationSearch ) {	

	this.baseProxyUrl = 'http://meijer.mts.dev.modivmedia.net/mts/res/';
	
	this.windowLocationSearch = windowLocationSearch;
	
	this.useMTS = false;

};

ProxyMgr.prototype = {

	/********************************************************
	*	function: http_get 
	*	param:  name --> name of query parameter 
	* 	
	*	Extract the value for the requested query parameter
	*********************************************************/
	http_get: function( name ) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(this.windowLocationSearch);
		if(results == null) {
			return "";
		} else {
			return decodeURIComponent(results[1].replace(/\+/g, " "));
		}	
	},	

	/********************************************************
	*	function: build_url 
	*	param:  method --> name of method to call in API
	*			param --> parameters for the API method call
	* 	
	*	Build the API URL to get data from API
	*********************************************************/
	build_url: function( method, param ) {
		var url = []; 
		
		if( this.useMTS ) {			
			
			url.push(
				this.baseProxyUrl,
				'customer/', this.http_get( 'customer' ),
				'/opco/', this.http_get( 'opco' ),
				'/media/ltc/', method
			);
			
			if( param ) {
				url.push('/', param);
			}
			
			url.push(
				'?', 'app=', this.http_get( 'app' ), 
				'&store=', this.http_get( 'store' ),
				'&shopperid=', this.http_get( 'shopperid' )
			);
			
		} else {	
		
			if( param) {
				url.push('json/', param.replace(/\-/, ''), '.json');		
			} else {
				url.push('json/', method, '.json');
			}
		}
			   
		return url.join("");
	}
};