var fileUtils = (function() {

  return {
    jsonToString: function(json, replacer) { // Prettify String output with 2 spaces
      return JSON.stringify(json, replacer, 2);
    },

    createVtt: function(project, analysisIndex, isBlob) {
      var _this = this;
      var text = '';

      // Select analysis to write
      var analysis = (analysisIndex) ? analysisIndex : project.analysis[project.selectedAnalysis];

      function newLine(string) {
        text += (string) ? string + '\n' : '\n';
      };

      // File header
      newLine('WEBVTT' + ' - ' + project.name + ' - ' + analysis.name);
      newLine();

      // Filmviz comment
      newLine('NOTE');
      newLine('Analysis courtesy of FilmViz, ;)');
      newLine();

      // Write data
      if (analysis.data) {
        analysis.data.forEach(function(data, index, arr) {
          newLine(index + 1);
          if (index === arr.length - 1) {
            var tcOut = timecodeUtils.milisToTimecode(video.duration * 1000);
            newLine(data.tcIn + ' --> ' + tcOut);
            console.log(data.tcIn + ' --> ' + tcOut);
          } else {
            newLine(data.tcIn + ' --> ' + arr[index + 1].tcIn);
            console.log(data.tcIn + ' --> ' + arr[index + 1].tcIn);
          };

          newLine(_this.jsonToString(data.content));
          newLine();
        });
      }

      // Return Blob or String
      return (isBlob) ? new Blob([text], {
        type: 'text/plain'
      }) : text;
    },

    download: function(blob, filename) {
      // Create fake anchor tag
      var link = document.createElement('a');

      // Establish filename
      link.download = filename || 'file';

      // Link file
      window.URL = window.URL || window.webkitURL;
      link.href = window.URL.createObjectURL(blob);

      // Remove link element from DOM after click
      link.addEventListener('click', function(evt) {
        evt.target.parent.removeChild(evt.target);
      });

      // Hide the link
      link.style.display = 'none';

      // Add link to DOM
      document.body.appendChild(link);

      // Programmatically clicking on link --> Download starts
      link.click();
    },

    getMediaFilename: function(mediaElement) {
      // Route for an user file will be 'C:\fakepath\<FileName>' always
      name = mediaElement.currentSrc.split('\\');
      return name[name.length - 1];
    },

    createZip: function(project) {
      var _this = this;
      var zip = new JSZip();

      // Add project info on 'project.json'
      zip.file('project.json', this.jsonToString({
        name: project.name,
        videoSource: project.videosrc,
        currentAnalysis: project.selectedAnalysis
      }));

      // Create folder called 'analysis'
      var analysisFolder = zip.folder('analysis');

      // Add VTT file for every analysis
      project.analysis.forEach(function(analysis, index) {
        analysisFolder.file(analysis.name + '.vtt', _this.createVtt(project, index));
      });

      zip.file('all.json', JSON.stringify(project));

      return zip.generate({
        type: 'blob'
      });
    },

    readZip: function(project, zipBlob) {
      var newZip;
      var reader = new FileReader();
      var video = document.getElementById('video');

      reader.onload = (function(file) {
        return function(evt) {
          newZip = new JSZip(evt.target.result);
          console.log("loading zip into project")
          // var keys = [];
          // for (var k in newZip.files) {
          //   console.log(newZip.files[k].asText());
          // };
          project = JSON.parse(newZip.files['all.json'].asText());
          var data = project.analysis[0].data;
          var name = project.analysis[0].name;
          var track = video.addTextTrack('metadata', name);
          data.forEach(function(cueObj, index, arr) {
            var tcIn = timecodeUtils.timecodeToMilis(cueObj.tcIn) / 1000
            if (index === arr.length - 1) {
              var tcOut = video.duration;
              //console.log(tcIn, tcOut, cueObj.content);
              track.addCue(new VTTCue(tcIn, tcOut, JSON.stringify(cueObj.content)));
            } else {
              var tcOut = timecodeUtils.timecodeToMilis(arr[index + 1].tcIn) / 1000;
              //console.log(tcIn, tcOut, cueObj.content);
              track.addCue(new VTTCue(tcIn, tcOut, JSON.stringify(cueObj.content)));
            };
          });

          track.addEventListener('cuechange', function() {
              console.log(track.activeCues[0].text)
          });

        }
      }(zipBlob));

      reader.readAsArrayBuffer(zipBlob);
    }
  };
}());
