(function() {
  angular.module('filmVizApp')
    .directive('timelineColorViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/timelineColorViz.html',
        link: function(scope, element, attributes) {
          // Function adapted from
          // www.runtime-era.com/2011/11/grouping-html-hex-colors-by-hue-in.html
          var sortColors = function(a, b, sortingMode) {
            var hexColors = [a, b];
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
         
            switch(sortingMode) {
              case 'hue':
                return (hsvColors[0].hue - hsvColors[1].hue);
              case 'sat':
                return (hsvColors[0].sat - hsvColors[1].sat);
              case 'val':
                return (hsvColors[0].val - hsvColors[1].val);
            }
          };

          scope.updateColorViz = function(sortingMode) {
            patch.sort(function(a, b) { return sortColors(a, b, sortingMode); })
              .transition().duration(500)
              .attr('y', function(d, i) { return yScale(i); });
          };

          var colors = project.analysis[0].data;

          var width = d3.select('div.timeline-viz').node().offsetWidth;
          var height = d3.select('div.timeline-viz').node().offsetHeight;

          var svg = d3.select('svg#timeline-color-viz')
            .attr('preserveAspectRatio','none')
            .attr('viewBox', '0 0 ' + width + ' ' + height);
          
          var patchesPerCol = d3.max(colors, function(d) {
            return d.content.colors.length;
          });

          var xScale = d3.scale.ordinal()
            .domain(d3.range(0, colors.length))
            .rangeBands([0, width]);
          
          var yScale = d3.scale.ordinal()
            .domain(d3.range(0, patchesPerCol))
            .rangeBands([0, height]);

          var patchCol = svg.selectAll('g')
            .data(colors);

          patchCol.enter().append('g')
            .attr('transform', function(d, i) {
              return 'translate(' + i * xScale.rangeBand() + ', 0)';
            });

          var patch = patchCol.selectAll('rect')
            .data(function(d) { return d.content.colors; });

          patch.enter().append('rect')
            .attr('width', xScale.rangeBand())
            .attr('height', yScale.rangeBand())
            .style('fill', function(d) { return d; })
            .style('stroke', function(d) { return d; });

          scope.updateColorViz('hue');
        }
      };
    });
}());
