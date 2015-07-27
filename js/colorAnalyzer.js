var colorAnalyzer = (function() {

  return {
    basicAnalyzer: function(project, analysisIndex) {
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      console.log('starting color analyzer');

      //canvas.height = video.videoHeight / 2;
      //canvas.width = video.videoWidth / 2;
      var context = canvas.getContext('2d');
      var interval = prompt('Please insert interval in seconds', '30');
      interval = parseInt(interval)
      var i = 0;
      var cueIndex = 1;
      data = [];
      video.pause();
      video.currentTime = 0;

      function seekedListener() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var img = new Image();
        img.src = canvas.toDataURL('image/jpg');

        --var pal = colorAnalyzer.convertPalette(colorAnalyzer.capturePalette(img, 16));
        -- motion

        var tc = timecodeUtils.milisToTimecode(i * 1000);

        var cueObj = {};
        cueObj.tcIn = tc;
        cueObj.tcOut = '';
        cueObj.content = {
          colors: pal
        };
        --data.push(cueObj);
        -- motion
        console.log(cueObj);

        i += interval;
        cueIndex += 1;

        if (i <= video.duration) {
          video.currentTime = i;
        } else {
          console.log(data);
          analysis = project.analysis[analysisIndex];
          analysis.data = data;
          analysis.isDone = true;

          //fileUtils.saveTextAsVtt(project, analysisIndex);
          vtt = fileUtils.createVtt(project);
          fileUtils.download(vtt);
          video.removeEventListener('seeked', seekedListener, false);
          video.pause();
          cueIndex = 1;
          data.forEach(function(vtt) {
            if (vtt.index == cueIndex) {
              console.log(vtt)
              var jotacueri = document.querySelector.bind(document);
              var cueIn = document.getElementById('cueIn');
              cueIn.value = vtt.tc;
              jotacueri('textarea').value = JSON.stringify(vtt.content);
            }
          });

          return data;
        }

      }

      video.addEventListener('seeked', seekedListener, false);
    },

    // ##########

    ultraAnalyzer: function(project, analysisIndex, data, type, tag) {
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      console.log('starting color analyzer');
      var context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      var img = new Image();
      img.src = canvas.toDataURL('image/jpg');
      var pal = colorAnalyzer.convertPalette(colorAnalyzer.capturePalette(img, 32));
      var tc = timecodeUtils.milisToTimecode(video.currentTime * 1000);
      var cueObj = {};
      cueObj.tcIn = tc;
      cueObj.tcOut = '';
      if (type === 'color') {
        cueObj.content = {
          colors: pal
        }
      } else if (type === 'audio') {
        cueObj.content = {
          audio: 0
        }
      } else if (type === 'motion') {
        cueObj.content = {
          motion: 1
        }
      } else {
        cueObj.content = {
          tag: tag
        }
      }

      data.push(cueObj);
      console.log(tag, data);

      return data;
    },

    // ###############

    capturePalette: function(img, colors) {
      var opts = {
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
        colorDist: 'euclidean' // method used to determine color distance, can also be 'manhattan'
      };
      var q = new RgbQuant(opts);

      // analyze histograms
      q.sample(img);

      // build palette
      var pal = q.palette();
      return pal
    },

    convertPalette: function(pal) {
      var newpalette = [];
      for (var index = 0; index < pal.length / 4; index++) {
        color = colorAnalyzer.rgbToHex(pal[index * 4 + 0], pal[index * 4 + 1], pal[index * 4 + 2]);
        newpalette.push(color);
      }

      return newpalette;
    },

    componentToHex: function(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? '0' + hex : hex;
    },

    rgbToHex: function(r, g, b) {
      return '#' + colorAnalyzer.componentToHex(r) + colorAnalyzer.componentToHex(g) + colorAnalyzer.componentToHex(b);
    }
  };
})();
