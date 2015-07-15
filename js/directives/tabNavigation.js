(function() {
	
	angular.module('FilmVizApp')
		.directive('tabNavigation', function () {
			return {
				restrict: 'E',
				transclude: true,
				scope: {
					items: "="
				},
				templateUrl: 'js/directives/templates/tabNavigation.html',
				link: function(scope, element, attributes) {
					scope.activeTab = 0;

					scope.selectTab = function(setTab) {
						scope.activeTab = setTab;
					};

					scope.isSelected = function(checkTab){
						return scope.activeTab === checkTab;
					};
				}
			};
		});


}());
