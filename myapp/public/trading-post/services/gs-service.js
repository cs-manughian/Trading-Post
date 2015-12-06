/*
*  Service to run queries for goods and services.
*  A factory service is a Singleton that can
*  be used across the app.
*
*/

// Goods/Services Service

angular.module('trading-post').factory('GsService',function($http, $location) {

	
	var GoodsServicesOp = {};
	var currentPost = {};

	GoodsServicesOp.getCurrentPost = function( ) {
		return currentPost;
	};

	GoodsServicesOp.setCurrentPost = function( post ) {
		currentPost = post;
	};

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
		myQuery = queryStringToJSON();
		
		// Use post for secure queries
		// Need search results for display
		return $http.post('/results', myQuery);
	};


	// Helper function:
	// Gets a query variable's value from url 
	// so we don't have to use HTML 5 mode.
	// Return as JSON.

	queryStringToJSON = function() {            
    		var pairs = window.location.search.slice(1).split('&');
    
    		var result = {};
    		pairs.forEach(function(pair) {
        		pair = pair.split('=');
        		result[pair[0]] = decodeURIComponent(pair[1] || '');
    		});

    		return JSON.parse(JSON.stringify(result));
	}

	return GoodsServicesOp;
	       
});