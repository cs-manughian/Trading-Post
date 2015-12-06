// Create a controller and add to trading-post module
angular.module('trading-post').controller('inventoryController', function($scope, $http, $window, GsService, UserService, AllService, UploadService){
	
	// Vars
	$scope.name ='inventory';
	$scope.isInventoryFound = false;
	$scope.inventory = {};
	$scope.item = {};
	$scope.sortOption = '';

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

	$scope.addToInventory = function( ) {

		// Fill out collection name and user info
 		// to include with item details
		var q = $scope.item;

		q.collName 	= "gs";
		q.owner 	= $scope.user.username;
		q.zipcode 	= $scope.user.zipcode;
		q.datePosted	= new Date().toISOString().replace('T', ' ').substr(0, 19);


		// Upload the image
		UploadService.uploadFile( inventoryForm ).
			success(function(responseData) {
				
			    // If we got a message from server 
			    if( responseData.message ) {
				// Display message to client about incorrect image type
				$window.alert("Failed to add: "+responseData.message);
			    } else {

				// Get the file name to save url in GS collection
				q.imgUrl = './img/'+responseData.filename;

				// Now insert the GS into the collection
				AllService.insert( q ).
		   		success(function(responseData) {
					console.log('Successful GS insert from inventory'); 
    		   		
					// Force page reload after add to update inventory display
					$window.location.reload();
				}).
		   		error(function(responseData) {
    	   		 		console.log('Inventory POST error. Received: ', responseData);
    	  	 		});

			    }
	   		});
	};

	$scope.removeFromInventory = function( item ) {

	    if( confirm("Are you sure you want remove this item?") ) {

		// Tell it to use the gs collection
		var query = {};
		query.collName = "gs";
		query._id = item._id;

		// Remove the item from the user's inventory
		AllService.remove( query ).
		   success(function(responseData) {
			console.log('Successful GS remove from inventory'); 
			$window.location.reload();
    		   }).
		   error(function(responseData) {
    	   		 console.log('Inventory POST error. Received: ', responseData);
    	  	 });

		// Remove the image
		UploadService.deleteFile(item.imgUrl);
	    }
	};

	// "Main"
	 $scope.getUser();
	 $scope.getInventory();
		
});	

