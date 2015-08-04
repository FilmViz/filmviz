(function() {
  angular.module('filmViz')
    .controller('ProjectController', ['ProjectData', function(ProjectData) {
      this.project = ProjectData;
    },])
    .service('ProjectData', function() {
      function Analysis(name)  {
        this.name = name;
        this.isDone = false;
        this.data = [];
      };

      this.name = '';
      this.videoSrc = '';
      this.analysis = [
        new Analysis('color'),
        new Analysis('audio'),
        new Analysis('motion'),
      ];
      this.currentAnalysisIndex = 0;
    });
}());
