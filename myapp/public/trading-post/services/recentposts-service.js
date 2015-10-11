/*
*  Service to run queries for recent posts.
*  A factory service is a Singleton that can
*  be used across the app.
*/

angular.module('trading-post').factory('RecentPostsService',function($http) {

	
	var RecentPostsOp = {};

	RecentPostsOp.getRecentPosts = function() {

		console.log('In recent posts service...');

		// Use post for secure queries
		// Need recent posts for display
		return $http.post('/recent');

	};


	return RecentPostsOp;
	       
});
