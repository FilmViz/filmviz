var motionAnalyzer = (function() {
  return {
    basicAnalyzer: function(project, analysisIndex) {
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      console.log('starting motion analyzer');

      // canvas.height = 200;
      // canvas.width = 200 * video.videoWidth / video.videoHeight;
      var context = canvas.getContext('2d');
      var interval = prompt('Please insert interval in seconds', '30');
      interval = parseInt(interval);
      var i = 0;
      var cueIndex = 1;
      data = [];
      video.pause();
      video.currentTime = 0;

      var lastImg;
      function seekedListener() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var img = new Image();
        img.src = canvas.toDataURL('image/jpg');

        if (!lastImg) { lastImg = img; };

        resemble(img.src).compareTo(lastImg.src).onComplete(function(results) {
          var val = results.misMatchPercentage / 100;
          var tc = timecodeUtils.milisToTimecode(i * 1000);

          var cueObj = {};
          cueObj.tcIn = tc;
          cueObj.tcOut = '';
          cueObj.content = {
            value: val
          };
          data.push(cueObj);
          console.log(cueObj);
          // console.log('{timecode: ' + tc + ', value: ' + val + '},');

          i += interval;
          cueIndex += 1;

          if (i <= video.duration) {
            video.currentTime = i;
          } else {
            console.log(data);
            analysis = project.analysis[analysisIndex];
            analysis.data = data;
            analysis.isDone = true;

            // fileUtils.saveTextAsVtt(project, analysisIndex);
            vtt = fileUtils.createVtt(project);
            fileUtils.download(vtt);
            video.removeEventListener('seeked', seekedListener, false);
            video.pause();
            cueIndex = 1;
            data.forEach(function(vtt) {
              if (vtt.index == cueIndex) {
                console.log(vtt);
                var jotacueri = document.querySelector.bind(document);
                var cueIn = document.getElementById('cueIn');
                cueIn.value = vtt.tc;
                jotacueri('textarea').value = JSON.stringify(vtt.content);
              }
            });

            return data;
          }

          lastImg = img;
        });
      }

      video.addEventListener('seeked', seekedListener, false);
    }
  };
}());
