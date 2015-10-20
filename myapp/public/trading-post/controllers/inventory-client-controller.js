// Create a controller and add to trading-post module
angular.module('trading-post').controller('inventoryController', function($scope, $http){
	
	$scope.name ='inventory';

	$scope.inventory = [];
	$scope.gs = [];
	$scope.gs2 = [];

	// Sample code for how to do queries for inventory
	// Will get data from view (user) and bind data to view
	// Need to know which user I am

	$scope.query = { collName: 'gs', key: 'owner', value: 'Cosi'};
	$scope.query2 = {
				collName: "gs",
				owner: "Mana",
				zipcode: "90277",	
				name: "Oranges",
				type: "Good",
				quantity: "5",
				imgUrl: "./img/placeHolder.png",
				category: "Food",
				datePosted: (new Date()).toString()
			
			};

	$scope.query3 = { collName: 'gs', key: "owner", values: ["John"]};
	$scope.query4 = { collName: 'gs', oldkey: "owner", oldvalue: "Mana", newkey: "owner", newvalue: "John"};


	$scope.searchGS = function( q ) {

		$http.post('/search', q ).
		   success(function(responseData) {

			var i;
			for( i = 0; i < responseData.length; i++ ){
				$scope.gs[i] = responseData[i];
			}

    		   }).
		   error(function(responseData) {
    	   		 console.log('Inventory POST error. Received: ', responseData);
    	  	 });
	};


	$scope.insertGS = function( q2 ) {

		$http.post('/insert', q2).
		   success(function(responseData) {
			console.log('Successful GS insert'); 
    		   }).
		   error(function(responseData) {
    	   		 console.log('Inventory POST error. Received: ', responseData);
    	  	 });
	};

	  $scope.searchGS( $scope.query );
	//$scope.insertGS( $scope.query2 );

	// No success/err function for testing
	//$http.post('/remove', $scope.query3);	
	//$http.post('/update', $scope.query4);
});	

