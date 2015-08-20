angular.module('filmViz')
  .directive('videoController', function() {
    'use strict';
    return {
      restrict: 'E',
      templateUrl: 'scripts/video-player/videoControls.html',
      link: function(scope, element, attributes) {
        var video = document.getElementById('video-main');

        scope.data = [];

        scope.play = function() {
          video.play();
        };

        scope.pause = function() {
          video.pause();
        };

        scope.firstFrame = function() {
          video.currentTime = 0;
        };
      },
    };
  });
