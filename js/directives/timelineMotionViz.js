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

          var yScale = d3.scale.linear()
            .domain(d3.extent(values, function(d) { return d.content.value; }))
            .range([height, 0]);

          var line = d3.svg.line()
            .x(function(d) { return xScale(d.tcIn); })
            .y(function(d) { return yScale(d.content.value); })

          svg.append('path')
            .datum(values)
            .attr('d', line)
            .style({ 'fill': 'none', 'stroke': '#337ab7', 'stroke-width': '2px' });
        }
      };
    });
}());