// Create a controller and add to trading-post module
angular.module('trading-post').controller('recentController', function($scope, $http){
	
	console.log('Entering recent posts controller...');

	$scope.name ='recent';

	$scope.recentPosts = {};

	$scope.requestRecentPosts = function() {

		$http.post('/recent').
		   success(function(responseData) {

				$scope.recentPosts = responseData;
			}).
		   error(function(responseData) {
    	   		 console.log('Recent posts POST error. Received: ', responseData);
    	  	 });
	};

	$scope.requestRecentPosts();

});	

