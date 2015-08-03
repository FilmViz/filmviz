(function() {
  angular.module('filmViz')
    .directive('frameViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'scripts/visualizations/frame-viz/frameViz.html',
      };
    });
}());
