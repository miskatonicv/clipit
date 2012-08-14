/* Meijer Clipped Offers */

// Generate MarkUp from Json Data
function MarkupOffers( pageSelector, data, urlObj, options ) { 

	var offersByCategory = data.coupons,	
		markup = '<ul id="ul-details">'; 
	
	$.each( offersByCategory, function(key, value) {
		//debugger;
		
		markup += 
			'<li id="li-details">' + 	
				'<div id="info"><a href="#" data-role="button" data-icon="info" data-iconpos="notext" data-theme="a"></a></div>' +
				'<div class="ui-grid-a">' +
					'<div class="ui-block-a">' +
						'<div id="coupon-img"><img src=' + value.imgSrc + ' border="1" /></div>' +
					'</div>' +
					'<div class="ui-block-b">' +
						'<div id="coupon-details">' + 
							'<div id="coupon-discount">' + value.discount + '</div>' +
							'<div id="coupon-desc">' + value.desc + '</div>' +
							'<div id="coupon-date">offer good thru ' + value.endDate + '</div>' +
							'<div id="clip-it-btn"><a href="#" data-role="button" data-icon="plus" data-theme="b" data-mini="true" data-inline="true">Clip It</a></div>' +
						'</div>' +
					'</div>' +
			'</div></li><hr />';
			
		
	});
	
	markup += '</ul>';

	if( markup ) {

		var $page = $( pageSelector ),

			$header = $page.children( ":jqmData(role=header)" ),

			$content = $page.children( ":jqmData(role=content)" );			

		$header.find( "h1" ).html( data.header );
		
		$content.html( markup );
		
		$page.page();
		
		$content.find( ":jqmData(role=listview)" ).listview();
		
		options.dataUrl = urlObj.href;

		$.mobile.changePage( $page, options );
		
		$page.trigger("create");
	}
	
}

// Load data from specific category
function ShowOffers( urlObj, options, pm ) {

	var categoryHeader = urlObj.hash.replace( /.*categoryId=/, "" ),  // fetch catagory requested
		pageSelector = urlObj.hash.replace( /\?.*$/, "" ),
		header = categoryHeader.toLowerCase().replace(/\s/g, ""),
		url = 'json/' + header + '.json';
	
	//debugger;
	
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'jsonp',
		jsonpCallback: header,
		success: function(data, status, req) {
			MarkupOffers( pageSelector, data, urlObj, options );
		},
		error: function (data, status, req) {
		//debugger;
			alert(req.responseText + " " + status);
		}			
	});	
	
}

// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
	
	//debugger;
	
	if ( typeof data.toPage === "string" ) {

		var u = $.mobile.path.parseUrl( data.toPage ),
			re = /^#offers/;
			
		if ( u.hash.search(re) !== -1 ) {
			
			//debugger;
			
			var oc = new offersController();
			oc.update( oc, u, data.options );
			
			//var pm = new ProxyMrg( window.location.search );
			
			//ShowOffers( u, data.options, pm );

			e.preventDefault();
		} 
		
	}
	
});

$(document).live( "pageinit", function(e) {
	
	//debugger;
	
	var cc = new categoryController( );
	cc.update();

	e.preventDefault();
	
});
