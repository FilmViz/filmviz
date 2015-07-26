(function() {

  angular.module('filmVizApp')
    .controller('ProjectController', function() {
      this.project = project;
    });

  project = {
    name:'prueba',
    videosrc:'video.mp4',
    selectedAnalysis: 0,
    analysis: [{
      name: 'color',
      isDone: false,
      data: []
    }, {
      name: 'audio',
      isDone: false,
      data: []
    }, {
      name: 'motion',
      isDone: false,
      data: []
    }, {
      name: 'metadata1',
      isDone: false,
      tags: ['perro', 'casa', 'etiqueta'],
      data: []
    }, {
      name: 'Escalas de Plano',
      isDone: false,
      tags: ['Plano Detalle', 'Primerisimo Primer Plano', 'Primer Plano', 'Plano Corto', 'Plano Medio', 'Plano Americano', 'Plano Largo', 'Plano General', 'Gran Plano General'],
      data: []
    }]
  };

  // project = {
  //     name:'prueba',
  //     videosrc:'video.mp4',
  //     selectedAnalysis: 0,
  //     analysis: [
  //       {
  //         name:'color',
  //         isDone:false,
  //         data:[
  //             {
  //             tcIn: '00:00:30.0',
  //             tcOut: 'asd',
  //             content: {
  //               colors:['#372719','#514a3f','#6a5c45','#8b7863','#21221d','#010401','#131612','#2e3331','#596263','#a8b1b2','#b7bebe','#c6cdcd','#737b7f','#838b8f','#929a9e','#9da6aa']
  //               },
  //             },
  //             {
  //             tcIn: '00:01:00.0',
  //             tcOut: '',
  //             content: {
  //               colors:['#372719','#514a3f','#6a5c45','#8b7863','#21221d','#010401','#131612','#2e3331','#596263','#a8b1b2','#b7bebe','#c6cdcd','#737b7f','#838b8f','#929a9e','#9da6aa']
  //               },
  //             },
  //             {
  //             tcIn: '00:01:30.0',
  //             tcOut: '',
  //             content: {
  //               colors:['#372719','#514a3f','#6a5c45','#8b7863','#21221d','#010401','#131612','#2e3331','#596263','#a8b1b2','#b7bebe','#c6cdcd','#737b7f','#838b8f','#929a9e','#9da6aa']
  //               },
  //             },
  //           ]
  //       },
  //       {
  //         name:'audio',
  //         isDone:false,
  //         data:[
  //             {
  //             tc: '00:00:30.0',
  //             content: {
  //               },
  //             },
  //             {
  //             tc: '00:01:00.0',
  //             content: {
  //               },
  //             },
  //             {
  //             tc: '00:01:30.0',
  //             content: {
  //               },
  //             },
  //           ]
  //       },
  //       {
  //         name:'motion',
  //         isDone:false,
  //         data:[
  //             {
  //             tc: '00:00:30.0',
  //             content: {
  //               },
  //             },
  //             {
  //             tc: '00:01:00.0',
  //             content: {
  //               },
  //             },
  //             {
  //             tc: '00:01:30.0',
  //             content: {
  //               },
  //             },
  //           ]
  //       },
  //       {
  //         name:'metadata1',
  //         isDone:false,
  //         tags: ['perro', 'casa', 'etiqueta'],
  //         data:[
  //             {
  //             tc: '00:00:30.0',
  //             content: {
  //               text:'hola'
  //               },
  //             },
  //             {
  //             tc: '00:01:00.0',
  //             content: {
  //               text:'hola   que pasa'
  //               },
  //             },
  //             {
  //             tc: '00:01:30.0',
  //             content: {
  //               text:'eooooooooooooooooooooooooo'
  //               },
  //             },
  //           ]
  //       },
  //       {
  //         name:'Escalas de Plano',
  //         isDone:false,
  //         tags: ['Plano Detalle','Primerisimo Primer Plano', 'Primer Plano', 'Plano Corto', 'Plano Medio', 'Plano Americano', 'Plano Largo', 'Plano General', 'Gran Plano General'],
  //         data:[
  //             {
  //             tc: '00:00:00.0',
  //             content: {
  //               text:'PP'
  //               },
  //             },
  //             {
  //             tc: '00:06:00.0',
  //             content: {
  //               text:'PD'
  //               },
  //             },
  //             {
  //             tc: '00:20:00.0',
  //             content: {
  //               text:'PC'
  //               },
  //             },
  //           ]
  //       },
  //     ]
  //    };

}());
