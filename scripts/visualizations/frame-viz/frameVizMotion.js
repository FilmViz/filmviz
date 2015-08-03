(function() {
  angular.module('filmViz')
    .directive('frameMotionViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'scripts/visualizations/frame-viz/frameVizMotion.html',
        link: function(scope, element, attributes) {
          var width = d3.select('div.frame-viz').node().offsetWidth;
          var height = d3.select('div.frame-viz').node().offsetHeight;

          // d3.select('#frame-motion-viz')
          //   .attr('preserveAspectRatio', 'none')
          //   .attr('viewBox', '0 0 ' + width + ' ' + height);
        },
      };
    });
}());

var showFrameMotionViz = function() {
  var video = document.getElementById('video');
  var track = video.textTracks[2];
  var motion = JSON.parse(track.activeCues[0].text).motion;

  var div = d3.select('#frame-motion-viz');
  if (motion > 0.8) {
    div.style('color', 'red');
  } else {
    div.style('color', '#337ab7');
  }
  div.text(motion.toFixed(3));
}
