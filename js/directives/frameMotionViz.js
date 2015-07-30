(function() {
  angular.module('filmVizApp')
    .directive('frameMotionViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/frameMotionViz.html'
      };
    });
}());
