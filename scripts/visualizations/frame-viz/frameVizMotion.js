angular.module('filmViz')
  .directive('frameMotionViz', ['$rootScope', function($rootScope) {
    'use strict';
    return {
      restrict: 'E',
      templateUrl: 'scripts/visualizations/frame-viz/frameVizMotion.html',
      link: function(scope, element, attributes) {
        var showFrameMotionViz = function() {
          var video = document.getElementById('video-main');
          var track = video.textTracks[2];
          var motion = JSON.parse(track.activeCues[0].text);

          var div = d3.select('#frame-motion-viz');
          if (motion > 0.8) {
            div.style('color', 'red');
          } else {
            div.style('color', '#337ab7');
          }

          div.text(motion.toFixed(3));
        };

        var width = d3.select('div.frame-viz').node().offsetWidth;
        var height = d3.select('div.frame-viz').node().offsetHeight;

        var analysisName = 'motion';
        $rootScope.$on(analysisName + 'TrackAdded', function(event, track) {
          track.addEventListener('cuechange', showFrameMotionViz);
        });

        // d3.select('#frame-motion-viz')
        //   .attr('preserveAspectRatio', 'none')
        //   .attr('viewBox', '0 0 ' + width + ' ' + height);
      },
    };
  },]);
