(function() {
  angular.module('filmViz')
    .directive('frameAudioViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'scripts/visualizations/frame-viz/frameVizAudio.html',
      };
    });
}());
