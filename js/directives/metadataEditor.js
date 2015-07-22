(function() {
  angular.module('filmVizApp')
    .directive('metadataEditor', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/metadataEditor.html',
        link: function (scope, element, attributes) {
          
          var video = document.getElementById("video");
          var canvas = document.getElementById("canvas");
          var data = [];
          var cueIndex = 1;

          scope.InTc = function () {
            var cueIn = document.getElementById("cueIn");
            cueIn.value = timecodeUtils.milisToTimecode(Math.round(video.currentTime * 1000));

            var cueOut = document.getElementById("cueOut");
            var cueDuration = document.getElementById("cueDuration");

            cueDuration.value = timecodeUtils.calcCueDuration(cueIn.value, cueOut.value);
          };

          scope.OutTc = function () {
            var cueOut = document.getElementById("cueOut");
            cueOut.value = timecodeUtils.milisToTimecode(Math.round(video.currentTime * 1000));

            var cueIn = document.getElementById("cueIn");
            var cueDuration = document.getElementById("cueDuration");

            cueDuration.value = timecodeUtils.calcCueDuration(cueIn.value, cueOut.value);
          };

          scope.NextCue = function () {
            cueIndex += 1;
            if (cueIndex > colorVtt.length) {
              cueIndex = colorVtt.length;
            }
            colorVtt.forEach(function (vtt) {
              if (vtt.index == cueIndex) {
                var cueIn = document.getElementById("cueIn");
                cueIn.value = vtt["tc"];
                //
                jotacueri("textarea").value = JSON.stringify(vtt["value"]);
                video.currentTime = timecodeUtils.timecodeToMilis(vtt["tc"]) / 1000;
              }
            });
          };

          scope.PreviousCue = function () {
            cueIndex -= 1;
            if (cueIndex < 1) {
              cueIndex = 1;
            }
            colorVtt.forEach(function (vtt) {
              if (vtt.index == cueIndex) {
                var cueIn = document.getElementById("cueIn");
                cueIn.value = vtt["tc"];
                //
                jotacueri("textarea").value = vtt["index"] + "\n" + JSON.stringify(vtt["value"]);
                video.currentTime = timecodeUtils.timecodeToMilis(vtt["tc"]) / 1000;
              }
            });
          };

          scope.colorAnalysis = function () {

            var analysisIndex = document.getElementById("activeAnalysis").innerHTML;
            analysisIndex = parseInt(analysisIndex);
            colorAnalyzer.basicAnalyzer(video, canvas, project, analysisIndex);
          };


          //scope.seekedListener = function () {
          //
          //};

          //video.addEventListener('seeked', seekedListener, false);

        }
      };
    });
}());