(function() {

  angular.module('filmVizApp', ['ngRoute']);

  // configure our routes
  angular.module('filmVizApp').config(function($routeProvider) {
    $routeProvider
      .when('/', {
        // route for the home page
        //templateUrl: 'pages/main.html',
        templateUrl: 'pages/editor.html',
        controller: 'ProjectController'
      })
      
      // .when('/init', {
      //   // route for the project initialization page
      //   templateUrl: 'pages/init.html',
      //   controller: 'ProjectController'
      // })
      // .when('/editor', {
      //   // route for the project editor page
      //   templateUrl: 'pages/editor.html',
      //   controller: 'ProjectController'
      // })
      // .when('/preview', {
      //   // route for the full project preview page
      //   templateUrl: 'pages/preview.html',
      //   controller: 'ProjectController'
      // });
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
