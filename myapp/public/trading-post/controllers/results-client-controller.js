// Create a controller and add to trading-post module
angular.module('trading-post').controller('resultsController', function($scope, $http, $location){
	
	$scope.name ='results';

	$scope.searchResults = {};

	$scope.myQuery = {};

	// Gets a get variable "variable"'s value from url 
	// so we don't have to use HTML 5 mode
	$scope.getUrlVariable = function(variable, prefix)
	{
       		var query = window.location.search.substring(1);
       		var vars = query.split(prefix);
       		for (var i=0;i<vars.length;i++) {
              	 	var pair = vars[i].split("=");
               		if(pair[0] == variable && prefix == "&")
               		{
      	         	  return pair[1].split("+").join(" ");
               	  
        	       	}
               		else if(pair[0] == variable && prefix == "?"){ 
        	       	  return pair[1].split("&", 1)[0];
               		}
       		}
       		return(false);
	}

	$scope.myQuery.category = $scope.getUrlVariable('category','?');
	$scope.myQuery.gsName = $scope.getUrlVariable('gsName','&');
	$scope.myQuery.zipcode = $scope.getUrlVariable('zipcode','&');

	$scope.requestSearchResults = function() {

		$http.post('/results', { myQuery: $scope.myQuery}).
		   success(function(responseData) {
			$scope.searchResults = responseData;
		 }).
		   error(function(responseData) {
    	   		console.log('Search results POST error. Received: ', responseData);
    	  	 });
	};

	$scope.requestSearchResults();

});	

