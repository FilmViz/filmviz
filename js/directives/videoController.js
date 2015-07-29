(function() {

  angular.module('filmVizApp')
    .directive('videoController', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/videoController.html',
        link: function(scope, element, attributes) {
          var video = document.getElementById('video');

          scope.data = []

          scope.play = function() {
            video.play();
          };

          scope.pause = function() {
            video.pause();
          };

          scope.firstFrame = function() {
            video.currentTime = 0;
          };

          scope.automatic = function() {
            colorAnalyzer.colorAnalysis(project);
          }
        }
      };
    });
}());
