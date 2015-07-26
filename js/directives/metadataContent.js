(function() {

  angular.module('filmVizApp')
		.directive('metadataContent', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/directives/templates/metadataContent.html',
    link: function(scope, element, attributes) {

    }
  };
		});
}());
