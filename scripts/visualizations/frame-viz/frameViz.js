(function() {
  angular.module('filmVizApp')
    .directive('frameViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'scripts/visualizations/frame-viz/frameViz.html',
      };
    });
}());
