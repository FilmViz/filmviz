(function() {
  angular.module('filmViz')
    .directive('timelineColorViz', ['Color', function(Color) {
      return {
        restrict: 'E',
        templateUrl: 'scripts/visualizations/timeline-viz/timelineVizColor.html',
        link: function(scope, element, attributes) {

          // scope.updateColorViz = function(sortingMode) {
          //   var colors = project.analysis[0].data;
          //   var patch = d3.select('svg#timeline-color-viz')
          //     .selectAll('g').selectAll('rect');
          //   var height = d3.select('div.timeline-viz').node().offsetHeight;
          //   var patchesPerCol = d3.max(colors, function(d) {
          //     return d.content.colors.length;
          //   });

          //   var yScale = d3.scale.ordinal()
          //     .domain(d3.range(0, patchesPerCol))
          //     .rangeBands([0, height]);

          //   patch.sort(function(a, b) { return Color.sortColors(a, b, sortingMode); })
          //     .transition().duration(500)
          //     .attr('y', function(d, i) { return yScale(i); });
          // };
        },
      };
    },]);
}());

var showTimelineColorViz = function(data) {

  var width = d3.select('div.timeline-viz').node().offsetWidth;
  var height = d3.select('div.timeline-viz').node().offsetHeight;

  var svg = d3.select('svg#timeline-color-viz')
    .attr('preserveAspectRatio', 'none')
    .attr('viewBox', '0 0 ' + width + ' ' + height);

  var patchesPerCol = d3.max(data, function(d) {
    return d.content.length;
  });

  var xScale = d3.scale.ordinal()
    .domain(d3.range(0, data.length))
    .rangeBands([0, width]);

  var yScale = d3.scale.ordinal()
    .domain(d3.range(0, patchesPerCol))
    .rangeBands([0, height]);

  var patchCol = svg.selectAll('g')
    .data(data);

  patchCol.enter().append('g')
    .attr('transform', function(d, i) {
      return 'translate(' + i * xScale.rangeBand() + ', 0)';
    });

  var patch = patchCol.selectAll('rect')
    .data(function(d) {
      return d.content;
    });

  //.sort(function(a, b) { return Color.sortColors(a, b, 'hue'); });

  patch.enter().append('rect')
    .attr('width', xScale.rangeBand())
    .attr('height', yScale.rangeBand())
    .attr('y', function(d, i) { return yScale(i); })
    .style('fill', function(d) { return d; })
    .style('stroke', function(d) { return d; });

  patchCol.on('click', function(d, i) {
    console.log(d.startTime);
    document.getElementById('video')
      .currentTime = timecodeUtils.timecodeToMilis(d.startTime) / 1000;
  });
};
