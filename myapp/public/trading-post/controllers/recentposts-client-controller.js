// Create a controller and add to trading-post module
angular.module('trading-post').controller('recentController',function($scope, $http){
	
	console.log('Entering recent posts controller...');

	$scope.name ='recent';

	$scope.testValue = 'testValue';


	$scope.requestRecentPosts = function()
	{

		// Use post for secure queries
		// Need recent posts for display
		$http.post('/recent').
		   success(function(responseData) {
    		   	 $scope.testValue = responseData;
    		   }).
		   error(function(responseData) {
    	   		 console.log('Recent posts POST error. Received: ', responseData);
    	  	 });
	};

	$scope.requestRecentPosts();

});	

