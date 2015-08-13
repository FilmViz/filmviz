angular.module('filmViz')
  .directive('frameColorViz', ['Color', '$rootScope', function(Color, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'scripts/visualizations/frame-viz/frameVizColor.html',
      link: function(scope, element, attributes) {
        var showFrameColorViz = function() {
          var video = document.getElementById('video-main');
          var track = video.textTracks[0];
          var colors = JSON.parse(track.activeCues[0].text);

          var width = d3.select('div.frame-viz').node().offsetWidth;
          var svg = d3.select('#frame-color-viz');

          var scale = d3.scale.ordinal()
            .rangeBands([0, width])
            .domain(d3.range(0, 16));

          var patch = svg.selectAll('rect')
            .data(colors);

          patch.enter().append('rect')
            .attr('width', scale.rangeBand())
            .attr('height', scale.rangeBand())
            .attr('x', function(d, i) { return scale(i); })
            .style('opacity', 0);

          patch.transition()
            .style('fill', function(d) { return d; })
            .style('stroke', function(d) { return d; })
            .style('opacity', 1);

          patch.exit().transition()
            .style('opacity', 0)
            .remove();
        };

        var analysisName = 'color';
        $rootScope.$on(analysisName + 'TrackAdded', function(event, track) {
          track.addEventListener('cuechange', showFrameColorViz);
        });

        // var video = document.getElementById('video-main');
        // var track = video.textTracks[0];
        // var colors = JSON.parse(track.activeCues[0].text).colors;

        var width = d3.select('div.frame-viz').node().offsetWidth;
        var height = d3.select('div.frame-viz').node().offsetHeight;
        var svg = d3.select('#frame-color-viz')
          .attr('preserveAspectRatio', 'none')
          .attr('viewBox', '0 0 ' + width + ' ' + height);

        scope.updateColorViz = function(sortingMode) {
          var video = document.getElementById('video-main');
          var track = video.textTracks[0];
          var colors = JSON.parse(track.activeCues[0].text).colors;

          var width = d3.select('div.frame-viz').node().offsetWidth;
          var svg = d3.select('#frame-color-viz');

          var scale = d3.scale.ordinal()
            .rangeBands([0, width])
            .domain(d3.range(0, colors.length));

          svg.selectAll('rect')
            .sort(function(a, b) { return Color.sortColors(a, b, sortingMode); })
            .transition().duration(500)
            .attr('x', function(d, i) { return scale(i); });
        };
      },
    };
  },]);
