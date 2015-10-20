// Create a controller and add to trading-post module
angular.module('trading-post').controller('profileController', function($scope, $http){
	
	$scope.name ='profile';

	$scope.user = {};

	$scope.getUserInfo = function() {

		$http.get('/loginInfo').
		   success(function(responseData) {
			$scope.user = responseData;
    		   }).
		   error(function(responseData) {
    	   		 console.log('Profile GET error. Received: ', responseData);
    	  	 });
	};
	
        $scope.getUserInfo(); 
});	

