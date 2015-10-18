// Create a controller and add to trading-post module
angular.module('trading-post').controller('recentController', function($scope, $http){
	
	console.log('Entering recent posts controller...');

	$scope.name ='recent';

	$scope.recentPosts = {};

	/**$scope.recentPosts = [{				
				owner: "Mana",
				zipcode: "90277",	
				name: "Oranges",
				type: "Good",
				quantity: "5",
				imgUrl: "./img/haircut_sample.png",
				category: "Food",
				datePosted: (new Date()).toString()},

				{owner: "Mana",
				zipcode: "90277",	
				name: "Oranges",
				type: "Good",
				quantity: "5",
				imgUrl: "./img/haircut_sample.png",
				category: "Food",
				datePosted: (new Date()).toString()
			}];**/

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

