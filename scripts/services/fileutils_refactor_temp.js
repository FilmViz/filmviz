fileutils refactor

----> projectData:

  method for project object:

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