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

        // Generate color analysis
        var palette = colorUtils.convertPalette(colorUtils.capturePalette(currentImg, 16));

        // Generate audio analysis
        var audio = 1;

        // Generate motion analysis
        var motion;

        if (!lastImg) {
          motion = 0;
        } else {

          // warning!!! ñapa
          var mot = resemble(currentImg.src).compareTo(lastImg.src).onComplete(function(results) {
            motion = results.misMatchPercentage / 100;
            return results.misMatchPercentage / 100;
          });
        }

        // create cueObjects and store in each analysis
        var colorCue = new ProjectData.Cue(palette, video.currentTime);
        var audioCue = new ProjectData.Cue(audio, video.currentTime);
        var motionCue = new ProjectData.Cue(motion, video.currentTime);

        colorAnalysis.data.push(colorCue);
        audioAnalysis.data.push(audioCue);
        motionAnalysis.data.push(motionCue);

        if (video.currentTime < video.duration) {
          video.currentTime += interval;
          lastImg = currentImg;
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

          generateCues(colorTrack, colorAnalysis.data, video);
          generateCues(audioTrack, audioAnalysis.data, video);
          generateCues(motionTrack, motionAnalysis.data, video);

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
        }
      };

      video.addEventListener('seeked', seekedListener, false);
    };

    var generateCues = function(track, data, video) {
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

  },]);
