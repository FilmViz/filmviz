angular.module('filmViz')
  .controller('Analyzer', ['ProjectData', 'Color', 'ResembleLib', function(ProjectData, Color, ResembleLib) {
    'use strict';
    var _this = this;

    setTimeout(function() {
      _this.runAnalysis();
    }, 2000);

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

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        currentImgSrc = canvas.toDataURL('image/jpg');

        // Run color analysis
        var colorFramePromise = Promise.resolve(Color.capturePalette(currentImgSrc, 16));

        // Run audio analysis
        var audioFramePromise = Promise.resolve(1);

        // Run motion analysis
        var motionFramePromise = new Promise(function(resolve, reject) {
          if (!previousImgSrc) {
            resolve(0);
          } else {
            ResembleLib(currentImgSrc).compareTo(previousImgSrc).onComplete(function(resembleData) {
              resolve(resembleData.misMatchPercentage / 100);
            });
          }
        });

        colorFramePromise = colorFramePromise.then(function(result) {
          return {
            content: result,
            startTime: cueStartTime,
          };
        });

        audioFramePromise = audioFramePromise.then(function(result) {
          return {
            content: result,
            startTime: cueStartTime,
          };
        });

        motionFramePromise = motionFramePromise.then(function(result) {
          return {
            content: result,
            startTime: cueStartTime,
          };
        });

        colorTrackPromises.push(colorFramePromise);
        audioTrackPromises.push(audioFramePromise);
        motionTrackPromises.push(motionFramePromise);

        if (video.currentTime < video.duration - interval) {
          video.currentTime += interval;
          previousImgSrc = currentImgSrc;
        } else { // Analysis finished
          video.pause();
          video.currentTime = 0;
          video.removeEventListener('seeked', seekedListener, false);

          Promise.all(colorTrackPromises).then(function(resultObjs) {
            var analysisName = 'color';
            ProjectData.createAnalysis(analysisName);

            resultObjs.forEach(function(resultObj) {
              ProjectData.addCueToAnalysis(analysisName, resultObj.content, resultObj.startTime);
            });

            ProjectData.addTrackToVideo(analysisName, video);
            ProjectData.setAnalysisAsDone(analysisName);
          });

          Promise.all(audioTrackPromises).then(function(resultObjs) {
            var analysisName = 'audio';
            ProjectData.createAnalysis(analysisName);

            resultObjs.forEach(function(resultObj) {
              ProjectData.addCueToAnalysis(analysisName, resultObj.content, resultObj.startTime);
            });

            ProjectData.addTrackToVideo(analysisName, video);
            ProjectData.setAnalysisAsDone(analysisName);
          });

          Promise.all(motionTrackPromises).then(function(resultObjs) {
            var analysisName = 'motion';
            ProjectData.createAnalysis(analysisName);

            resultObjs.forEach(function(resultObj) {
              ProjectData.addCueToAnalysis(analysisName, resultObj.content, resultObj.startTime);
            });

            ProjectData.addTrackToVideo(analysisName, video);
            ProjectData.setAnalysisAsDone(analysisName);
          });
        }
      };

      video.addEventListener('seeked', seekedListener, false);
    };
  },]);
