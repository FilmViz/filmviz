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

					scope.remove = function(tagIndex){
						scope.activeTab = tagIndex;
						var activeAnalysis = document.getElementById("activeAnalysis").innerHTML;
						activeAnalysis = parseInt(activeAnalysis);
						var r = confirm("Delete analysis???");
							if (r == true) {
							    project.analysis[activeAnalysis].tags.splice(tagIndex,1);
							}
					};

					scope.addTag = function (setTab) {
						var activeAnalysis = document.getElementById("activeAnalysis").innerHTML;
						activeAnalysis = parseInt(activeAnalysis);
						console.log(activeAnalysis);
						var newTag = prompt("Please enter analysis name", "Metadata");
						if (name != null) {
							if (project.analysis[activeAnalysis].tags) {
								if (!project.analysis[activeAnalysis].tags.contains(newTag)) {
									project.analysis[activeAnalysis].tags.push(newTag);
								}
							} else {
								project.analysis[activeAnalysis].tags.push(newTag);
							}
						}
					}
				}
			};
		});


}());
