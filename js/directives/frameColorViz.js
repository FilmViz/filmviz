(function() {
  angular.module('filmVizApp')
    .directive('frameColorViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/frameColorViz.html',
        link: function(scope, element, attributes) {
        setTimeout(function() {
          console.log('Attaching!');

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
          
          var width = d3.select('div.frame-viz').node().offsetWidth;
          var height = d3.select('div.frame-viz').node().offsetHeight;
          var svg = d3.select('#frame-color-viz')
            .attr('preserveAspectRatio', 'none')
            .attr('viewBox', '0 0 ' + width + ' ' + height);

          var scale = d3.scale.ordinal()
            .rangeBands([0, width]);

          var video = document.getElementById('video');
          var track = video.textTracks[0];

          scope.updateColorViz = function(sortingMode) {
            svg.selectAll('rect')
              .sort(function(a, b) { return sortColors(a, b, sortingMode); })
              .transition().duration(500)
              .attr('x', function(d, i) { return scale(i); });
          };

          track.addEventListener('cuechange', function() {
            var colors = JSON.parse(track.activeCues[0].text).colors;

            scale.domain(d3.range(0, colors.length));

            var patch = svg.selectAll('rect')
              .data(colors);

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
          });
          }, 10000);
        }
      };
    });
}());
