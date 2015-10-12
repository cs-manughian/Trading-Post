/*
*  Service to run queries for goods and services.
*  A factory service is a Singleton that can
*  be used across the app.
*/

angular.module('trading-post').factory('GoodsServicesService',function($http) {

	
	var GoodsServicesOp = {};

	GoodsServicesOp.search = function( query ) {

		// Use post for secure queries
		// Need recent posts for display
		return $http.post('/searchgs', query);

	};

	GoodsServicesOp.insert = function( query ) {

		// Use post for secure queries
		// Need recent posts for display
		return $http.post('/insertgs', query);

	};

	GoodsServicesOp.update = function( query ) {

		// Use post for secure queries
		// Need recent posts for display
		return $http.post('/updategs', query);

	};

	GoodsServicesOp.remove = function( query ) {

		// Use post for secure queries
		// Need recent posts for display
		return $http.post('/removegs', query);

	};

	return GoodsServicesOp;
	       
});
