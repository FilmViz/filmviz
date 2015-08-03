(function() {
  angular.module('filmVizApp')
    .directive('timelineAudioViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'scripts/visualizations/timeline-viz/timelineVizAudio.html',
      };
    });
}());
