angular.module('filmViz', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
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
