angular.module('filmViz')
  .controller('ProjectController', ['ProjectData', function(ProjectData) {
    this.project = ProjectData;
  },])
  .service('ProjectData', ['Timecode', 'JSZipLib', '$rootScope', function(Timecode, JSZipLib, $rootScope) {
    this.name = '' || 'project';
    this.videoSrc = '';
    this.analysisCollection = {};
    this.currentAnalysisName = 0;

    /**
     * Analysis object
     * @param [string] name Name of the analysis
     * @param [boolean] isDone Flag to check if the analysis is completed
     * @param [array] data Raw data of the analysis (array of Cue objects)
     */
    var Analysis = function(data)  {
      this.isDone = false;
      this.data = data || [];
    };

    this.createAnalysis = function(analysisName, analysisData) {
      var newAnalysis = new Analysis(analysisData);
      this.analysisCollection[analysisName] = newAnalysis;
      return newAnalysis;
    };

    this.addCueToAnalysis = function(analysisName, content, startTime, endTime) {
      var newCue = new Cue(content, startTime, endTime);
      this.analysisCollection[analysisName].data.push(newCue);
    };

    this.setAnalysisAsDone = function(analysisName) {
      // TODO: Use Angular Event
      var currentAnalysis = this.analysisCollection[analysisName];
      currentAnalysis.isDone = true;
      $rootScope.$emit(analysisName + 'AnalysisLoaded', currentAnalysis.data);
    };

    /**
     * Cue object (like in html track cues)
     * @param [array || string || number] content Information stored in the cue
     * @param [number] startTime Start time of cue in seconds with 3 decimal places
     * @param [number] endTime End time of cue in seconds with 3 decimal places
    */
    var Cue = function(content, startTime, endTime)  {
      this.content = content;
      this.startTime = startTime;
      this.endTime = endTime || null;
    };

    this.addTrackToVideo = function(analysisName, videoElt, onCuechange) {
      var track = videoElt.addTextTrack('metadata', analysisName);

      this.analysisCollection[analysisName].data
        .forEach(function(cueObj, index, arr) {
          var startTime = cueObj.startTime;
          var endTime = (index === arr.length - 1) ? videoElt.duration : arr[index + 1].startTime;
          track.addCue(new VTTCue(startTime, endTime, angular.toJson(cueObj.content)));
        });

      // TODO: Use Angular Event
      track.addEventListener('cuechange', onCuechange);
    };

    this.createVtt = function(analysisName, isBlob) {
      var _this = this;
      var text = '';

      // Select analysis to write
      analysisName = analysisName || project.currentAnalysisName;
      var analysis = project.analysisCollection[analysisName];

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
            var endTime = Timecode.milisToTimecode(video.duration * 1000);
            newLine(data.startTime + ' --> ' + endTime);
          } else {
            newLine(data.startTime + ' --> ' + arr[index + 1].startTime);
          };

          newLine(angular.toJson(data.content));
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
      var zip = new JSZipLib();

      // Add project data on 'project.json'
      zip.file('project.json', angular.toJson({
        name: _this.name,
        videoSrc: _this.videoSrc,
        analysisCollection: _this.analysisCollection,
        currentAnalysisName: _this.currentAnalysisName,
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
      var video = document.getElementById('video-main');

      reader.onload = (function(file) {
        return function(evt) {
          var parsedData;
          var colorData;
          var audioData;
          var motionData;

          newZip = new JSZipLib(evt.target.result);

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

    this.sortData = function(analysisName) {
    };

    this.calculateEndTime = function(analysisName) {
      // TODO
    };
  },]);
