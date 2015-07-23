var fileUtils = (function() {
	return {
		saveTextAsJson: function() {
			var textToWrite = JSON.stringify(localStorage);
			console.log(textToWrite);
			var textFileAsBlob = new Blob([textToWrite], {
				type: 'text/plain'
			});
			var downloadLink = document.createElement("a");
			downloadLink.innerHTML = "My Hidden Link";
			window.URL = window.URL || window.webkitURL;
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = fileUtils.destroyClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
			downloadLink.click();
		},

		createVtt: function(project, analysisIndex, Blob) {
			var analysis = (analysisIndex) ? analysisIndex : project.analysis[project.selectedAnalysis];

			var text = '';

			function newLine(string) {
				text += (string) ? string + '\n' : '\n';
			};

			newLine('WEBVTT' + ' - ' + project.name + ' - ' + analysis.name);
			newLine();

			newLine('NOTE');
			newLine('Analysis courtesy of FilmViz, ;)');
			newLine();

			for (var i = 0; i < analysis.data.length; i++) {
				newLine(i + 1);
				newLine((analysis.data[i].tcOut) ? analysis.data[i].tcIn + ' --> ' +
					analysis.data[i].tcOut : analysis.data[i].tcIn);
				newLine(JSON.stringify(analysis.data[i].content));
				newLine();
			}

			return (isBlob) ? new Blob([text], { type: 'text/plain'	}) : text;
		},

		download: function(blob, filename) {
			//filename = (filename) ? filename + ".vtt" : "vtt.vtt";
			var downloadLink = document.createElement("a");
			downloadLink.download = filename;
			window.URL = window.URL || window.webkitURL;
			downloadLink.href = window.URL.createObjectURL(blob);
			downloadLink.addEventListener('click', function(evt) {
				console.log(evt.target);
				evt.target.parent.removeChild(evt.target);
			});
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
			downloadLink.click();
		},

		getFilename: function(videoElement) {
			name = videoElement.currentSrc.split("\\");
			return name[name.length - 1];
		},

		createZip: function(project) {
			var zip = new JSZip();
			zip.file('vtt.vtt', this.createVtt(project));
			console.log(zip);
			// WIP
			return zip.generate({type:"blob"});
		}
	};
})();
