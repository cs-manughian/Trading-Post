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

	UserOp.addToWishlist = function( item ) {
		var query = {};
		query.item = item;

		// Add the item to the current user's wishlist
		return $http.post('/insertWishList', query);
	};

	return UserOp;
	       
});