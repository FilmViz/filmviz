(function() {
  angular.module('utils')
    .service('fileUtils', ['ProjectData', function(ProjectData) {
      var project = ProjectData;

      this.jsonToString = function(json, replacer) { // Prettify String output with 2 spaces
        return JSON.stringify(json, replacer, 2);
      };

      this.createVtt = function(project, analysisIndex, isBlob) {
        var _this = this;
        var text = '';

        // Select analysis to write
        analysisIndex = analysisIndex || project.selectedAnalysis;
        var analysis = project.analysis[analysisIndex];

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
            } else {
              newLine(data.tcIn + ' --> ' + arr[index + 1].tcIn);
            };

            newLine(_this.jsonToString(data.content));
            newLine();
          });
        }

        // Return Blob or String
        return (isBlob) ? new Blob([text], {
          type: 'text/plain',
        }) : text;
      };

      this.download = function(blob, filename) {
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
      };

      this.getMediaFilename = function(mediaElement) {
        // Route for an user file will be 'C:\fakepath\<FileName>' always
        name = mediaElement.currentSrc.split('\\');
        return name[name.length - 1];
      };

      this.createZip = function(project) {
        var _this = this;
        var zip = new JSZip();

        // Add project info on 'project.json'
        zip.file('project.json', this.jsonToString({
          name: project.name,
          videoSource: project.videosrc,
          currentAnalysis: project.selectedAnalysis,
        }));

        // Create folder called 'analysis'
        var analysisFolder = zip.folder('analysis');

        // Add VTT file for every analysis
        project.analysis.forEach(function(analysis, index) {
          analysisFolder.file(analysis.name + '.vtt', _this.createVtt(project, index));
          analysisFolder.file(analysis.name + '.json', JSON.stringify(project.analysis[index]));
        });

        zip.file('all.json', JSON.stringify(project));

        return zip.generate({
          type: 'blob',
        });
      };

      this.readZip = function(project, zipBlob) {
        var newZip;
        var reader = new FileReader();
        var video = document.getElementById('video');

        reader.onload = (function(file) {
          return function(evt) {
            newZip = new JSZip(evt.target.result);

            project = JSON.parse(newZip.files['all.json'].asText());

            colorData = project.analysis[0].data;
            project.analysis[0].isDone = true;

            audioData = project.analysis[1].data;
            project.analysis[1].isDone = true;

            motionData = project.analysis[2].data;
            project.analysis[2].isDone = true;

            // create tracks
            var colortrack = video.addTextTrack('metadata', 'color');
            var audiotrack = video.addTextTrack('metadata', 'audio');
            var motiontrack = video.addTextTrack('metadata', 'motion');

            colorAnalyzer.generateCues(colortrack, colorData, video);
            colorAnalyzer.generateCues(audiotrack, audioData, video);
            colorAnalyzer.generateCues(motiontrack, motionData, video);

            colortrack.addEventListener('cuechange', function() {
              showFrameColorViz();
            });

            motiontrack.addEventListener('cuechange', function() {
              showFrameMotionViz();
            });

            showTimelineMotionViz(project.analysis[2].data);
            showTimelineColorViz(project.analysis[0].data);

          };
        }(zipBlob));

        reader.readAsArrayBuffer(zipBlob);
      };
    },]);
}());
