// Create a controller and add to trading-post module
angular.module('trading-post').controller('tradesController', function($scope, $http, $window, GsService, UserService, AllService){
	
	// Vars
	$scope.name ='trades';
	$scope.isTradeFound = false;
	$scope.trades = {};

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
			}
    		   }).
		   error(function(responseData) {
    	   		 console.log('Trades GET error. Received: ', responseData);
    	  	 });
	};


	// "Main"
	 $scope.getUser();

		
});	

