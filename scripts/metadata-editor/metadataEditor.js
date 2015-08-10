(function() {

  angular.module('filmViz')
    .directive('metadataEditor', function() {
      return {
        restrict: 'E',
        templateUrl: 'scripts/metadata-editor/metadataEditor.html',
        link: function(scope, element, attributes) {

          var video = document.getElementById('video-main');
          var canvas = document.getElementById('canvas');
          var data = [];
          var cueIndex = 1;

          scope.InTc = function() {
            var cueIn = document.getElementById('cueIn');
            cueIn.value = timecodeUtils.milisToTimecode(Math.round(video.currentTime * 1000));

            var cueOut = document.getElementById('cueOut');
            var cueDuration = document.getElementById('cueDuration');

            cueDuration.value = timecodeUtils.calcCueDuration(cueIn.value, cueOut.value);
          };

          scope.OutTc = function() {
            var cueOut = document.getElementById('cueOut');
            cueOut.value = timecodeUtils.milisToTimecode(Math.round(video.currentTime * 1000));

            var cueIn = document.getElementById('cueIn');
            var cueDuration = document.getElementById('cueDuration');

            cueDuration.value = timecodeUtils.calcCueDuration(cueIn.value, cueOut.value);
          };

          scope.NextCue = function() {
            cueIndex += 1;
            if (cueIndex > colorVtt.length) {
              cueIndex = colorVtt.length;
            }

            colorVtt.forEach(function(vtt) {
              if (vtt.index == cueIndex) {
                var cueIn = document.getElementById('cueIn');
                cueIn.value = vtt.tc;

                //
                document.querySelector('textarea').value = angular.toJson(vtt.value);
                video.currentTime = timecodeUtils.timecodeToMilis(vtt.tc) / 1000;
              }
            });
          };

          scope.PreviousCue = function() {
            cueIndex -= 1;
            if (cueIndex < 1) {
              cueIndex = 1;
            }

            colorVtt.forEach(function(vtt) {
              if (vtt.index == cueIndex) {
                var cueIn = document.getElementById('cueIn');
                cueIn.value = vtt.tc;

                //
                document.querySelector('textarea').value = vtt.index + '\n' + angular.toJson(vtt.value);
                video.currentTime = timecodeUtils.timecodeToMilis(vtt.tc) / 1000;
              }
            });
          };

        },
      };
    });
}());
