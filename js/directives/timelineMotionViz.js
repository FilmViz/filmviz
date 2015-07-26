(function() {
  angular.module('filmVizApp')
    .directive('timelineMotionViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/timelineMotionViz.html',
        link: function(scope, element, attributes) {
          var values = project.analysis[2].data;

          var width = 960,
              height = 500;

          var x = d3.scale.linear()
              .range([0, width]);

          var y = d3.scale.linear()
              .range([height, 0]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");

          var line = d3.svg.line()
              .x(function(d) { return x(d.tcIn); })
              .y(function(d) { return y(d.content.value); });

          var svg = d3.select('svg#timeline-motion-viz')
              .attr('width', '100%')
              .attr('height', '200')
              .attr('preserveAspectRatio','none')
              .attr('viewBox', '0 0 ' + width + ' ' + height)
            .append("g")

          values.forEach(function(d) {
            d.tcIn = timecodeUtils.timecodeToMilis(d.tcIn) / 1000;
          });

          x.domain(d3.extent(values, function(d) { return d.tcIn; }));
          y.domain(d3.extent(values, function(d) { return d.content.value; }));

          svg.append("path")
              .datum(values)
              .attr("class", "line")
              .attr("d", line);
        }
      };
    });
}());
