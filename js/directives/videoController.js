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

          scope.colorAnalysis = function() {
            analysisIndex = project.selectedAnalysis;
            colorAnalyzer.basicAnalyzer(project, analysisIndex);
          };

          scope.ultra = function() {
            if (!video.paused) {
              console.log(project.analysis[project.selectedAnalysis].name);
              type = project.analysis[project.selectedAnalysis].name;
              scope.data = colorAnalyzer.ultraAnalyzer(project, project.selectedAnalysis, scope.data, type);
              project.analysis[project.selectedAnalysis].data.push(scope.data);
              scope.data = [];
            }
          };

        }

      };
    });
}());
