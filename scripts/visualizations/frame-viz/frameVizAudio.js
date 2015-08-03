(function() {
  angular.module('filmVizApp')
    .directive('frameAudioViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'scripts/visualizations/frame-viz/frameVizAudio.html',
      };
    });
}());
