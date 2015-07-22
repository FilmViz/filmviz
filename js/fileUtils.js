var fileUtils = (function() {
	return {
		saveTextAsJson: function() {
	    var textToWrite = JSON.stringify(localStorage);
	    console.log(textToWrite);
	    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	    var downloadLink = document.createElement("a");
	    downloadLink.innerHTML = "My Hidden Link";
	    window.URL = window.URL || window.webkitURL;
	    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	    downloadLink.onclick = fileUtils.destroyClickedElement;
	    downloadLink.style.display = "none";
	    document.body.appendChild(downloadLink);
	    downloadLink.click();
		},

    createVtt: function(project) {
	    var analysis = project.analysis[project.selectedAnalysis];

      var text = '';
      var newLine = function(string) {
        text += (string) ? string + '\n' : '\n';
      };

      newLine('WEBVTT' + ' - ' + project.name + ' - ' + analysis.name);
      newLine();
      for (var i = 0; i < analysis.data.length; i++) {
        newLine(i + 1);
        newLine((analysis.data[i].tcOut) ? analysis.data[i].tcIn + ' --> ' + analysis.data[i].tcOut : analysis.data[i].tcIn);
        newLine(JSON.stringify(analysis.data[i].content));
        newLine();
      }

	    var fileNameToSaveAs = "colors.vtt";
      var vttFile = new Blob([text], {type:'text/plain'});
	    return vttFile;
		},

    download: function(blob, name) {
      // var fileNameToSaveAs = "colors.vtt";
      // var downloadLink = document.createElement("a");
	    // downloadLink.download = fileNameToSaveAs;
	    // downloadLink.innerHTML = "My Hidden Link";
	    // window.URL = window.URL || window.webkitURL;
	    // downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	    // downloadLink.onclick = fileUtils.destroyClickedElement;
	    // downloadLink.style.display = "none";
	    // document.body.appendChild(downloadLink);
	    // downloadLink.click();
    },

    destroyClickedElement: function(event) {
		  document.body.removeChild(event.target);
		},

    createZip: function(analysis) {
      var zip = new JSZip();
      console.log(zip, analysis);
      // WIP
    }
	};
})();
