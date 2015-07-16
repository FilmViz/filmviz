var rhythmAnalyzer = (function() {
  return {
    basicAnalyzer: function(video, canvas, rhythmVtt) {
      console.log("starting rhythm analyzer");
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
      var lastImg;
      function seekedListener() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var img = new Image();
        img.src = canvas.toDataURL("image/jpg");

        if (!lastImg) { lastImg = img; };

        resemble(img.src).compareTo(lastImg.src).onComplete(function(data) {
          var val = data.misMatchPercentage / 100;
          var tc = timecodeUtils.milisToTimecode(i);

          localStorage.setItem(tc, val);
          
          var cueObj = {};
          cueObj['index'] = cueIndex;
          cueObj['tc'] = tc;
          cueObj['value'] = val;
          rhythmVtt.push(cueObj);

          console.log('{timecode: "' + tc + '", value: "' + val + '"},');

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
            // console.log(rhythmVtt);
            cueIndex = 1;
            rhythmVtt.forEach( function (vtt) {
              if (vtt.index == cueIndex) {
                // console.log(vtt)
                var jotacueri = document.querySelector.bind(document);
                var cueIn = document.getElementById("cueIn");
                cueIn.value = vtt["tc"]; 
                jotacueri("textarea").value = JSON.stringify(vtt["value"]);
              }
            });
          }

          lastImg = img;
        });
      }
      video.addEventListener('seeked', seekedListener, false);
    }
  };
}());