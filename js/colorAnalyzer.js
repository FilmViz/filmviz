var colorAnalyzer = (function() {

  return {
    colorAnalysis: function(project) {
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      console.log('starting color analyzer');

      canvas.height = video.videoHeight / 4;
      canvas.width = video.videoWidth / 4;

      var context = canvas.getContext('2d');
      var interval = 1;
      var i = 0;
      var cueIndex = 1;
      var colorData = [];
      var motionData = [];
      var audioData = [];
      video.pause();
      video.currentTime = 0;

      var lastImg;

      function seekedListener() {
        console.log('seeked: analyzing frame')

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var img = new Image();
        img.src = canvas.toDataURL('image/jpg');

        //generate color analysis
        var pal = colorAnalyzer.convertPalette(colorAnalyzer.capturePalette(img, 16));
        console.log('color ready')

        //generate audio analysis
        var audio = 1;

        //generate motion analysis
        if (!lastImg) { lastImg = img; };

        var mot;

        // warning!!! ñapa
        var motion = resemble(img.src).compareTo(lastImg.src).onComplete(function(results) {
          console.log('motion result', results.misMatchPercentage / 100);
          mot = results.misMatchPercentage / 100;
          return results.misMatchPercentage / 100;
        });

        console.log('motion ready', mot)

        // get current timecode
        var tc = timecodeUtils.milisToTimecode(i * 1000);

        // create cueObjects
        var cueObj = {};
        cueObj.tcIn = tc;
        cueObj.tcOut = '';
        cueObj.content = {
          colors: pal
        };
        colorData.push(cueObj);

        cueObj = {};
        cueObj.tcIn = tc;
        cueObj.tcOut = '';
        cueObj.content = {
          audio: audio
        };
        audioData.push(cueObj);

        cueObj = {};
        cueObj.tcIn = tc;
        cueObj.tcOut = '';
        cueObj.content = {
          motion: mot
        };
        motionData.push(cueObj);

        // update variables
        i += interval;
        cueIndex += 1;
        lastImg = img;

        console.log(i, video.duration, interval)

        if (i <= video.duration) {
          video.currentTime = i;
          console.log('loop', video.currentTime)
        } else {
          console.log('analysis finished');

          // stop video
          video.pause();
          cueIndex = 1;

          // analysis is finished, lets save data
          colorAnalysis = project.analysis[0];
          colorAnalysis.data = colorData;
          colorAnalysis.isDone = true;
          audioAnalysis = project.analysis[1];
          audioAnalysis.data = audioData;
          audioAnalysis.isDone = true;
          motionAnalysis = project.analysis[2];
          motionAnalysis.data = motionData;
          motionAnalysis.isDone = true;

          // create tracks
          var colortrack = video.addTextTrack('metadata', 'color');
          var audiotrack = video.addTextTrack('metadata', 'audio');
          var motiontrack = video.addTextTrack('metadata', 'motion');

          colorAnalyzer.generateCues(colortrack, colorData, video);
          colorAnalyzer.generateCues(audiotrack, audioData, video);
          colorAnalyzer.generateCues(motiontrack, motionData, video);

          colortrack.addEventListener('cuechange', function() {
            console.log(colortrack.activeCues[0].text)
            showFrameColorViz();
          });

          motiontrack.addEventListener('cuechange', function() {
            console.log(motiontrack.activeCues[0].text)
            showFrameMotionViz();
          });

          video.removeEventListener('seeked', seekedListener, false);
          showTimelineMotionViz();
          showTimelineColorViz();
          console.log('analysis finished');
        }

        //end else (analysis finished)
      };

      video.addEventListener('seeked', seekedListener, false);
    },

    generateCues: function(track, data, video) {
      // generate color cues
      data.forEach(function(cueObj, index, arr) {
        var tcIn = timecodeUtils.timecodeToMilis(cueObj.tcIn) / 1000
        if (index === arr.length - 1) {
          var tcOut = video.duration;
          console.log(tcIn, tcOut, cueObj.content);
          track.addCue(new VTTCue(tcIn, tcOut, JSON.stringify(cueObj.content)));
        } else {
          var tcOut = timecodeUtils.timecodeToMilis(arr[index + 1].tcIn) / 1000;
          console.log(tcIn, tcOut, cueObj.content);
          track.addCue(new VTTCue(tcIn, tcOut, JSON.stringify(cueObj.content)));
        };
      });
    },

    // ###############

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
