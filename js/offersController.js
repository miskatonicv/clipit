
var offersController = function(  ) {
	
	this.proxyMgr = new ProxyMgr( window.location.search );	

};

offersController.prototype = {

	updateMarkup: function ( data, status, req, pageSelector, urlObj, options ) {
			
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

			var $page = $( "#offers" ),

				$header = $page.children( ":jqmData(role=header)" ),

				$content = $page.children( ":jqmData(role=content)" );			

			$header.find( "h1" ).html( data.categoryName );
			
			$content.html( markup );
			
			$page.page();
			
			$content.find( ":jqmData(role=listview)" ).listview();
			
			//debugger;
			
			options.dataUrl = urlObj.href;

			$.mobile.changePage( $page, options );
			
			$page.trigger("create");
		}
	},
	
	update: function( oc, urlObj, options ) {
		
		var $categoryId = urlObj.hash.replace( /.*categoryId=/, "" ),  // fetch catagory requested
			pageSelector = urlObj.hash.replace( /\?.*$/, "" ),
			$callback = $categoryId.toLowerCase().replace(/-\s/g, ""),
			url = this.proxyMgr.build_url( 'category', $categoryId );
			
			

		//debugger;
		
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'jsonp',
			jsonpCallback: 'callback',
			success: function(data, status, req) {
			//debugger;
				oc.updateMarkup( data, status, req, pageSelector, urlObj, options );
			},
			error: function (data, status, req) {
			debugger;
				alert(req.responseText + " " + status);
			}			
		});	
				
	}
};
	