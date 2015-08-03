angular.module('filmViz')
  .directive('appHeader', ['fileUtils', 'ProjectData', function(fileUtils, ProjectData) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app-header/appHeader.html',
      link: function(scope, element, attributes) {
        scope.saveProject = function() {
          fileUtils.download(fileUtils.createZip(ProjectData), ProjectData.name + '.zip')
        };
      },
    };
  },]);
