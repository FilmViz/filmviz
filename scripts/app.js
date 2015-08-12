angular.module('filmViz', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'pages/editor.html',
        controller: 'ProjectController',
      });
  });
