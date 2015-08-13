angular.module('filmViz', ['ngRoute'])
  .config(function($routeProvider) {
    'use strict';
    $routeProvider
      .when('/', {
        templateUrl: 'pages/editor.html',
        controller: 'ProjectController',
      });
  });
