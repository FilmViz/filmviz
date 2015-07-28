(function() {
  angular.module('filmVizApp')
    .directive('frameColorViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/frameColorViz.html'
      };
    });
}());
