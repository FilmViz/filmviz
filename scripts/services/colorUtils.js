var colorUtils = (function() {

  return {

    capturePalette: function(img, colors) {
      var opts = {
        colors: colors,
        method: 2, // histogram method, 2: min-population threshold within subregions; 1: global top-population
        boxSize: [64, 64], // subregion dims (if method = 2)
        boxPxls: 2, // min-population threshold (if method = 2)
        initColors: 4096, // # of top-occurring colors  to start with (if method = 1)
        minHueCols: 256, // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
        dithKern: null, // dithering kernel name, see available kernels in docs below
        dithDelta: 0, // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
        dithSerp: false, // enable serpentine pattern dithering
        palette: [], // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
        reIndex: false, // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
        useCache: true, // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
        cacheFreq: 10, // min color occurance count needed to qualify for caching
        colorDist: 'euclidean', // method used to determine color distance, can also be 'manhattan'
      };
      var q = new RgbQuant(opts);

      // analyze histograms
      q.sample(img);

      // build palette
      var pal = q.palette();
      return pal;
    },

    convertPalette: function(pal) {
      var newpalette = [];
      for (var index = 0; index < pal.length / 4; index++) {
        color = this.rgbToHex(pal[index * 4 + 0], pal[index * 4 + 1], pal[index * 4 + 2]);
        newpalette.push(color);
      }

      return newpalette;
    },

    componentToHex: function(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? '0' + hex : hex;
    },

    rgbToHex: function(r, g, b) {
      var r = this.componentToHex(r);
      var g = this.componentToHex(g);
      var b = this.componentToHex(b);
      return '#' + r + g + b;
    },

  };
}());
