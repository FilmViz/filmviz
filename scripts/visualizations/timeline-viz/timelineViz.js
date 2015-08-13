angular.module('filmViz')
  .directive('timelineViz', function() {
    'use strict';
    return {
      restrict: 'E',
      templateUrl: 'scripts/visualizations/timeline-viz/timelineViz.html',
    };
  });
