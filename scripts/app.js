(function() {

  angular.module('filmViz', [
    'ngRoute',
    'utils',
  ]);

  // configure our routes
  angular.module('filmViz').config(function($routeProvider) {
    $routeProvider
      .when('/', {
        // route for the home page
        //templateUrl: 'pages/main.html',
        templateUrl: 'pages/editor.html',
        controller: 'ProjectController',
      });
  });

  /*
   * Extending Array.prototype using Object.defineProperty allows
   * you to keep looping arrays with 'for in', because 'contains()'
   * is not 'enumerable'.
   */
  Object.defineProperty(Array.prototype, 'contains', {
    value: function(item) {
      return this.indexOf(item) !== -1;
    },
  });
}());
