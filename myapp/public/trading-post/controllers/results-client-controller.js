// Create a controller and add to trading-post module
angular.module('trading-post').controller('resultsController', function($scope, $http, $window, GsService, TradesService){
	
	$scope.name ='results';

	$scope.isFound = false;
	$scope.isInvEmpty = false;
	$scope.searchResults = {};
	$scope.inventory = {};
	$scope.tradeItems = {};

	$scope.getSearchResults = function() {

		GsService.getSearchResults().
		  success(function(responseData) {

			$scope.searchResults = responseData;
			$scope.isFound = !(  responseData == null || responseData == undefined || responseData == "");

		 }).
		   error(function(responseData) {
    	   		console.log('Search results POST error. Received: ', responseData);
    	  	 });
	};

	$scope.getInventory = function() {
		 GsService.getInventory().
		   success(function(responseData) {
			$scope.inventory = responseData;
			$scope.isInvEmpty = (  responseData == null || responseData == undefined || responseData == "");		
    		   }).
		   error(function(responseData) {
    	   		 console.log('Results POST error. Received: ', responseData);
    	  	 });
	};

	$scope.sendTradeRequest = function() {

		 TradesService.requestTrade( $scope.tradeItems ).
		   success(function(responseData) {
			 // Successful trade request		
    		   }).
		   error(function(responseData) {
    	   		 console.log('Results POST error. Received: ', responseData);
    	  	 });
	};


	// Need to save the clicked item so we 
	// know what the user is requesting to trade
	$scope.saveClickedGS = function( item ) {
		$scope.tradeItems.clickedGS = item;
	};

	// Need to save the offered item so we 
	// know what the user is offering to trade
	$scope.saveOfferedGS = function( item ) {
		$scope.tradeItems.offeredGS = item;
	};

	// Set the clicked post so we can pass
	// the post's data to the more detailed view
	// of the post ("view post" view)
	$scope.setPostAndRedirect = function(post){
		GsService.setCurrentPost(post);
		$window.location.href = "#/viewpost";
	}


	// "Main"

	$scope.getSearchResults();
	$scope.getInventory();
});	

