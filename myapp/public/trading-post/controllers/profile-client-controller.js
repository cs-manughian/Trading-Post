// Create a controller and add to trading-post module
angular.module('trading-post').controller('profileController', function($scope, $http, $window, UserService, AllService){
	
	// Vars
	$scope.name ='profile';
	$scope.user = {};
	$scope.feedbackScore = 0;
	$scope.totalRatings = 0;

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

				// Calculate user's score and total ratings
				$scope.feedbackScore = $scope.calcFeedback();
			}
    		   }).
		   error(function(responseData) {
    	   		 console.log('Profile GET error. Received: ', responseData);
    	  	 });
	};
	
	$scope.uploadProfilePic = function() {
		$window.alert("NOT YET FUNCTIONAL");
	};
	
	// Calculate the weighted average for feedback score
	$scope.calcFeedback = function() {

		$scope.totalRatings = 0;		
		var sum = 0;
		var i = 1;

		angular.forEach( $scope.user.rating, function(votes) {

			// Sum the votes times the star number
			sum += i*votes;
			i++;

			// Also calculate total number of votes
			$scope.totalRatings += votes;
		});

		if( $scope.totalRatings == 0 ) 
			return 0;
		else
			return sum / $scope.totalRatings;
	};


	// "Main"

	// First get the user's info
        $scope.getUser(); 
});	

