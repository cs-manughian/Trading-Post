/*
*  Trades service
*
*  A factory service is a Singleton that can
*  be used across the app.
*
*/


angular.module('trading-post').factory('TradesService',function($http) {

	
	var TradesServiceOp = {};

	TradesServiceOp.requestTrade = function( b ) {

		// Use post for secure queries
		return $http.post('/reqTrade', b );

	};

	return TradesServiceOp;
	       
});