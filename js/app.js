(function() {
	
	angular.module('FilmVizApp', ['ngRoute']);

	// configure our routes
  	angular.module('FilmVizApp').config(function($routeProvider) {
  		$routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/main.html',
                controller  : 'ProjectController'
            })

            // route for the home page
            .when('/init', {
                templateUrl : 'pages/init.html',
                controller  : 'ProjectController'
            })

            // route for the about page
            .when('/editor', {
                templateUrl : 'pages/editor.html',
                controller  : 'ProjectController'
            })

            // route for the contact page
            .when('/preview', {
                templateUrl : 'pages/preview.html',
                controller  : 'ProjectController'
            });
    });



}());

