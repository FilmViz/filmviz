(function() {

  angular.module('filmViz')
    .directive('tabNavigation', ['ProjectData', function(ProjectData) {
      var project = ProjectData;

      return {
        restrict: 'E',
        transclude: true,
        scope: {
          items: '=',
          isDeletable: '=deletable',
        },
        templateUrl: 'scripts/common/tabNavigation.html',
        link: function(scope, element, attributes) {

          scope.activeTab = 0;

          scope.analysis = {};

          scope.selectTab = function(setTab) {
            scope.activeTab = setTab;
            ProjectData.currentAnalysisIndex = setTab;
          };

          scope.isSelected = function(checkTab) {
            return scope.activeTab === checkTab;
          };

          scope.remove = function(setTab) {
            scope.activeTab = setTab;
            var r = confirm('Delete analysis???');
            if (r === true) {
              ProjectData.analysisCollection.splice(scope.activeTab, 1);
              scope.activeTab = ProjectData.analysisCollection.length - 1;
            }
          };

          scope.addAnalysis = function() {
            scope.analysis.name = prompt('Please enter analysis name', 'Metadata');
            if (name != null) {

              keys = [];
              for (var key in ProjectData.analysisCollection) {
                keys.push(ProjectData.analysisCollection[key].name);
              }

              if (!keys.contains(scope.analysis.name)) {
                ProjectData.analysisCollection.push(new ProjectData.Analysis(scope.analysis.name));
                scope.activeTab = ProjectData.analysisCollection.length - 1;
                ProjectData.currentAnalysisIndex = scope.activeTab;
                scope.analysis = {};
              }
            }
          };
        },
      };
    },]);
}());
