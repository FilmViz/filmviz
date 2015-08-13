angular.module('filmViz')
  .directive('frameAudioViz', ['$rootScope', function($rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/visualizations/frame-viz/frameVizAudio.html',
      link: function(scope, element, attributes) {
        var showFrameAudioViz = function() {
          var video = document.getElementById('video-main');
          var track = video.textTracks[1];
          var audio = JSON.parse(track.activeCues[0].text);
          console.log(audio);
        };

        var analysisName = 'audio';
        $rootScope.$on(analysisName + 'TrackAdded', function(event, track) {
          track.addEventListener('cuechange', showFrameAudioViz);
        });
      },
    };
  },]);
