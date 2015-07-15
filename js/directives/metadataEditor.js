(function() {
	
	angular.module('FilmVizApp')
		.directive('metadataEditor', function () {
			return {
				restrict: 'E',
				transclude: true,
				scope: {
					items: "="
				},
				templateUrl: 'js/directives/templates/metadataEditor.html',
				link: function(scope, element, attributes) {
					// something
					
				}
			};
		});


}());
