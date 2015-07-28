(function() {
  angular.module('filmVizApp')
    .controller('ProjectController', function() {
      this.project = project;
    });

  project = {
    selectedAnalysis: 0,
    name: 'prueba',
    videosrc: 'video.mp4',
    analysis: [
      {
        name: 'color',
        isDone: false,
        data: []
      },
      {
        name: 'audio',
        isDone: false,
        data: []
      },
      {
        name: 'motion',
        isDone: false,
        data: []
      }
    ]
  };
}());
