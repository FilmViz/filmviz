(function() {
  
  'use strict';
  angular.module('filmVizApp', ['ngRoute']);

  // configure our routes
  angular.module('filmVizApp').config(function($routeProvider) {
    $routeProvider
      // route for the home page
      .when('/', {
          templateUrl : 'pages/main.html',
          controller  : 'ProjectController'
      })

      // route for the project initialization page
      .when('/init', {
          templateUrl : 'pages/init.html',
          controller  : 'ProjectController'
      })

      // route for the project editor page
      .when('/editor', {
          templateUrl : 'pages/editor.html',
          controller  : 'ProjectController'
      })

      // route for the full project preview page
      .when('/preview', {
          templateUrl : 'pages/preview.html',
          controller  : 'ProjectController'
      });
  });

  /*
  * Extending Array.prototype using Object.defineProperty allows
  * you to keep looping arrays with 'for in', because 'contains()'
  * is not 'enumerable'.
  */
  Object.defineProperty(Array.prototype, 'contains', {
    value: function(item) {
      return this.indexOf(item) != -1;
    }
  });


}());
