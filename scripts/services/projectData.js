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
     * @param [array || string] content Information stored in the cue
     * @param [number] tcIn start Timecode of cue in seconds with three decimal digits format
     * @param [number] tcOut end Timecode of cue in seconds with three decimal digits format
     */
    this.Cue = function(content, tcIn, tcOut)  {
      this.content = content;
      this.tcIn = tcIn;
      this.tcOut = tcOut || null;
    };

    this.name = '';
    this.videoSrc = '';
    this.analysis = [
      new this.Analysis('color'),
      new this.Analysis('audio'),
      new this.Analysis('motion'),
    ];
    this.currentAnalysisIndex = 0;
  });
