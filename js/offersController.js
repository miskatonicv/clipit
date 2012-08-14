
var offersController = function( urlObj, options ) {
	
	this._proxyMgr = new ProxyMgr( window.location.search );	
	
	this._urlObj = urlObj;
	
	this._options = options;
	
	this._pageSelector = this._urlObj.hash.replace( /\?.*$/, "" );
	
	this._page = $( this._pageSelector );
	
	this._header = this._page.children( ":jqmData(role=header)" );
	
	this._content = this._page.children( ":jqmData(role=content)" );			


};

offersController.prototype = {

	loadNewPage: function() {
	
		oc._page.page();
			
		oc._options.dataUrl = oc._urlObj.href;

		$.mobile.changePage( oc._page, oc._options );
		
		oc._page.trigger("create");
	
	},

	displaySuccess: function ( oc, data, textStatus, jqXHR ) {
			
		//debugger;
		
		var offersByCategory = data.mediaForCategory,	
			markup = '<ul id="ul-details">'; 

		$.each( offersByCategory, function(key, value) {
			//debugger;
			
			markup += 
				'<li id="li-details">' + 	
					'<div id="info"><a href="#" data-role="button" data-icon="info" data-iconpos="notext" data-theme="a"></a></div>' +
					'<div class="ui-grid-a">' +
						'<div class="ui-block-a">' +
							'<div id="coupon-img"><img src=' + value.imageUrl + ' border="1" width="100px" /></div>' +
						'</div>' +
						'<div class="ui-block-b">' +
							'<div id="coupon-details">' + 
								'<div id="coupon-discount">' + value.amountOffText + '</div>' +
								'<div id="coupon-desc">' + value.description + '</div>' +
								'<div id="coupon-date">offer good thru ' + value.redemptionEndDate + '</div>' +
								'<div id="clip-it-btn"><a href="#" data-role="button" data-icon="plus" data-theme="b" data-mini="true" data-inline="true">Clip It</a></div>' +
							'</div>' +
						'</div>' +
				'</div></li><hr />';
				
		});
		
		markup += '</ul>';

		if( markup ) {

			oc._header.find( "h1" ).html( data.categoryName );
			
			oc._content.html( markup );
			
			oc.loadNewPage( oc );
		}
	},
	
	displayError: function(jqXHR, textStatus, errorThrown) {
	
		debugger;	
	
	},
	
	update: function( oc ) {
		
		var categoryId = oc._urlObj.hash.replace( /.*categoryId=/, "" ),  // fetch catagory requested
			url = this.proxyMgr.build_url( 'category', categoryId );
			
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'jsonp',
			jsonpCallback: 'callback',
			success: function(data, textStatus, jqXHR) {
				oc.displaySuccess( oc, data, textStatus, jqXHR );
			},
			error: function (jqXHR, textStatus, errorThrown) {			
				oc.displayError( oc, jqXHR, textStatus, errorThrown); 
			}			
		});	
				
	}
};
	