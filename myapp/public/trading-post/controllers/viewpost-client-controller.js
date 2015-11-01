/*
*  Controller for "view post"
*  - Provides additional details
*    about the clicked post
*
*/

// Create a controller and add to trading-post module
angular.module('trading-post').controller('viewpostController', function($scope, $http, $window, GsService){
	
	// Vars
	$scope.name ='viewpost';
	$scope.currPost = {};

	// Functions

	// Get the data for the post we 
	// clicked on
	$scope.getClickedPost = function(){
		$scope.currPost = GsService.getCurrentPost();

	}

	// "Main"
	$scope.getClickedPost();

	
});	

