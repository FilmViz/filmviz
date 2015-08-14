angular.module('filmViz')
  .directive('videoController', ['ProjectData', 'Analyzer', function(ProjectData, Analyzer) {
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

        scope.automatic = function() {
          Analyzer.runAnalysis();
        };

        var loadProject = function(event) {
          ProjectData.readZip(event.target.files[0]);
        };

        var inputLoadZip = document.getElementById('input-load-zip');
        inputLoadZip.addEventListener('change', loadProject, false);
      },
    };
  },]);
