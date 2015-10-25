// Create a controller and add to trading-post module
angular.module('trading-post').controller('resultsController', function($scope, $http, GsService){
	
	$scope.name ='results';

	$scope.isFound = false;
	$scope.isInvEmpty = false;
	$scope.searchResults = {};
	$scope.inventory = {};

	$scope.getSearchResults = function() {

		GsService.getSearchResults().
		  success(function(responseData) {

			$scope.searchResults = responseData;
			$scope.isFound = !(  responseData == null 
					  || responseData == undefined 
					  || responseData == "");

		 }).
		   error(function(responseData) {
    	   		console.log('Search results POST error. Received: ', responseData);
    	  	 });
	};

	$scope.getInventory = function() {
		 GsService.getInventory().
		   success(function(responseData) {
			$scope.inventory = responseData;
			$scope.isInvEmpty = (  responseData == null 
					    || responseData == undefined 
					    || responseData == "");		
    		   }).
		   error(function(responseData) {
    	   		 console.log('Results POST error. Received: ', responseData);
    	  	 });
	};

	$scope.getSearchResults();
	$scope.getInventory();
});	

