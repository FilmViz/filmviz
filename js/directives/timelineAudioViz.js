(function() {
  angular.module('filmVizApp')
    .directive('timelineAudioViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/timelineAudioViz.html'
      };
    });
}());
