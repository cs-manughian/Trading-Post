/*
*  Define and configure AngularJS app
*/


//An AngularJS module defines an application
var app = angular.module('trading-post', ['ngRoute']);

console.log('Angular app is now running...');

//Manually bootstrap the module
//No need to use ngApp directive
angular.element(document).ready(function () {

	angular.bootstrap(document,['trading-post']);
});

