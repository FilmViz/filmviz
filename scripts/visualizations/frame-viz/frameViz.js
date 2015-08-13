angular.module('filmViz')
  .directive('frameViz', function() {
    'use strict';
    return {
      restrict: 'E',
      templateUrl: 'scripts/visualizations/frame-viz/frameViz.html',
    };
  });
