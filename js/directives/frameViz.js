(function() {
  angular.module('filmVizApp')
    .directive('frameViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/frameViz.html'
      };
    });
}());
