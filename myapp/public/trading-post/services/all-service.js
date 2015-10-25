/*
*  Service to run GENERIC queries for
*  insert, remove, update, and search functions.
*  A factory service is a Singleton that can
*  be used across the app.
*
*  The collection name must be specified in
*  the query.
*
*/


angular.module('trading-post').factory('AllService',function($http) {

	
	var AllServiceOp = {};

	AllServiceOp.search = function( query ) {

		// Use post for secure queries
		return $http.post('/search', query);

	};

	AllServiceOp.insert = function( query ) {

		// Use post for secure queries
		return $http.post('/insert', query);

	};

	AllServiceOp.update = function( query ) {

		// Use post for secure queries
		return $http.post('/update', query);

	};

	AllServiceOp.remove = function( query ) {

		// Use post for secure queries
		return $http.post('/remove', query);

	};

	return AllServiceOp;
	       
});