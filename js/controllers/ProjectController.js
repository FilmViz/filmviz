(function() {
  angular.module('filmVizApp')
    .controller('ProjectController', function() {
      this.project = project;
    });

  project = {
    name: "prueba",
    videosrc: "video.mp4",
    selectedAnalysis: 0,
    analysis: [
      {
        name: "color",
        isDone: false,
        data: []
      },
      {
        name: "audio",
        isDone: false,
        data: []
      },
      {
        name: "motion",
        isDone: false,
        data: []
      },
      {
        name: "metadata1",
        isDone: false,
        tags: ["perro", "casa", "etiqueta"],
        data: []
      },
      {
        name: "Escalas de Plano",
        isDone: false,
        tags: ["Plano Detalle", "Primerisimo Primer Plano", "Primer Plano", "Plano Corto", "Plano Medio", "Plano Americano", "Plano Largo", "Plano General", "Gran Plano General"],
        data:[]
      }
    ]
  };
}());
