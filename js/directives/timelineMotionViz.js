(function() {
  angular.module('filmVizApp')
    .directive('timelineMotionViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/timelineMotionViz.html'
      };
    });
}());
