angular.module('filmViz')
  .controller('ProjectController', ['ProjectData', function(ProjectData) {
    this.project = ProjectData;
  },])
  .service('ProjectData', function() {

    /**
     * Analysis object
     * @param [string] name Name of the analysis
     * @param [boolean] isDone Flag to check if the analysis is completed
     * @param [array] data The data of the analysis (array of cue objects)
     */
    this.Analysis = function(name)  {
      this.name = name;
      this.isDone = false;
      this.data = [];
    };

    /**
     * Cue object (like in html track cues)
     * @param [array || string || number] content Information stored in the cue
     * @param [number] tcIn start Timecode of cue in seconds with three decimal digits format
     * @param [number] tcOut end Timecode of cue in seconds with three decimal digits format
    */

    // tcIn --> startTime
    // tcOut --> endTime
    this.Cue = function(content, tcIn, tcOut)  {
      this.content = content;
      this.tcIn = tcIn;
      this.tcOut = tcOut || null;
    };

    this.name = 'alcachofas';
    this.videoSrc = '';
    this.analysisCollection = [];
    this.currentAnalysisIndex = 0;

    this.createVtt = function(analysisIndex, isBlob) {
      var _this = this;
      var text = '';

      // Select analysis to write
      analysisIndex = analysisIndex || project.currentAnalysisIndex;
      var analysis = project.analysisCollection[analysisIndex];

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

    // export to zip
    this.createZip = function() {
      var _this = this;
      var zip = new JSZip();

      // Add project data on 'project.json'
      console.log(_this.Analysis)
      zip.file('project.json', JSON.stringify({
        name: _this.name,
        videoSrc: _this.videoSrc,
        analysisCollection: _this.analysisCollection,
        currentAnalysisIndex: _this.currentAnalysisIndex,
      }));

      return zip.generate({
        type: 'blob',
      });
    };

    // import from zip
    this.readZip = function(project, zipBlob) {
      var _this = this;
      var newZip;
      var reader = new FileReader();
      var video = document.getElementById('video');

      reader.onload = (function(file) {
        return function(evt) {
          var parsedData;
          var colorData;
          var audioData;
          var motionData;

          newZip = new JSZip(evt.target.result);

          parsedData = JSON.parse(newZip.files['project.json'].asText());

          // this should be refactorized with a for loop using analysis.length
          _this.analysis[0].data = parsedData.analysis[0].data;
          _this.analysis[0].isDone = true;

          _this.analysis[1].data = parsedData.analysis[1].data;
          _this.analysis[1].isDone = true;

          _this.analysis[2].data = parsedData.analysis[2].data;
          _this.analysis[2].isDone = true;

          // create tracks
          var colortrack = video.addTextTrack('metadata', 'color');
          var audiotrack = video.addTextTrack('metadata', 'audio');
          var motiontrack = video.addTextTrack('metadata', 'motion');

          colorAnalyzer.generateCues(colortrack, _this.analysis[0].data, video);
          colorAnalyzer.generateCues(audiotrack, _this.analysis[1].data, video);
          colorAnalyzer.generateCues(motiontrack, _this.analysis[2].data, video);

          colortrack.addEventListener('cuechange', function() {
            showFrameColorViz();
          });

          motiontrack.addEventListener('cuechange', function() {
            showFrameMotionViz();
          });

          showTimelineMotionViz(_this.analysis[2].data);
          showTimelineColorViz(_this.analysis[0].data);

        };
      }(zipBlob));

      reader.readAsArrayBuffer(zipBlob);
    };

    this.sortData = function(analysisIndex) {
    };

    this.calculateTcOut = function(analysisIndex) {
    };
  });
