/*
*  Service to run queries for goods and services.
*  A factory service is a Singleton that can
*  be used across the app.
*
*/

// Goods/Services Service

angular.module('trading-post').factory('GsService',function($http, $location) {

	
	var GoodsServicesOp = {};

	GoodsServicesOp.getRecentPosts = function( ) {

		// Use post for secure queries
		// Need recent posts for display
		return $http.post('/recent');

	};


	GoodsServicesOp.getInventory = function( ) {

		// Use post for secure queries
		// Need inventory for display
		return $http.post('/inventory');

	};

	GoodsServicesOp.getSearchResults = function( ) {

		// Get query from URL
		var myQuery = {};
		myQuery.category = getUrlVariable('category','?');
		myQuery.gsName = getUrlVariable('gsName','&');
		myQuery.zipcode = getUrlVariable('zipcode','&');


		// Use post for secure queries
		// Need search results for display
		return $http.post('/results', myQuery);
	};


	// Helper function:
	// Gets a query variable's value from url 
	// so we don't have to use HTML 5 mode
	getUrlVariable = function(variable, prefix)
	{
       		var query = window.location.search.substring(1);
       		var vars = query.split(prefix);
       		for (var i=0;i<vars.length;i++) {
              	 	var pair = vars[i].split("=");
               		if(pair[0] == variable && prefix == "&")
               		{
      	         	  return pair[1].split("+").join(" ");
               	  
        	       	}
               		else if(pair[0] == variable && prefix == "?"){ 
        	       	  return pair[1].split("&", 1)[0];
               		}
       		}
       		return(false);
	}



	return GoodsServicesOp;
	       
});