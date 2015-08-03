(function() {
  angular.module('filmViz')
    .controller('ProjectController', ['ProjectData', function(ProjectData) {
      this.project = ProjectData;
    }])
    .service('ProjectData', function () {
      this.selectedAnalysis = 0;
      this.name = '';
      this.videoSrc = '';
      this.analysis = [
        {
          name: 'color',
          isDone: false,
          data: [],
        },
        {
          name: 'audio',
          isDone: false,
          data: [],
        },
        {
          name: 'motion',
          isDone: false,
          data: [],
        },
      ];
    });
}());
