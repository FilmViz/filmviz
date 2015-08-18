angular.module('filmViz', ['ngRoute', 'ui.bootstrap'])
  .config(function($routeProvider) {
    'use strict';
    $routeProvider
      .when('/', {
        templateUrl: 'pages/editor.html',
        controller: 'ProjectController',
      });
  });
