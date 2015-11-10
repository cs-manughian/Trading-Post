// Create a controller and add to trading-post module
angular.module('trading-post').controller('inventoryController', function($scope, $http, $window, GsService, UserService, AllService){
	
	// Vars
	$scope.name ='inventory';
	$scope.isInventoryFound = false;
	$scope.inventory = {};
	$scope.item = {};

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

			$scope.isInventoryFound = !(  responseData == null || responseData == undefined || responseData == "");		
    		   }).
		   error(function(responseData) {
    	   		 console.log('Inventory POST error. Received: ', responseData);
    	  	 });
	};

	$scope.addToInventory = function( item ) {
		// Fill out collection name and user info
		// to include with item details
		var q = item;
		q.collName 	= "gs";
		q.owner 	= $scope.user.username;
		q.zipcode 	= $scope.user.zipcode;
		q.datePosted	= new Date().toISOString().replace('T', ' ').substr(0, 19);
		q.imgUrl	= "";

		AllService.insert( q ).
		   success(function(responseData) {
			console.log('Successful GS insert from inventory'); 
    		   }).
		   error(function(responseData) {
    	   		 console.log('Inventory POST error. Received: ', responseData);
    	  	 });

		// Force page reload after add to update inventory display
		$window.location.reload();
	};


	$scope.removeFromInventory = function( item ) {

	    if( confirm("Are you sure you want remove this item?") ) {

		// Tell it to use the gs collection
		var query = {};
		query.collName = "gs";
		query._id = item._id;

		AllService.remove( query ).
		   success(function(responseData) {
			console.log('Successful GS remove from inventory'); 
			$window.location.reload();
    		   }).
		   error(function(responseData) {
    	   		 console.log('Inventory POST error. Received: ', responseData);
    	  	 });
	    }
	};

	// "Main"
	 $scope.getUser();
	 $scope.getInventory();
		
});	

