/*
*  Controller for "view post"
*  - Provides additional details
*    about the clicked post
*
*/

// Create a controller and add to trading-post module
angular.module('trading-post').controller('viewpostController', function($scope, $http, $window, GsService, UserService){
	
	// Vars
	$scope.name ='viewpost';
	$scope.currPost = {};

	// Functions

	// Get the data for the post we 
	// clicked on
	$scope.getClickedPost = function(){
		$scope.currPost = GsService.getCurrentPost();

	};

	$scope.addToWishlist = function(item) {

		var importance = prompt("Please enter its importance to you from 0 to 10", "0");
		
		// Append its importance to the item obj
		item.importance = importance;
		
		UserService.addToWishlist(item).
		   success(function(responseData) {
			// Notify to login or notify it's added
			if( responseData == '0' ) {
				$window.alert("You must log in first to add items to your wishlist!");
			} else {
    		   		$window.alert("The item was successfully added to your wishlist!");
				$window.location.href = "#recent";
			}
		 }).
		   error(function(responseData) {
    	   		 console.log('Wishlist POST error. Received: ', responseData);
    	  	 });
	};

	// "Main"
	$scope.getClickedPost();

	
});	

