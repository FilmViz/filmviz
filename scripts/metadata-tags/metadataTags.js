(function() {

  angular.module('filmViz')
    .directive('metadataTags', function() {
      return {
        restrict: 'E',
        scope: {
          tags: '=',
        },
        templateUrl: 'scripts/metadata-tags/metadataTags.html',
        link: function(scope, element, attributes) {
          scope.activeTab = 0;

          scope.data = [];

          scope.isPaused = function() {
            return video.paused;
          };

          scope.selectTab = function(tagIndex) {
            scope.activeTab = tagIndex;
            if (!video.paused) {
              tag = project.analysis[project.selectedAnalysis].tags[tagIndex];
              type = project.analysis[project.selectedAnalysis].name;
              console.log(type, tag);
              scope.data = colorAnalyzer.ultraAnalyzer(project, project.selectedAnalysis, scope.data, type, tag);
              project.analysis[project.selectedAnalysis].data.push(scope.data);
              scope.data = [];
            }
          };

          scope.isSelected = function(checkTab) {
            return scope.activeTab === checkTab;
          };

          scope.remove = function(tagIndex) {
            scope.activeTab = tagIndex;
            var r = confirm('Delete analysis???');
            if (r == true) {
              project.analysis[project.selectedAnalysis].tags.splice(tagIndex, 1);
            }
          };

          scope.addTag = function(setTab) {
            console.log(project.selectedAnalysis);
            var newTag = prompt('Please enter analysis name", "Metadata');
            if (newTag && !project.analysis[project.selectedAnalysis].tags.indexOf(newTag) !== -1) {
              project.analysis[project.selectedAnalysis].tags.push(newTag);

            }
          };
        },
      };
    });
}());
