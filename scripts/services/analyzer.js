var colorAnalyzer = (function() {

  return {
    colorAnalysis: function(project) {
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      console.log('starting color analyzer');

      canvas.height = video.videoHeight / 4;
      canvas.width = video.videoWidth / 4;

      var context = canvas.getContext('2d');
      var interval = 30;
      var i = 0;
      var cueIndex = 1;
      var colorData = [];
      var motionData = [];
      var audioData = [];
      video.pause();
      video.currentTime = 0;

      var lastImg;

      var _this = this;

      function seekedListener() {
        console.log('seeked: analyzing frame');

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var img = new Image();
        img.src = canvas.toDataURL('image/jpg');

        //generate color analysis
        var pal = colorUtils.convertPalette(colorUtils.capturePalette(img, 16));

        //generate audio analysis
        var audio = 1;

        //generate motion analysis
        if (!lastImg) { lastImg = img; };

        var mot;

        // warning!!! ñapa
        var motion = resemble(img.src).compareTo(lastImg.src).onComplete(function(results) {
          mot = results.misMatchPercentage / 100;
          return results.misMatchPercentage / 100;
        });


        // create cueObjects
        var cueObj = {};
        cueObj.tcIn = i;
        cueObj.tcOut = '';
        cueObj.content = pal;
        colorData.push(cueObj);

        cueObj = {};
        cueObj.tcIn = i;
        cueObj.tcOut = '';
        cueObj.content = audio;
        audioData.push(cueObj);

        cueObj = {};
        cueObj.tcIn = i;
        cueObj.tcOut = '';
        cueObj.content = mot;
        motionData.push(cueObj);

        // update variables
        i += interval;
        cueIndex += 1;
        lastImg = img;

        if (i <= video.duration) {
          video.currentTime = i;
        } else {
          console.log('creating tracks and cues');

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

          _this.generateCues(colortrack, colorData, video);
          _this.generateCues(audiotrack, audioData, video);
          _this.generateCues(motiontrack, motionData, video);

          colortrack.addEventListener('cuechange', function() {
            showFrameColorViz();
          });

          motiontrack.addEventListener('cuechange', function() {
            showFrameMotionViz();
          });

          video.removeEventListener('seeked', seekedListener, false);
          showTimelineMotionViz(project.analysis[2].data);
          showTimelineColorViz(project.analysis[0].data);

          // analysis finished
          console.log('analysis finished');
        }

        //end else (analysis finished)
      };

      video.addEventListener('seeked', seekedListener, false);
    },

    generateCues: function(track, data, video) {
      // generate color cues
      data.forEach(function(cueObj, index, arr) {
        var tcIn = cueObj.tcIn;
        if (index === arr.length - 1) {
          var tcOut = video.duration;
          track.addCue(new VTTCue(tcIn, tcOut, JSON.stringify(cueObj.content)));
        } else {
          var tcOut = arr[index + 1].tcIn;
          track.addCue(new VTTCue(tcIn, tcOut, JSON.stringify(cueObj.content)));
        };
      });
    },
  };
})();
