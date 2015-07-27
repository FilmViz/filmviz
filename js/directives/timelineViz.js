(function() {
  angular.module('filmVizApp')
    .directive('timelineViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/timelineViz.html'
      };
    });
}());
