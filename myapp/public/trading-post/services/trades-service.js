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

	TradesServiceOp.respondToTrade = function( tradeDoc, status ) {

		var currDateAndTime = new Date().toISOString().replace('T', ' ').substr(0, 19);
		
		// Specify the trades collection
		var query = {};
		query.oldQuery = {};
		query.newQuery = {};
		query.collName = "trades";

		// Get ID of trade we're updating
		query.oldQuery._id = tradeDoc._id;

		// Update the trade status to "accepted" or "rejected"
		// (We receive "accept" or "reject" so need to add "ed")
		// and update response date
		query.newQuery.status = status+"ed";
		query.newQuery.dateResponded = currDateAndTime;

		// Use post for secure queries
		// Send old query to update with new query
		return $http.post('/update', query );

	};

	TradesServiceOp.cancelTrade = function( tradeDoc ) {

		var query = {};

		// Specify the trades collection
		query.collName = "trades";

		// Get ID of trade we're updating
		query._id = tradeDoc._id;

		// Use post for secure queries
		return $http.post('/remove', query );

	};

	TradesServiceOp.getTradedItem = function( ID ) {

		var query = {};

		// Specify the GS collection
		query.collName = "gs";

		// Given the requested/offered item ID
		// get the GS info for the item
		query._id = ID;

		// Use post for secure queries
		return $http.post('/search', query );

	};


	// This function is for getting incoming or
	// outgoing trades (specified by type)
	TradesServiceOp.getTrades = function( type ) {

		var query = {};
		query.type = type; 

		// Use post for secure queries
		return $http.post('/trades', query );
	};

	return TradesServiceOp;
	       
});