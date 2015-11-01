// Create a controller and add to trading-post module
angular.module('trading-post').controller('recentController', function($scope, $http, $window, GsService){
	
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
	
	// Set the clicked post so we can pass
	// the post's data to the more detailed view
	// of the post ("view post" view)
	$scope.setPostAndRedirect = function(post){
		GsService.setCurrentPost(post);
		$window.location.href = "#/viewpost";
	}

	$scope.getPosts();

});	

