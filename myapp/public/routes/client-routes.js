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
          //Show recent posts as the home page
                templateUrl : 'trading-post/views/recentposts.html' 
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

            //route for single item page
            .when('/viewpost', {
                templateUrl : 'trading-post/views/viewpost.html'
            })

            .otherwise({
            redirectTo: '/'
            });
        }]);