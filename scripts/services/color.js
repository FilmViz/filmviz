angular.module('filmViz')
  .service('Color', ['RgbQuantLib', function(RgbQuantLib) {
    this.capturePalette = function(imgSrc, colors) {
      // Create a new image every time due to async issues
      var img = new Image();
      img.src = imgSrc;

      var opts = {
        colors: colors,
        minHueCols: 256, // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
      };
      var quant = new RgbQuantLib(opts);

      // Analyze histograms and build palette
      quant.sample(img);
      var palette = quant.palette(true, false);

      return convertPalette(palette);
    };

    // Function adapted from
    // www.runtime-era.com/2011/11/grouping-html-hex-colors-by-hue-in.html
    this.sortColors = function(a, b, sortingMode) {
      var hexColors = [a, b];
      var hsvColors = [];

      for (var c = 0; c < hexColors.length; c++) {
        var hex = hexColors[c].substring(1);

        var r = parseInt(hex.substring(0, 2), 16) / 255;
        var g = parseInt(hex.substring(2, 4), 16) / 255;
        var b = parseInt(hex.substring(4, 6), 16) / 255;

        var max = Math.max.apply(Math, [r, g, b]);
        var min = Math.min.apply(Math, [r, g, b]);

        var chr = max - min;
        var hue = 0;
        var val = max;
        var sat = 0;

        if (val > 0) {
          sat = chr / val;
          if (sat > 0) {
            if (r == max) {
              hue = 60 * (((g - min) - (b - min)) / chr);
              if (hue < 0) {hue += 360;}
            } else if (g == max) {
              hue = 120 + 60 * (((b - min) - (r - min)) / chr);
            } else if (b == max) {
              hue = 240 + 60 * (((r - min) - (g - min)) / chr);
            }
          }
        }

        hsvColors.push({ hex: hex, hue: hue, sat: sat, val: val });
      }

      switch (sortingMode) {
        case 'hue':
          return (hsvColors[0].hue - hsvColors[1].hue);
        case 'sat':
          return (hsvColors[0].sat - hsvColors[1].sat);
        case 'val':
          return (hsvColors[0].val - hsvColors[1].val);
      }
    };

    var convertPalette = function(palette) {
      return palette.map(function(value) {
        return rgbToHex(value);
      });
    };

    var componentToHex = function(component) {
      var hex = component.toString(16);
      return (hex.length === 1) ? '0' + hex : hex;
    };

    var rgbToHex = function(rgb) {
      var r = componentToHex(rgb[0]);
      var g = componentToHex(rgb[1]);
      var b = componentToHex(rgb[2]);
      return '#' + r + g + b;
    };
  },]);
