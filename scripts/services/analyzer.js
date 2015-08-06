angular.module('filmViz')
  .service('Analyzer', ['ProjectData', function(ProjectData) {

    var _this = this;

    this.runAnalysis = function() {
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');

      console.log('starting color analyzer');

      canvas.height = video.videoHeight / 4;
      canvas.width = video.videoWidth / 4;

      var context = canvas.getContext('2d');
      var interval = 30;

      var colorAnalysis = new ProjectData.Analysis('color');
      var audioAnalysis = new ProjectData.Analysis('audio');
      var motionAnalysis = new ProjectData.Analysis('motion');

      video.pause();
      video.currentTime = 0;

      var currentImg = new Image();
      var lastImg;

      var _this = this;

      function seekedListener() {

        // function loopInAnalysis
        console.log('seeked: analyzing frame');

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        currentImg.src = canvas.toDataURL('image/jpg');

        // Generate color analysis8
        var colorPromise = Promise.resolve(getColorPalette(currentImg, 16));

        // Generate audio analysis
        var audioPromise = Promise.resolve(1);

        // Generate motion analysis
        var motionPromise = new Promise(function(resolve, reject) {
          if (!lastImg) {
            resolve(0);
          } else {
            resemble(currentImg.src).compareTo(lastImg).onComplete(function(resembleData) {
              resolve(resembleData.misMatchPercentage / 100);
            });
          }
        });

        // create cueObjects and store in each analysis
        colorPromise.then(function(colorPalette) {
          var colorCue = new ProjectData.Cue(colorPalette, video.currentTime);
          colorAnalysis.data.push(colorCue);
        });

        audioPromise.then(function(audio) {
          var audioCue = new ProjectData.Cue(audio, video.currentTime);
          audioAnalysis.data.push(audioCue);
        });

        motionPromise.then(function(motionPercentage) {
          var motionCue = new ProjectData.Cue(motionPercentage, video.currentTime);
          motionAnalysis.data.push(motionCue);
        });

        Promise.all([colorPromise, audioPromise, motionPromise]).then(function(values) {
          console.log(values);
        });

        if (video.currentTime < video.duration) {
          video.currentTime += interval;
          lastImg = currentImg.src;
        } else {
          // function storeAnalysis
          console.log('creating tracks and cues');

          // stop video
          video.pause();

          colorAnalysis.isDone = true;
          audioAnalysis.isDone = true;
          motionAnalysis.isDone = true;

          // analysis is finished, lets save data
          ProjectData.analysisCollection.push(colorAnalysis);
          ProjectData.analysisCollection.push(audioAnalysis);
          ProjectData.analysisCollection.push(motionAnalysis);

          // create tracks
          var colorTrack = video.addTextTrack('metadata', 'color');
          var audioTrack = video.addTextTrack('metadata', 'audio');
          var motionTrack = video.addTextTrack('metadata', 'motion');

          _this.generateCues(colorTrack, colorAnalysis.data, video);
          _this.generateCues(audioTrack, audioAnalysis.data, video);
          _this.generateCues(motionTrack, motionAnalysis.data, video);

          colorTrack.addEventListener('cuechange', function() {
            showFrameColorViz();
          });

          motionTrack.addEventListener('cuechange', function() {
            showFrameMotionViz();
          });

          video.removeEventListener('seeked', seekedListener, false);
          showTimelineMotionViz(motionAnalysis.data);
          showTimelineColorViz(colorAnalysis.data);

          // analysis finished
          console.log('analysis finished');

          function getColorPalette(img, numColors) {
            return colorUtils.convertPalette(colorUtils.capturePalette(img, numColors));
          }
        }
      };

      video.addEventListener('seeked', seekedListener, false);
    };

    // TODO: move to ProjectData.Analysis class
    // TODO: data could be Analysis and call Analysis.data
    this.generateCues = function(track, data, video) {
      // generate color cues
      data.forEach(function(cueObj, index, arr) {
        var tcIn = cueObj.tcIn;
        var tcOut = (index === arr.length - 1) ? video.duration : arr[index + 1].tcIn;
        track.addCue(new VTTCue(tcIn, tcOut, JSON.stringify(cueObj.content)));
      });
    };

  },]);
