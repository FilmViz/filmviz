angular.module('filmViz')
  .directive('videoPlayer', ['ProjectData', function(ProjectData) {
    'use strict';
    return {
      restrict: 'E',
      templateUrl: 'scripts/video-player/videoPlayer.html',
      link: function(scope, element, attributes) {
        var video = document.getElementById('video-main');
        var URL = window.URL || window.webkitURL;

        video.src = ProjectData.videoUrl;

        video.oncanplay = function() {
          for (var analysisName in ProjectData.analysisCollection) {
            ProjectData.addTrackToVideo(analysisName, video);
            if (ProjectData.analysisCollection[analysisName].isDone) {
              ProjectData.setAnalysisAsDone(analysisName);
            }
          }
        };

        var playSelectedFile = function(event) {
          var file = this.files[0];
          var fileURL = URL.createObjectURL(file);

          console.log(video.canPlayType(file.type));
          video.src = fileURL;
        };

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
  },]);
