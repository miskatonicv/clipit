
var categoryController = function() {
	
	this.proxyMgr = new ProxyMgr( window.location.search );	
};

categoryController.prototype = {
	
	updateMarkup: function (data, status, req) {
		
		console.log('updateCategories');
		
		var categories = data;
		
		if ( categories ) {
		
			var $page = $( "#categories" ),
			
				$content = $page.children( ":jqmData(role=content)" ),	
				
				markup = '<ul data-role="listview" data-inset="true">'; 	
			
			$.each( categories, function(key, value) {
			
				markup += '<li><a href="#offers?categoryId=' + value.categoryId + '">' + value.categoryName + '</a></li>';
				
			});
			
			markup += '</ul>';
			
			$content.html( markup );
			
			$page.page();
			
			$content.find( ":jqmData(role=listview)" ).listview();

			//$.mobile.changePage( $page );
			
			$page.trigger("create");
		}
	},
	
	errorMarkup: function (data, status, req) {
		
		var $page = $( "#categories" ),
			
			$content = $page.children( ":jqmData(role=content)" ),	
				
			markup = '<div> Error Connecting to MTS </div>';
			
			$content.html( markup );
			
			$page.page();
			
			$content.find( ":jqmData(role=listview)" ).listview();

			//$.mobile.changePage( $page );
			
			$page.trigger("create");
		
	},
	
	update: function() {
		
		var url = this.proxyMgr.build_url( 'category' );
		
		console.log('GET Categories: ' + url);

		//var url = 'json/category.json';
		//debugger;
		
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'jsonp',
			jsonpCallback: 'category',
			success: this.updateMarkup,
			error: this.errorMarkup
		});	
				
	}
	
};