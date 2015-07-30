(function() {
  angular.module('filmVizApp')
    .directive('frameAudioViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/frameAudioViz.html'
      };
    });
}());
