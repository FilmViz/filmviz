(function() {

  angular.module('filmVizApp')
		.directive('videoPlayer', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/templates/videoPlayer.html',
    link: function(scope, element, attributes) {
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');

      (function localFileVideoPlayerInit(win) {
        var URL = win.URL || win.webkitURL;
        var displayMessage = (function displayMessageInit() {
          var node = document.querySelector('#message');
          return function displayMessage(message, isError) {
            node.innerHTML = message;
            node.className = isError ? 'error' : 'info';
          };
        }());

        var playSelectedFile = function playSelectedFileInit(event) {
          var file = this.files[0];
          var type = file.type;
          var videoNode = document.getElementById('video');
          var canPlay = videoNode.canPlayType(type);
          canPlay = (canPlay === '' ? 'no' : canPlay);
          var message = 'Can play type \"' + type + '\": ' + canPlay;
          var isError = canPlay === 'no';
          displayMessage(message, isError);
          if (isError) {
            return;
          }

          var fileURL = URL.createObjectURL(file);
          videoNode.src = fileURL;
        };

        var inputNode = document.querySelector('input');

        if (!URL) {
          displayMessage('Your browser is not '
          + '<a href=\"http://caniuse.com/bloburls\">supported</a>!', true);
          return;
        }

        inputNode.addEventListener('change', playSelectedFile, false);
      }(window));

      scope.play = function() {
        video.play();
      };

      scope.stop = function() {
        video.stop();
      };

      scope.seek = function(second) {
        video.currentTime(second);
      };
    }
  };
		});
}());
