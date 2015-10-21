// Create a controller and add to trading-post module
angular.module('trading-post').controller('resultsController', function($scope, $http){
	
	$scope.name ='results';

	$scope.searchResults = {};

	$scope.requestSearchResults = function() {

		$http.post('/results').
		   success(function(responseData) {

				$scope.searchResults = responseData;
			}).
		   error(function(responseData) {
    	   		 console.log('Search results POST error. Received: ', responseData);
    	  	 });
	};

	$scope.requestSearchResults();

});	

