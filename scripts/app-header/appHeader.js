angular.module('filmViz')
  .directive('appHeader', ['ProjectData', function(ProjectData) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/app-header/appHeader.html',
      link: function(scope, element, attributes) {

        scope.saveProject = function() {
          fileUtils.download(ProjectData.createZip(), ProjectData.name + '.zip');

        };
      },
    };
  },]);
