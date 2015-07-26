(function() {
  angular.module('filmVizApp')
    .directive('timelineViz', function() {
      return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/timelineViz.html',
        link: function(scope, element, attributes) {
          d3.select('div.timeline-viz svg')
            .attr('height', '100%')
            .attr('preserveAspectRatio','xMinYMin');
        }
      };
    });
}());
