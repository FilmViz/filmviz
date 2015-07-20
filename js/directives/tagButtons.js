(function() {
	
	angular.module('filmVizApp')
		.directive('tagButtons', function () {
			return {
				restrict: 'E',
				scope: {
					tags: "="
				},
				templateUrl: 'js/directives/templates/tagButtons.html',
				link: function(scope, element, attributes) {
					scope.activeTab = 0;

					scope.selectTab = function(setTab) {
						scope.activeTab = setTab;
					};

					scope.isSelected = function(checkTab){
						return scope.activeTab === checkTab;
					};

					scope.remove = function(setTab){
						scope.activeTab = setTab;
						console.log("borrar", scope.activeTab);
					};
				}
			};
		});


}());
