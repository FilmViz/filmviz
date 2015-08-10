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
      var palette = quant.palette(true, false);

      return convertPalette(palette);
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
