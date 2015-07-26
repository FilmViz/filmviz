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
        analysis.data.forEach(function(data, index) {
          newLine(index + 1);
          newLine((data.tcOut) ? data.tcIn + ' --> ' + data.tcOut : data.tcIn);
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

      return zip.generate({
        type: 'blob'
      });
    }
  };
}());
