(function() {
	
	angular.module('filmVizApp')
		.directive('videoPlayer', function () {
			return {
				restrict: 'E',
				templateUrl: 'js/directives/templates/videoPlayer.html',
				link: function(scope, element, attributes) {
					var video = document.getElementById("video");
          var canvas = document.getElementById("canvas");

					scope.play = function () {
						video.play();
					};
					scope.stop = function () {
						video.stop();
					};
					scope.seek = function (second) {
						video.currentTime(second);
					};

				
		    	}

		   
			};
		});
}());
