(function() {
  angular.module('filmVizApp')
    .directive('timelineMotionViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/timelineMotionViz.html',
        link: function(scope, element, attributes) {
          var values = project.analysis[2].data;

          values.forEach(function(d) {
            d.tcIn = timecodeUtils.timecodeToMilis(d.tcIn);
          });

          var width = d3.select('svg#timeline-color-viz').node().offsetWidth;
          var height = d3.select('svg#timeline-color-viz').node().offsetHeight;

          var svg = d3.select('svg#timeline-motion-viz')
            .attr('preserveAspectRatio','none')
            .attr('viewBox', '0 0 ' + width + ' ' + height);

          var xScale = d3.scale.linear()
            .domain(d3.extent(values, function(d) { return d.tcIn; }))
            .range([0, width]);

          var yScale = d3.scale.pow().exponent(1.5)
            .domain(d3.extent(values, function(d) { return d.content.value; }))
            .range([height, 0]);

          var area = d3.svg.area()
            .x(function(d) { return xScale(d.tcIn); })
            .y0(height)
            .y1(function(d) { return yScale(d.content.value); })
            .interpolate('cardinal');

          svg.append('path')
            .datum(values)
            .attr('d', area)
            .style('fill', '#337ab7');
        }
      };
    });
}());
