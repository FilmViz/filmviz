(function() {
	
	angular.module('filmVizApp')
		.directive('metadataTags', function () {
			return {
				restrict: 'E',
				templateUrl: 'js/directives/templates/metadataTags.html',
			};
		});
}());
