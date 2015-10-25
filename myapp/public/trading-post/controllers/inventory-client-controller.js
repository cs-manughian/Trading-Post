// Create a controller and add to trading-post module
angular.module('trading-post').controller('inventoryController', function($scope, $http, $window, GsService, UserService, AllService){
	
	// Vars
	$scope.name ='inventory';
	$scope.isInventoryFound = false;
	$scope.inventory = {};

	// Functions
	$scope.getUser = function() {
		UserService.getUserInfo().
		   success(function(responseData) {

			// if no user data
			if( responseData == '0' ) {
				// Force login
				$window.location.href = "/login";
			}else{
				// We got the user's data
				$scope.user = responseData;
			}
    		   }).
		   error(function(responseData) {
    	   		 console.log('Inventory GET error. Received: ', responseData);
    	  	 });
	};

	$scope.getInventory = function() {
		 GsService.getInventory().
		   success(function(responseData) {
			$scope.inventory = responseData;

			$scope.isInventoryFound = !(  responseData == null 
					  	   || responseData == undefined 
					  	   || responseData == "");		
    		   }).
		   error(function(responseData) {
    	   		 console.log('Inventory POST error. Received: ', responseData);
    	  	 });
	};

	$scope.addToInventory = function( q ) {
		// Tell it to use the gs collection
		q.collName = "gs";
		AllService.insert( q ).
		   success(function(responseData) {
			console.log('Successful GS insert'); 
    		   }).
		   error(function(responseData) {
    	   		 console.log('Inventory POST error. Received: ', responseData);
    	  	 });
	};


	$scope.removeFromInventory = function( q ) {
		// Tell it to use the gs collection
		q.collName = "gs";
		AllService.remove( q ).
		   success(function(responseData) {
			console.log('Successful GS remove'); 
    		   }).
		   error(function(responseData) {
    	   		 console.log('Inventory POST error. Received: ', responseData);
    	  	 });
	};

	// "Main"
	 $scope.getUser();
	 $scope.getInventory();
		
});	

