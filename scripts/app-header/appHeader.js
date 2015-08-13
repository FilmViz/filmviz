angular.module('filmViz')
  .directive('appHeader', ['ProjectData', 'File', function(ProjectData, File) {
    'use strict';
    return {
      restrict: 'E',
      templateUrl: 'scripts/app-header/appHeader.html',
      link: function(scope, element, attributes) {
        scope.saveProject = function() {
          File.download(ProjectData.createZip(), ProjectData.name + '.zip');
        };
      },
    };
  },]);
