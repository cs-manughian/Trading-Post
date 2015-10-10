/*
*  Config for Angular Routes (on client)
*
*/

// configure our routes
angular.module('trading-post').config(['$routeProvider', '$locationProvider', 
	function($routeProvider, $locationProvider) {

    	    $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'trading-post/views/index.html'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'trading-post/views/about.html'
            })

            // route for the recent posts page
            .when('/recent', {
                templateUrl : 'trading-post/views/recentposts.html'
            })

            // route for the profile page
            .when('/profile', {
                templateUrl : 'trading-post/views/profile.html'
            })

            .when('/profile/:subpage', {
                templateUrl : function(params){ return 'trading-post/views/' + params.subpage + '.html'; }
            })

            // route for the search results page
            .when('/results', {
                templateUrl : 'trading-post/views/results.html'
       
            })

      	    .otherwise({
        	redirectTo: '/'
      	    });
        }]);