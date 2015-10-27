// Create a controller and add to trading-post module
angular.module('trading-post').controller('wishlistController', function($scope, $http, $window, GsService, UserService, AllService){
	
	// Vars
	$scope.name ='wishlist';
	$scope.isWishListFound = false;
	$scope.wishList = {};

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
				$scope.wishList = responseData.wishList;

				if( $scope.wishList.length == 0 )
					$scope.isWishListFound = false;
				else
					$scope.isWishListFound = true;
			}
    		   }).
		   error(function(responseData) {
    	   		 console.log('Inventory GET error. Received: ', responseData);
    	  	 });
	};

	$scope.editWishlist = function( q ) {
		q.collName = "users";
		AllService.update( q ).
		   success(function(responseData) {
			console.log('Successful GS update from wishlist!'); 
    		   }).
		   error(function(responseData) {
    	   		 console.log('Wishlist POST error. Received: ', responseData);
    	  	 });
	};

	$scope.removeItem = function( item ) {

	    if( confirm("Are you sure you want remove this item?") ) {

		var query = {};
		query._id = $scope.user._id;	// Pass the user's ID to the server
		query.name = item.name;		// Pass wishlist item name to server

		$http.post('/updateWishList', query).
		   success(function(responseData) {
			console.log('Successful GS remove from wishlist!'); 
    		   	$window.location.reload();
		 }).
		   error(function(responseData) {
    	   		 console.log('Wishlist POST error. Received: ', responseData);
    	  	 });
			
	    }
	};	

	// "Main"

	// Get the user and their wishlist
	 $scope.getUser();
		
});	

