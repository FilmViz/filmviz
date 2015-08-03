(function() {
  angular.module('filmViz')
    .directive('timelineViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'scripts/visualizations/timeline-viz/timelineViz.html',
      };
    });
}());
