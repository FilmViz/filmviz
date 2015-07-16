var colorVisualizer = (function() {
  var sortColors = function(hexColors) {
    // Adapted from http://www.runtime-era.com/2011/11/grouping-html-hex-colors-by-hue-in.html
    var hsvColors = [];

    for (var c = 0; c < hexColors.length; c++) {
      var hex = hexColors[c].substring(1);
       
      var r = parseInt(hex.substring(0,2),16)/255;
      var g = parseInt(hex.substring(2,4),16)/255;
      var b = parseInt(hex.substring(4,6),16)/255;

      var max = Math.max.apply(Math, [r,g,b]);
      var min = Math.min.apply(Math, [r,g,b]);

      var chr = max-min;
      var hue = 0;
      var val = max;
      var sat = 0;

      if (val > 0) {
        sat = chr/val;
        if (sat > 0) {
          if (r == max) { 
            hue = 60*(((g-min)-(b-min))/chr);
            if (hue < 0) {hue += 360;}
          } else if (g == max) { 
            hue = 120+60*(((b-min)-(r-min))/chr); 
          } else if (b == max) { 
            hue = 240+60*(((r-min)-(g-min))/chr); 
          }
        }
      }
       
      hsvColors.push({ hex: hex, hue: hue, sat: sat, val: val });
    }
 
    hsvColors.sort(function(a,b){return a.val - b.val;});

    return hsvColors.map(function(hsvColor) {
      return '#' + hsvColor.hex;
    });
  }
  
  return {
    showTimeline: function(colors, targetElt) {
      var patchSize = 40,
          patchesPerCol = d3.max(colors, function(d) { return d.colors.length; }),
          width = patchSize * colors.length,
          height = patchSize * patchesPerCol;

      var svg = d3.select(targetElt).select('svg');

      if (svg.empty()) {
        svg = d3.select(targetElt)
          .append('svg')
            .attr('height', '100%')
            .attr('preserveAspectRatio','xMinYMin');
      }

      svg.attr('viewBox','0 0 ' + width + ' ' + height);

      var scale = d3.scale.ordinal()
        .domain(d3.range(0, patchesPerCol))
        .rangeBands([0, height]);

      var patchCol = svg.selectAll('g')
          .data(colors);

      patchCol.enter().append('g')
        .attr('transform', function(d, i) {
          return 'translate(' + i * scale.rangeBand() + ', 0)';
        })
        .style('opacity', 0);

      patchCol.transition()
        .style('fill', function(d) { return d; })
        .style('opacity', 1);

      patchCol.exit().transition()
        .style('opacity', 0)
        .remove();

      var patch = patchCol.selectAll('rect')
        .data(function(d) { return sortColors(d.colors); });

      patch.enter().append('rect')
        .attr('width', scale.rangeBand())
        .attr('height', scale.rangeBand())
        .attr('y', function(d, i) { return scale(i); })
        .style('fill', function(d) { return d; });
    },

    showPatchRow: function(colors, targetElt) {
      var patchSize = 40,
          width = patchSize * colors.length,
          height = patchSize
          leftPatches = [],
          rightPatches = [];

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

      var patch = svg.selectAll('rect')
        .data(sortColors(colors));

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
      var patchSize = 40,
          width = patchSize * colors.length,
          height = patchSize
          leftPatches = [],
          rightPatches = [];

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

      var patch = svg.selectAll('g')
        .data(sortColors(colors));
          
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
}());