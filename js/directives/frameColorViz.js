(function() {
  angular.module('filmVizApp')
    .directive('frameColorViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/frameColorViz.html',
        link: function(scope, element, attributes) {
        setTimeout(function() {
          console.log('Attaching!');
          var width = d3.select('div.frame-viz').node().offsetWidth;
          var height = d3.select('div.frame-viz').node().offsetHeight;
          var svg = d3.select('#frame-color-viz')
            .attr('preserveAspectRatio', 'none')
            .attr('viewBox', '0 0 ' + width + ' ' + height);

          var scale = d3.scale.ordinal()
            .rangeBands([0, width]);

          var video = document.getElementById('video');
          var track = video.textTracks[0];

          track.addEventListener('cuechange', function() {
            var colors = JSON.parse(track.activeCues[0].text).colors;

            scale.domain(d3.range(0, colors.length));

            var patch = svg.selectAll('rect')
              .data(colors);

            patch.enter().append('rect')
              .attr('width', scale.rangeBand())
              .attr('height', scale.rangeBand())
              .attr('x', function(d, i) { return scale(i); })
              .style('opacity', 0);

            patch.transition()
              .style('fill', function(d) { return d; })
              .style('opacity', 1);

            patch.exit().transition()
              .style('opacity', 0)
              .remove();
          });
          }, 50000);
        }
      };
    });
}());
