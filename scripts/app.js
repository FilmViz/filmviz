angular.module('filmViz', ['ngRoute'])
  .config(function($routeProvider) {
    'use strict';
    $routeProvider
      .when('/', {
        // route for the home page
        templateUrl: 'pages/main.html',
      })
      .when('/new-project', {
        // route for the project initialization page
        templateUrl: 'pages/new-project.html',
        controller: 'ProjectManager',
      })
      .when('/open-project', {
        // route for the project initialization page
        templateUrl: 'pages/open-project.html',
        controller: 'ProjectManager',
      })
      .when('/analyzer', {
        // route for the automatic analysis page
        templateUrl: 'pages/analyzer.html',
        controller: 'Analyzer',
      })
      .when('/editor', {
        // route for the project editor page
        templateUrl: 'pages/editor.html',
        controller: 'ProjectController',
      })
      .when('/preview', {
        // route for the full project preview page
        templateUrl: 'pages/preview.html',
        controller: 'ProjectController',
      });
  });
