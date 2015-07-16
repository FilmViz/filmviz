var colorAnalyzer = (function() {
	return {
		basicAnalyzer: function(video, canvas, colorVtt) {
			console.log("starting color analyzer")
	    var context = canvas.getContext("2d");
	    var interval = prompt("Please insert interval in miliseconds", "500");
	    var i = 0;
	    var cueIndex = 1;
	    video.pause();
	    
	    canvas.height = 200;
      canvas.width = 200 * video.videoWidth / video.videoHeight;
	    
	    localStorage.clear();
	    video.currentTime = 0;

      var startTime = new Date();
	    function seekedListener() {
				context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var img = new Image();
        img.src = canvas.toDataURL("image/jpg");

        var pal = colorAnalyzer.convertPalette(colorAnalyzer.capturePalette(img));
        var tc = timecodeUtils.milisToTimecode(i);

        localStorage.setItem(tc, pal);
        
        var cueObj = {};
        cueObj['index'] = cueIndex;
        cueObj['tc'] = tc;
  			cueObj['value'] = pal;
  			colorVtt.push(cueObj);

        var palToPrint = "";
        for (var j = 0; j < pal.length; j++) {
          palToPrint += '"' + pal[j] + '"';
          if (j < pal.length - 1) {
            palToPrint += ', ';
          }
        }

        console.log('{timecode: "' + tc + '", colors: [' + palToPrint + ']},');

        i += parseInt(interval);
        cueIndex += 1;

        if (i <= video.duration * 1000) {
          video.currentTime = i / 1000;
        } else {
          console.log('Time it took: ' +
              new Date(new Date() - startTime).getTime() / 1000 + ' seconds');
            // fileUtils.saveTextAsJson(filenameToSaveAs);
            // fileUtils.saveTextAsVtt();

          video.removeEventListener('seeked', seekedListener, false ); 
          video.pause();
          // console.log(colorVtt);
          cueIndex = 1;
	    		colorVtt.forEach( function (vtt) {
		        if (vtt.index == cueIndex) {
		            // console.log(vtt);
		            var jotacueri = document.querySelector.bind(document);
		            var cueIn = document.getElementById("cueIn");
		            cueIn.value = vtt["tc"]; 
		            jotacueri("textarea").value = JSON.stringify(vtt["value"]);
		        }
	    		});
      	}
	    }
	    video.addEventListener('seeked', seekedListener, false);
		},

		capturePalette: function (img) {
      var opts = {
          colors: 16,             // desired palette size
          method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
          boxSize: [64,64],        // subregion dims (if method = 2)
          boxPxls: 2,              // min-population threshold (if method = 2)
          initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
          minHueCols: 256,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
          dithKern: null,          // dithering kernel name, see available kernels in docs below
          dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
          dithSerp: false,         // enable serpentine pattern dithering
          palette: [],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
          reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
          useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
          cacheFreq: 10,           // min color occurance count needed to qualify for caching
          colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
      };
      var q = new RgbQuant(opts);
      // analyze histograms
      q.sample(img);
      // build palette
      var pal = q.palette();
      return pal;
	  },

    convertPalette: function (pal) {
      var newpalette = [];
      for (var index=0; index < pal.length/4; index++) {
        color = colorAnalyzer.rgbToHex(pal[index*4+0], pal[index*4+1], pal[index*4+2]);
        newpalette.push(color);
      }
      return newpalette;
    },

    componentToHex: function (c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    },

    rgbToHex: function (r, g, b) {
    	return "#" + colorAnalyzer.componentToHex(r) + colorAnalyzer.componentToHex(g) + colorAnalyzer.componentToHex(b);
    }
  };
}());