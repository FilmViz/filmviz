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

					var jotacueri = document.querySelector.bind(document);

					// Menu Manual Editor event handlers

					jotacueri("#InTc").addEventListener("click", function(){
					    var cueIn = document.getElementById("cueIn");
					    cueIn.value = timecodeUtils.milisToTimecode(Math.round(video.currentTime*1000));
					    
					    var cueOut = document.getElementById("cueOut");
					    var cueDuration = document.getElementById("cueDuration");

					    cueDuration.value = timecodeUtils.calcCueDuration(cueIn.value, cueOut.value);
					});

					jotacueri("#OutTc").addEventListener("click", function(){
					    var cueOut = document.getElementById("cueOut");
					    cueOut.value = timecodeUtils.milisToTimecode(Math.round(video.currentTime*1000));
					    
					    var cueIn = document.getElementById("cueIn");
					    var cueDuration = document.getElementById("cueDuration");

					    cueDuration.value = timecodeUtils.calcCueDuration(cueIn.value, cueOut.value);
					});

					jotacueri("#NextCue").addEventListener("click", function(){
					    cueIndex += 1;
					    if (cueIndex > colorVtt.length) {
					        cueIndex = colorVtt.length;
					    }
					    colorVtt.forEach( function (vtt) {
					        if (vtt.index == cueIndex) {
					            var cueIn = document.getElementById("cueIn");
					            cueIn.value = vtt["tc"];
					            jotacueri("textarea").value = JSON.stringify(vtt["value"]);
					        }
					    });
					});

					jotacueri("#PreviousCue").addEventListener("click", function(){
					    cueIndex -= 1;
					    if (cueIndex < 1) {
					        cueIndex = 1;
					    }
					    colorVtt.forEach( function (vtt) {
					        if (vtt.index == cueIndex) {
					            var cueIn = document.getElementById("cueIn");
					            cueIn.value = vtt["tc"];
					            jotacueri("textarea").value = vtt["index"] + "\n" + JSON.stringify(vtt["value"]);
					        }
					    });
					});


					var video = document.getElementById("video");
					var canvas = document.getElementById("canvas");



					var colorVtt = [];

					var cueIndex = 1;


					jotacueri("#color-analysis").addEventListener("click", function(){
					    console.log(colorVtt);
					    colorAnalyzer.basicAnalyzer(video, canvas, colorVtt);
					});



					
				}
			};
		});





}());
