// Create a controller and add to trading-post module
angular.module('trading-post').controller('inventoryController', function($scope, $http, GoodsServicesService){
	
	$scope.name ='inventory';

	$scope.inventory = [];
	$scope.gs = [];
	$scope.gs2 = [];

   	// NEED COOKIES TO KNOW WHICH USER I AM
   	// NEED COOKIE CODE

	// Sample code for how to do queries for inventory
	// *tested already*
	// Will get data from view (user) and bind data to view

	$scope.query = { key: 'owner', value: 'Cosi'};
	$scope.query2 = {
	
				owner: "Mana",
				zipcode: "90277",	
				name: "Oranges",
				type: "Good",
				quantity: "5",
				imgUrl: "./img/placeHolder.png",
				category: "Food",
				datePosted: (new Date()).toString()
			
			};

	$scope.query3 = {key: "owner", values: ["Mana"]};
	$scope.query4 = {oldkey: "owner", oldvalue: "Mana", newkey: "owner", newvalue: "John"};


	$scope.searchGS = function( q ) {

		GoodsServicesService.search( q ).
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

		GoodsServicesService.insert( q2 ).
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
	//GoodsServicesService.remove($scope.query3);	
	//GoodsServicesService.update($scope.query4);
});	

