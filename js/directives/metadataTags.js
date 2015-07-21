(function() {
	
	angular.module('filmVizApp')
		.directive('metadataTags', function () {
			return {
				restrict: 'E',
				templateUrl: 'js/directives/templates/metadataTags.html',
				link: function(scope, element, attributes) {
					// something

					tags = [];

					Array.prototype.contains = function(element) {
					    for (var i = 0; i < this.length; i++) {
					        if (this[i] == element) {
					            return true;
					        }
					    }
					    return false;
					}

					var jotacueri = document.querySelector.bind(document);

					jotacueri("#addTag").addEventListener("click", function(){
					    newTag = document.getElementById("Tag").value; 
					    // this should affect project.project.analysis[n].tags
					    if (!tags.contains(newTag)) {
					    	tags.push(newTag);
					    	//project.analysis[activeTab].tags.push(newTag);
					    }
					    console.log(tags);
					});		
				}
			};
		});
}());
