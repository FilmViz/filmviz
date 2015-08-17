angular.module('filmViz')
  .controller('ProjectController', ['ProjectData', function(ProjectData) {
    'use strict';
    this.project = ProjectData;
  },])
  .service('ProjectData', ['Timecode', 'JSZipLib', '$rootScope', function(Timecode, JSZipLib, $rootScope) {
    'use strict';
    this.name = '' || 'filmviz_project';
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
      var analysis = this.analysisCollection[analysisName];
      analysis.isDone = true;
      $rootScope.$emit(analysisName + 'AnalysisLoaded', analysis.data);
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

    Cue.calculateEndTime = function(index, cues, duration) {
      var nextCue = cues[index + 1];
      return (nextCue) ? nextCue.startTime : duration;
    };

    this.addTrackToVideo = function(analysisName, videoElt) {
      var track = videoElt.addTextTrack('metadata', analysisName);

      this.analysisCollection[analysisName].data
        .forEach(function(cueObj, index, cues) {
          var startTime = cueObj.startTime;
          var endTime = Cue.calculateEndTime(index, cues, videoElt.duration);
          var cueContent = angular.toJson(cueObj.content);
          var cue = new VTTCue(startTime, endTime, cueContent);
          track.addCue(cue);
        });

      $rootScope.$emit(analysisName + 'TrackAdded', track);
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
      newLine('WEBVTT' + ' - ' + project.name + ' - ' + analysisName);
      newLine();

      // Filmviz comment
      newLine('NOTE');
      newLine('Analysis courtesy of FilmViz, ;)');
      newLine();

      // Write data
      if (analysis.data) {
        analysis.data.forEach(function(cueObj, index, cueObjs) {
          var videoElt = document.getElementById('video-main');
          var startTime = Timecode.milisToTimecode(cueObj.startTime * 1000);
          var endTime = Timecode.milisToTimecode(Cue.calculateEndTime(index, cueObjs, videoElt.duration) * 1000);

          newLine(index + 1); // WebVTT cue indexes start from one
          newLine(startTime + ' --> ' + endTime);

          newLine(angular.toJson(cueObj.content));
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
    this.readZip = function(zipBlob) {
      var _this = this;
      var reader = new FileReader();

      reader.onload = (function(file) {
        return function(evt) {
          var newZip = new JSZipLib(evt.target.result);
          var parsedData = angular.fromJson(newZip.files['project.json'].asText());
          var videoElt = document.getElementById('video-main');

          _this.name = parsedData.name;
          _this.videoSrc = parsedData.videoSrc;
          _this.analysisCollection = parsedData.analysisCollection;
          _this.currentAnalysisName = parsedData.currentAnalysisName;

          for (var analysisName in _this.analysisCollection) {
            _this.addTrackToVideo(analysisName, videoElt);
            if (_this.analysisCollection[analysisName].isDone) {
              _this.setAnalysisAsDone(analysisName);
            }
          }
        };
      }(zipBlob));

      reader.readAsArrayBuffer(zipBlob);
    };

    this.sortData = function(analysisName) {
      // TODO
    };
  },]);
