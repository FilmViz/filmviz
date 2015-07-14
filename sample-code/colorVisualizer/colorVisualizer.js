var colorVisualizer = (function() {
  var init = function(colors, targetElt) {
    var patchSize = 40,
        width = patchSize * colors.length,
        height = patchSize;

    var svg = d3.select(targetElt).select('svg');

    if (svg.empty()) {
      svg = d3.select(targetElt)
        .append('svg')
          .attr('width', '100%')
          .attr('preserveAspectRatio','xMinYMin');
    }

    svg.attr('viewBox','0 0 ' + width + ' ' + height);

    var scale = d3.scale.ordinal()
      .domain(d3.range(0, colors.length))
      .rangeBands([0, width]);

    return {svg: svg, scale: scale};
  }
  
  return {
    showPatchRow: function(colors, targetElt) {
      var param = init(colors, targetElt),
          svg = param.svg,
          scale = param.scale,
          patch = svg.selectAll('rect').data(colors);

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
    },

    showAccordionPatchRow: function(colors, targetElt) {
      var param = init(colors, targetElt),
          svg = param.svg,
          scale = param.scale,
          patch = svg.selectAll('g').data(colors),
          leftPatches = [],
          rightPatches = [];

      var patchEnter = patch.enter().append('g')
        .style('opacity', 0)
        .attr('transform', function(d, i) {
          return 'translate(' + scale(i) + ', 0)';
        });

      patchEnter.append('rect')
        .attr('width', scale.rangeBand())
        .attr('height', scale.rangeBand());

      patchEnter.append('text')
        .attr('dx', 0)
        .attr('dy', scale.rangeBand() * 3 / 5)
        .attr('font-family', 'sans-serif')
        .attr('font-size', '12')
        .style('fill', 'white')
        .style('opacity', 0);

      patch.select('rect')
        .transition()
        .style('fill', function(d) { return d; });

      patch.select('text')
        .text(function(d) { return d; });

      patch.transition()
        .style('opacity', 1);

      patch.exit()
          .style('opacity', 0)
          .remove();

      patch.on('mouseover', function(d, i) {
        leftPatches = patch.select('rect')[0].slice(0, i);
        rightPatches = patch.select('rect')[0].slice(i + 1);

        if (leftPatches.length === 0) {
          d3.selectAll(rightPatches)
            .transition().ease('cubic-in-out')
            .attr('transform', 'translate(' + scale.rangeBand() + ', 0)');

          d3.select(this).select('rect')
            .transition().ease('cubic-in-out')
            .attr('width', scale.rangeBand() * 4);

          d3.select(this).select('text')
            .attr('dx', scale.rangeBand() / 2);
        } else if (rightPatches.length === 0) {
          d3.selectAll(leftPatches)
            .transition().ease('cubic-in-out')
            .attr('transform', 'translate(' + -scale.rangeBand() + ', 0)');

          d3.select(this).select('rect')
            .transition().ease('cubic-in-out')
            .attr('width', scale.rangeBand() * 4)
            .attr('transform', 'translate(' + -scale.rangeBand() + ', 0)');

          d3.select(this).select('text')
            .attr('dx', -scale.rangeBand() / 2);
        } else {
          d3.selectAll(leftPatches)
            .transition().ease('cubic-in-out')
            .attr('transform', 'translate(' + -scale.rangeBand() / 2 + ', 0)');

          d3.selectAll(rightPatches)
            .transition().ease('cubic-in-out')
            .attr('transform', 'translate(' + scale.rangeBand() / 2 + ', 0)');

          d3.select(this).select('rect')
            .transition().ease('cubic-in-out')
            .attr('width', scale.rangeBand() * 2)
            .attr('transform', 'translate(' + -scale.rangeBand() / 2 + ', 0)');
        }

        patch.select('text')
          .text(function(d) { return d; });

        d3.select(this).select('text')
          .transition()
          .style('opacity', 1);
      });

      patch.on('mouseout', function(d, i) {
        leftPatches = patch.select('rect')[0].slice(0, i);
        rightPatches = patch.select('rect')[0].slice(i + 1);

        d3.selectAll(leftPatches)
        .transition().ease('cubic-in-out')
          .attr('transform', 'translate(0, 0)');

        d3.selectAll(rightPatches)
        .transition().ease('cubic-in-out')
          .attr('transform', 'translate(0, 0)');

        d3.select(this).select('rect')
        .transition().ease('cubic-in-out')
          .attr('width', scale.rangeBand())
          .attr('transform', 'translate(0, 0)');

        d3.select(this).select('text')
          .transition()
          .style('opacity', 0);
      });
    }
  }
})();