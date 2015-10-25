/*
*  Service to get user data
*  (for the logged in user)
*
*/

angular.module('trading-post').factory('UserService',function($http) {
	
	var UserOp = {};

	UserOp.getUserInfo = function( query ) {

		// Get the information of the 
		// currently logged in user to display
		return $http.get('/userInfo');

	};

	return UserOp;
	       
});