(function() {

  angular.module('filmVizApp')
    .directive('metadataContent', function() {
      return {
    restrict: 'E',
    templateUrl: 'js/directives/templates/metadataContent.html',
    link: function(scope, element, attributes) {
      var video = document.getElementById('video');
      var data = document.getElementById('data');

      video.addEventListener('loadedmetadata', function() {
        var track = video.textTracks[0];

        //track.mode = 'hidden';

        track.oncuechange = function() {
          // "this" is a textTrack
          var cue = this.activeCues[0]; // there is only one active cue in this example
          if (typeof cue === 'undefined') {
            return;
          }

          if (typeof cue.text === 'string') {
            console.log(cue.text);
          }

          if (typeof cue.text === 'object') {
            var content = JSON.parse(cue.text);
            if (content.colors) {
              console.log(content.colors);
              data.innerHTML = content.colors;
            } else if (content.audio) {
              console.log(content.audio);
              data.innerHTML = content.audio;
            } else if (content.motion) {
              console.log(content.motion);
              data.innerHTML = content.motion;
            }
          }

        }

      }());
    }
  };
    });
}());
