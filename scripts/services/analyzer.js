angular.module('filmViz')
  .service('Analyzer', ['ProjectData', function(ProjectData) {

    this.runAnalysis = function() {

      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');

      console.log('starting color analyzer');

      canvas.height = video.videoHeight / 4;
      canvas.width = video.videoWidth / 4;

      var context = canvas.getContext('2d');
      var interval = 30;
      var currentTime = 0;

      var colorAnalysis = new ProjectData.Analysis('color');
      var audioAnalysis = new ProjectData.Analysis('audio');
      var motionAnalysis = new ProjectData.Analysis('motion');

      video.pause();
      video.currentTime = currentTime;

      var currentImg = new Image();
      var lastImg;

      var _this = this;

      function seekedListener() {

        // function loopInAnalysis
        console.log('seeked: analyzing frame');

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        currentImg.src = canvas.toDataURL('image/jpg');

        // Generate color analysis
        var palette = colorUtils.convertPalette(colorUtils.capturePalette(img, 16));

        // Generate audio analysis
        var audio = 1;

        // Generate motion analysis
        var motion;

        if (!lastImg) { 
          motion = 0;
        } else {

          // warning!!! ñapa
          var mot = resemble(img.src).compareTo(lastImg.src).onComplete(function(results) {
            motion = results.misMatchPercentage / 100;
            return results.misMatchPercentage / 100;
          });
        }
        
        // create cueObjects and store in each analysis
        var colorCue = new ProjectData.Cue(palette, currentTime);
        var audioCue = new ProjectData.Cue(audio, currentTime);
        var motionCue = new ProjectData.Cue(motion, currentTime);

        colorAnalysis.data.push(colorCue);
        audioAnalysis.data.push(audioCue);
        motionAnalysis.data.push(motionCue);

        // update variables
        currentTime += interval;
        lastImg = currentImg;

        if (currentTime <= video.duration) {
          video.currentTime = currentTime;
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
          showTimelineMotionViz(project.analysis[2].data);
          showTimelineColorViz(project.analysis[0].data);

          // analysis finished
          console.log('analysis finished');
        }

        //end else (analysis finished)
      };

      video.addEventListener('seeked', seekedListener, false);
    };

    this.generateCues = function(track, data, video) {
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
    };

  }]);
