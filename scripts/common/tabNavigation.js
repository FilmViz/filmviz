angular.module('filmViz')
  .directive('tabNavigation', ['ProjectData', function(ProjectData) {
    'use strict';
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

        var currentAnalysisName = '';

        scope.selectTab = function(setTab) {
          scope.activeTab = setTab;
        };

        scope.isSelected = function(checkTab) {
          return scope.activeTab === checkTab;
        };

        scope.remove = function(setTab) {
          scope.activeTab = setTab;
          var r = confirm('Delete analysis???');
          if (r === true) {
            ProjectData.analysisCollection.splice(scope.activeTab, 1);
            scope.activeTab = Object.keys(ProjectData.analysisCollection).length - 1;
          }
        };

        scope.addAnalysis = function() {
          currentAnalysisName = prompt('Please enter analysis name', 'Metadata');
          if (name != null) {

            var keys = [];
            for (var key in ProjectData.analysisCollection) {
              keys.push(ProjectData.analysisCollection[key].name);
            }

            if (!keys.indexOf(currentAnalysisName) !== -1) {
              ProjectData.createAnalysis(currentAnalysisName);
              scope.activeTab = currentAnalysisName;
              ProjectData.currentAnalysisName = scope.activeTab;
            }
          }
        };
      },
    };
  },]);
