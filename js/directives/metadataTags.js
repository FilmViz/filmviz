(function() {
  angular.module('filmVizApp')
    .directive('metadataTags', function () {
      return {
        restrict: 'E',
        scope: {
          tags: "="
        },
        templateUrl: 'js/directives/templates/metadataTags.html',
        link: function (scope, element, attributes) {
          scope.activeTab = 0;

          scope.data = []

          document.getElementById('video').addEventListener('ended',endHandler,false);
          
          function endHandler(e) {
              // What you want to do after the event
              project.analysis[project.selectedAnalysis].data = scope.data;
              project.analysis[project.selectedAnalysis].isDone = true;
              video.removeEventListener('ended', endHandler, false);
              vtt = fileUtils.createVtt(project);
              fileUtils.download(vtt);
          }

          scope.selectTab = function (tagIndex) {
            scope.activeTab = tagIndex;
            if (!video.paused) {
              console.log(project.analysis[project.selectedAnalysis].name); 
              tag = project.analysis[project.selectedAnalysis].tags[tagIndex];
              type = project.analysis[project.selectedAnalysis].name;
              scope.data = colorAnalyzer.ultraAnalyzer(video, canvas, project, project.selectedAnalysis,scope.data,type,tag);
            }
          };

          scope.isSelected = function (checkTab) {
            return scope.activeTab === checkTab;
          };

          scope.remove = function (tagIndex) {
            scope.activeTab = tagIndex;
            var r = confirm("Delete analysis???");
            if (r == true) {
              project.analysis[project.selectedAnalysis].tags.splice(tagIndex, 1);
            }
          };

          scope.addTag = function (setTab) {
            console.log(activeAnalysis);
            var newTag = prompt("Please enter analysis name", "Metadata");
            if (newTag && !project.analysis[project.selectedAnalysis].tags.contains(newTag)) {
              project.analysis[project.selectedAnalysis].tags.push(newTag);


            }
          };
        }
      };
    });
}());