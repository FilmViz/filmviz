angular.module('filmViz')
  .service('Analyzer', ['ProjectData', 'Color', 'ResembleLib', function(ProjectData, Color, ResembleLib) {

    var _this = this;

    this.runAnalysis = function() {
      var video = document.getElementById('video-main');
      var canvas = document.getElementById('canvas');

      console.log('starting color analyzer');

      canvas.height = video.videoHeight / 4;
      canvas.width = video.videoWidth / 4;

      var context = canvas.getContext('2d');
      var interval = 1;

      video.pause();
      video.currentTime = 0;

      var currentImgSrc;
      var previousImgSrc;

      var _this = this;

      var colorTrackPromises = [];
      var audioTrackPromises = [];
      var motionTrackPromises = [];

      function seekedListener(event) {
        var cueStartTime = video.currentTime;

        // function loopInAnalysis
        console.log('seeked: analyzing frame');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        currentImgSrc = canvas.toDataURL('image/jpg');

        // Generate color analysis
        var colorFramePromise = Promise.resolve(Color.capturePalette(currentImgSrc, 16));

        // Generate audio analysis
        var audioFramePromise = Promise.resolve(1);

        // Generate motion analysis
        var motionFramePromise = new Promise(function(resolve, reject) {
          if (!previousImgSrc) {
            resolve(0);
          } else {
            ResembleLib(currentImgSrc).compareTo(previousImgSrc).onComplete(function(resembleData) {
              resolve(resembleData.misMatchPercentage / 100);
            });
          }
        });

        colorFramePromise = colorFramePromise.then(function(value) {
          return new ProjectData.Cue(value, cueStartTime);
        });

        audioFramePromise = audioFramePromise.then(function(value) {
          return new ProjectData.Cue(value, cueStartTime);
        });

        motionFramePromise = motionFramePromise.then(function(value) {
          return new ProjectData.Cue(value, cueStartTime);
        });

        // create cueObjects and store in each analysis
        colorTrackPromises.push(colorFramePromise);
        audioTrackPromises.push(audioFramePromise);
        motionTrackPromises.push(motionFramePromise);

        if (video.currentTime < video.duration - interval) {
          video.currentTime += interval;
          previousImgSrc = currentImgSrc;
        } else {
          // analysis finished

          video.pause();
          video.removeEventListener('seeked', seekedListener, false);

          Promise.all(colorTrackPromises).then(function(cues) {
            var colorAnalysis = ProjectData.createAnalysis('color');

            cues.forEach(function(cue) {
              colorAnalysis.data.push(cue);
            });

            colorAnalysis.isDone = true;

            var colorTrack = video.addTextTrack('metadata', 'color');
            _this.addCuesToVideoTrack(colorTrack, colorAnalysis.data, video);

            colorTrack.addEventListener('cuechange', function() {
              showFrameColorViz();
            });

            showTimelineColorViz(colorAnalysis.data);
          });

          Promise.all(audioTrackPromises).then(function(cues) {
            var audioAnalysis = ProjectData.createAnalysis('audio');

            cues.forEach(function(cue) {
              audioAnalysis.data.push(cue);
            });

            audioAnalysis.isDone = true;

            var audioTrack = video.addTextTrack('metadata', 'audio');
            _this.addCuesToVideoTrack(audioTrack, audioAnalysis.data, video);
          });

          Promise.all(motionTrackPromises).then(function(cues) {
            var motionAnalysis = ProjectData.createAnalysis('motion');

            cues.forEach(function(cue) {
              motionAnalysis.data.push(cue);
            });

            motionAnalysis.isDone = true;

            var motionTrack = video.addTextTrack('metadata', 'motion');
            _this.addCuesToVideoTrack(motionTrack, motionAnalysis.data, video);

            motionTrack.addEventListener('cuechange', function() {
              showFrameMotionViz();
            });

            showTimelineMotionViz(motionAnalysis.data);
          });
        }
      };

      video.addEventListener('seeked', seekedListener, false);
    };

    // TODO: move to Analysis class
    // TODO: data could be Analysis and call Analysis.data
    this.addCuesToVideoTrack = function(track, cueObjs, video) {
      // generate color cues
      cueObjs.forEach(function(cueObj, index, arr) {
        var startTime = cueObj.startTime;
        var endTime = (index === arr.length - 1) ? video.duration : arr[index + 1].startTime;
        track.addCue(new VTTCue(startTime, endTime, angular.toJson(cueObj.content)));
      });
    };
  },]);
