angular.module('filmViz')
  .directive('videoPlayer', function() {
    'use strict';
    return {
      restrict: 'E',
      templateUrl: 'scripts/video-player/videoPlayer.html',
      link: function(scope, element, attributes) {
        var video = document.getElementById('video-main');
        var input = document.getElementById('video-input');
        var URL = window.URL || window.webkitURL;

        var playSelectedFile = function(event) {
          var file = this.files[0];
          var fileURL = URL.createObjectURL(file);

          console.log(video.canPlayType(file.type));
          video.src = fileURL;
        };

        input.addEventListener('change', playSelectedFile, false);

        scope.play = function() {
          video.play();
        };

        scope.stop = function() {
          video.stop();
        };

        scope.seek = function(second) {
          video.currentTime(second);
        };
      },
    };
  });
