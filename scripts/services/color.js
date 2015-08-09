angular.module('filmViz')
  .service('Color', ['ColorQuant', function(ColorQuant) {
    this.capturePalette = function(img, colors) {
      var opts = {
        colors: colors,
        minHueCols: 256, // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
      };
      var quant = new ColorQuant(opts);

      // Analyze histograms and build palette
      quant.sample(img);
      var palette = quant.palette();

      return convertPalette(palette);
    };

    var convertPalette = function(palette) {
      var newPalette = [];
      for (var i = 0; i < palette.length; i += 4) {
        var color = rgbToHex(palette[i], palette[i + 1], palette[i + 2]);
        newPalette.push(color);
      }

      return newPalette;
    };

    var componentToHex = function(component) {
      var hex = component.toString(16);
      return (hex.length === 1) ? '0' + hex : hex;
    };

    var rgbToHex = function(r, g, b) {
      var r = componentToHex(r);
      var g = componentToHex(g);
      var b = componentToHex(b);
      return '#' + r + g + b;
    };
  },]);
