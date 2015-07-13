var fileUtils = ( function(){
 
 	
 
	return {
		

		saveTextAsJson : function () {
		    var textToWrite = JSON.stringify(localStorage);
		    console.log(textToWrite);
		    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
		    var downloadLink = document.createElement("a");
		    downloadLink.innerHTML = "My Hidden Link";
		    window.URL = window.URL || window.webkitURL;
		    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		    downloadLink.onclick = fileUtils.destroyClickedElement;
		    downloadLink.style.display = "none";
		    document.body.appendChild(downloadLink);
		    downloadLink.click();
		    },


		saveTextAsVtt : function () {
		    var textToWrite = "" // JSON.stringify(localStorage);
		    textToWrite += "WEBVTT\n\n";
		    
		    for(var key in localStorage) {
		        textToWrite += key+"\n";
		        val = localStorage.getItem(key); 
		        textToWrite += "{\n"+JSON.stringify(val)+"\n}\n"+"\n";
		    }
		    console.log(textToWrite);
		    var fileNameToSaveAs = "colors.vtt";
		    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
		    var downloadLink = document.createElement("a");
		    downloadLink.download = fileNameToSaveAs;
		    downloadLink.innerHTML = "My Hidden Link";
		    window.URL = window.URL || window.webkitURL;
		    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		    downloadLink.onclick = fileUtils.destroyClickedElement;
		    downloadLink.style.display = "none";
		    document.body.appendChild(downloadLink);
		    downloadLink.click();
		    },


		destroyClickedElement : function (event) { 
		    document.body.removeChild(event.target);
		    }


	}
})();