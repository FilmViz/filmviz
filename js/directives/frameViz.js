(function() {
	
	angular.module('filmVizApp')
		.directive('frameViz', function () {
			return {
				restrict: 'E',
				templateUrl: 'js/directives/templates/frameViz.html',
				link: function(scope, element, attributes) {
					// something

					scope.data = []

					document.getElementById('video').addEventListener('ended',endHandler,false);
          
					function endHandler(e) {
						// What you want to do after the event
						project.analysis[project.selectedAnalysis].data = scope.data;
						project.analysis[project.selectedAnalysis].isDone = true;
						video.removeEventListener('ended', endHandler, false);
						vtt = fileUtils.createVtt(project);
						fileUtils.download(vtt);
          }

					scope.ultra = function () {
						if (!video.paused) {
			              console.log(project.analysis[project.selectedAnalysis].name); 
			              type = project.analysis[project.selectedAnalysis].name;
			              scope.data = colorAnalyzer.ultraAnalyzer(video, canvas, project, project.selectedAnalysis,scope.data,type);
			            }
			        };
		    	}
			};
		});
}());
