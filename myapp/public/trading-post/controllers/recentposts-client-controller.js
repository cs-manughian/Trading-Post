// Create a controller and add to trading-post module
angular.module('trading-post').controller('recentController', function($scope, $http, GsService){
	
	console.log('Entering recent posts controller...');

	$scope.name ='recent';
	$scope.recentPosts = {};

	// Get the 6 most recent posts
	$scope.getPosts = function(){

		 GsService.getRecentPosts().
		   success(function(responseData) {
			$scope.recentPosts = responseData;

		 }).
		   error(function(responseData) {
    	   		console.log('Recent posts POST error. Received: ', responseData);
    	  	 });
	}

	$scope.getPosts();

});	

