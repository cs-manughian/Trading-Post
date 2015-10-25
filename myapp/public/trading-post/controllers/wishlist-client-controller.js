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
		// Tell it to use the gs collection
		q.collName = "users";
		AllService.update( q ).
		   success(function(responseData) {
			console.log('Successful GS insert'); 
    		   }).
		   error(function(responseData) {
    	   		 console.log('Wishlist POST error. Received: ', responseData);
    	  	 });
	};


	// "Main"

	// Get the user and their wishlist
	 $scope.getUser();
		
});	

