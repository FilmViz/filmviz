(function() {
  angular.module('filmViz')
    .directive('timelineMotionViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'scripts/visualizations/timeline-viz/timelineVizMotion.html',
        link: function(scope, element, attributes) {
        },
      };
    });
}());

var showTimelineMotionViz = function(data) {

  var width = d3.select('div.timeline-viz').node().offsetWidth;
  var height = d3.select('div.timeline-viz').node().offsetHeight;

  var svg = d3.select('svg#timeline-motion-viz')
    .attr('preserveAspectRatio', 'none')
    .attr('viewBox', '0 0 ' + width + ' ' + height);

  var xScale = d3.scale.linear()
    .domain(d3.extent(data, function(d) { return d.startTime; }))
    .range([0, width]);

  var yScale = d3.scale.pow().exponent(1.5)
    .domain(d3.extent(data, function(d) { return d.content; }))
    .range([height, 0]);

  var area = d3.svg.area()
    .x(function(d) { return xScale(d.startTime); })
    .y0(height)
    .y1(function(d) { return yScale(d.content); })
    .interpolate('cardinal');

  svg.append('path')
    .datum(data)
    .attr('d', area)
    .style('fill', '#337ab7');
};
