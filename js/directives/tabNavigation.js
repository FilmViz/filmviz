(function() {
	
	angular.module('filmVizApp')
		.directive('tabNavigation', function () {
			return {
				restrict: 'E',
				transclude: true,
				scope: {
					items: "=",
					isDeletable: "=deletable"
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

					scope.remove = function(setTab){
						scope.activeTab = setTab;
						console.log("borrarTab", scope.activeTab);
					};

					scope.remove = function(setTab){
						scope.activeTab = setTab;
						console.log("borrarTab", scope.activeTab);
					};


					scope.analysis = {};

					scope.addAnalysis = function() {
						scope.analysis.name = prompt("Please enter analysis name", "Metadata");
						if (name != null) {
							scope.analysis.isDone = false;
							scope.analysis.data = [];
							console.log("eoooo", scope.analysis);
							project.analysis.push(this.analysis);
							scope.activeTab = 1;
						}
					}

					var button = document.getElementById("add-analysis-button");

					button.addEventListener("click", function(evt){
						evt.stopImmediatePropagation();
						evt.preventDefault();
						scope.addAnalysis();
					});	

				}
			};
		});


}());
