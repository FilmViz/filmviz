(function() {

  angular.module('filmVizApp')
		.directive('timelineViz', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/templates/timelineViz.html',
    link: function(scope, element, attributes) {

      var svg = document.querySelector('div.timeline-viz svg');

      switch (project.selectedAnalysis) {
        case 0:  // Color analysis
          break;
        default:
          console.log('Patata');
      }
      scope.pepe = function() {
        console.log('esta es la ejecucion', svg);
      };

      scope.pepe();
    }
  };
		});
}());
