var colorVisualizer = (function() {
  return {
    showPatches: function (colors, targetElt) {
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

      var patches = svg.selectAll('rect')
        .data(colors);

      patches.enter()
        .append('rect')
          .style('opacity', 0)
          .attr('width', patchSize)
          .attr('height', patchSize)
          .attr('x', function(d, i) {
            return patchSize * i;
          })
          .transition();

      patches
        .transition()
        .style('fill', function(d) {
          return d;
        })
        .style('opacity', 1);

      patches.exit()
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

      var leftPatches = [];
      var rightPatches = [];

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

      var patches = svg.selectAll("rect")
        .data(colors);

      patches
        .enter().append("rect")
          .style('opacity', 0)
          .attr("width", xScale.rangeBand())
          .attr("height", patchSize)
          .attr("x", function(d, i) {
            return xScale(i);
          })
          .transition();

      patches
        .transition()
        .style("fill", function(d) {
            return d;
        }).
        style('opacity', 1);

      patches.exit()
        .transition()
        .style('opacity', 0)
        .remove();

      patches.on("mouseover", function(d, i) {
        leftPatches = patches[0].slice(0, i);
        rightPatches = patches[0].slice(i + 1);

        d3.selectAll(leftPatches)
        .transition().ease("cubic-in-out")
          .attr("transform", "translate(" + -xScale.rangeBand() + ", 0)");

        d3.selectAll(rightPatches)
        .transition().ease("cubic-in-out")
          .attr("transform", "translate(" + xScale.rangeBand() + ", 0)");

        d3.select(this)
          .transition().ease("cubic-in-out")
          .attr("width", xScale.rangeBand() * 4)
          .attr("transform", "translate(" + -xScale.rangeBand() + ", 0)");
      });

      patches.on("mouseout", function(d, i) {
        leftPatches = patches[0].slice(0, i);
        rightPatches = patches[0].slice(i + 1);

        d3.selectAll(leftPatches)
        .transition().ease("cubic-in-out")
          .attr("transform", "translate(0, 0)");

        d3.selectAll(rightPatches)
        .transition().ease("cubic-in-out")
          .attr("transform", "translate(0, 0)");

        d3.select(this)
        .transition().ease("cubic-in-out")
          .attr("transform", "translate(0, 0)")
          .attr("width", xScale.rangeBand());
      });
    }
  }
})();