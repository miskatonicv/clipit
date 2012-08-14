
var categoryController = function( urlObj, options ) {
	
	this.proxyMgr = new ProxyMgr( window.location.search );	
	
	this._urlObj = urlObj;
	
	this._options = options;
	
	this._pageSelector = this._urlObj.hash.replace( /\?.*$/, "" );
	
	this._page = $( this._pageSelector );
	
	this._content = this._page.children( ":jqmData(role=content)" );	
};

categoryController.prototype = {

	loadNewPage: function( cc ) {
	
		cc._page.page();
			
		cc._content.find( ":jqmData(role=listview)" ).listview();
			
		cc._options.dataUrl = cc._urlObj.href;

		$.mobile.changePage( cc._page, cc._options );
		
		cc._page.trigger("create");
	
	},
	
	displaySuccess: function (cc, data, textStatus, jqXHR ) {
		
		console.log('updateCategories');
		
		var categories = data;
		
		if ( categories ) {
		
			var markup = '<ul data-role="listview" data-inset="true">'; 	
			
			$.each( categories, function(key, value) {
			
				markup += '<li><a href="#offers?categoryId=' + value.categoryId + '">' + value.categoryName + '</a></li>';
				
			});
			
			markup += '</ul>';
			
			cc._content.html( markup );
			
			cc.loadNewPage( cc );
		}
	},
	
	displayError: function (cc, jqXHR, textStatus, errorThrown) {
		
		var markup = '<div> Error Connecting to MTS </div>';
			
		cc._content.html( markup );
			
		cc.loadNewPage( cc );
		
	},
	
	update: function( cc ) {
		
		var url = this.proxyMgr.build_url( 'category' );
		
		console.log('GET Categories: ' + url);

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'jsonp',
			jsonpCallback: 'callback',
			success: function(data, textStatus, jqXHR) {
				cc.displaySuccess( cc, data, textStatus, jqXHR );
			},
			error: function (jqXHR, textStatus, errorThrown) {			
				cc.displayError( cc, jqXHR, textStatus, errorThrown); 
			}			
		});	
				
	}
	
};