// Create a controller and add to trading-post module
angular.module('trading-post').controller('recentController', function($scope, $http){
	
	console.log('Entering recent posts controller...');

	$scope.name ='recent';

	$scope.recentPosts = [];

	$scope.requestRecentPosts = function() {

		$http.post('/recent').
		   success(function(responseData) {

			var i;
			for( i = 0; i < responseData.length; i++ ){
				$scope.recentPosts[i] = responseData[i];
				console.log("res: ",responseData[i]);}
    		   }).
		   error(function(responseData) {
    	   		 console.log('Recent posts POST error. Received: ', responseData);
    	  	 });
	};

	$scope.requestRecentPosts();

});	

