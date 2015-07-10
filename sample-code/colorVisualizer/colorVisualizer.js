var colorVisualizer = (function() {
  return {
    showPatch: function (colors, targetElt) {
      var patchSize = 40,
        width = patchSize * colors.length,
        height = patchSize,
        svg = document.querySelector(targetElt + ' svg');

      if (!svg) {
        svg = d3.select(targetElt)
          .append('svg')
          .attr('width', '100%')
          .attr('viewBox','0 0 ' + width + ' ' + height)
          .attr('preserveAspectRatio','xMinYMin');
      } else {
        svg = d3.select(targetElt).select('svg')
          .attr('viewBox','0 0 ' + width + ' ' + height);
      }

      var patch = svg.selectAll('rect')
        .data(colors);

      patch.enter()
        .append('rect')
          .style('opacity', 0)
          .attr('width', patchSize)
          .attr('height', patchSize)
          .attr('x', function(d, i) {
            return patchSize * i;
          })
          .transition();

      patch
        .transition()
        .style('fill', function(d) {
          return d;
        })
        .style('opacity', 1);

      patch.exit()
        .transition()
        .style('opacity', 0)
        .remove();
    },

    showAccordion: function (colors, targetElt) {
      var patchSize = 40,
        width = patchSize * colors.length,
        height = patchSize
        padding = 0,
        svg = document.querySelector(targetElt + ' svg');

      var leftPatch = [];
      var rightPatch = [];

      var xScale = d3.scale.ordinal()
                  .domain(d3.range(0, colors.length))
                  .rangeBands([0, width], padding);

      if (!svg) {
        svg = d3.select(targetElt)
          .append('svg')
          .attr('width', '100%')
          .attr('viewBox','0 0 ' + width + ' ' + height)
          .attr('preserveAspectRatio','xMinYMin');
      } else {
        svg = d3.select(targetElt).select('svg')
          .attr('viewBox','0 0 ' + width + ' ' + height);
      }

      var patch = svg.selectAll('g')
        .data(colors);

      var patchEnter = patch
        .enter()
        .append('g')
          .style('opacity', 0)
          .attr('transform', function (d, i) {
            return 'translate(' + xScale(i) + ', 0)';
          });

      patchEnter
        .append('rect')
          .attr('width', xScale.rangeBand())
          .attr('height', patchSize);

      patchEnter
        .append('text')
          .attr('dy', patchSize * 3 / 5)
          .attr('font-family', 'sans-serif')
          .attr('font-size', '12')
          .style('fill', 'white')
          .style('opacity', 0);

      patch
        .select('rect')
          .transition()
          .style('fill', function (d) { return d; });

      patch
        .select('text')
          .text(function (d) { return d; });

      patch
        .transition()
        .style('opacity', 1);

      patch
        .exit()
          .style('opacity', 0)
          .remove();

      patch.on('mouseover', function (d, i) {
        leftPatch = patch.select('rect')[0].slice(0, i);
        rightPatch = patch.select('rect')[0].slice(i + 1);

        d3.selectAll(leftPatch)
        .transition().ease('cubic-in-out')
          .attr('transform', 'translate(' + -xScale.rangeBand() + ', 0)');

        d3.selectAll(rightPatch)
        .transition().ease('cubic-in-out')
          .attr('transform', 'translate(' + xScale.rangeBand() + ', 0)');

        d3.select(this).select('rect')
          .transition().ease('cubic-in-out')
          .attr('width', xScale.rangeBand() * 4)
          .attr('transform', 'translate(' + -xScale.rangeBand() + ', 0)');

        d3.select(this).select('text')
          .transition()
          .style('opacity', 1);
      });

      patch.on('mouseout', function (d, i) {
        leftPatch = patch.select('rect')[0].slice(0, i);
        rightPatch = patch.select('rect')[0].slice(i + 1);

        d3.selectAll(leftPatch)
        .transition().ease('cubic-in-out')
          .attr('transform', 'translate(0, 0)');

        d3.selectAll(rightPatch)
        .transition().ease('cubic-in-out')
          .attr('transform', 'translate(0, 0)');

        d3.select(this).select('rect')
        .transition().ease('cubic-in-out')
          .attr('transform', 'translate(0, 0)')
          .attr('width', xScale.rangeBand());

        d3.select(this).select('text')
          .transition()
          .style('opacity', 0);
      });
    }
  }
})();