angular.module('filmViz')
  .directive('timelineAudioViz', ['$rootScope', function($rootScope) {
    'use strict';
    return {
      restrict: 'E',
      templateUrl: 'scripts/visualizations/timeline-viz/timelineVizAudio.html',
      link: function(scope, element, attributes) {
        var analysisName = 'motion';
        $rootScope.$on(analysisName + 'AnalysisLoaded', function(event, data) {
          console.log(data);
        });
      },
    };
  },]);
