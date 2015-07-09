(function() {

NodeList.prototype.forEach = NodeList.prototype.forEach
    || Array.prototype.forEach;


var video = document.getElementById("video");
var canvas = document.getElementById("canvas");
var filenameToSaveAs = "colors.vtt"

function project(projectName, filename, vttFiles) {
    var refactoredVttFiles = lkjhklsjdfh
    return {
        projectName: projectName,
        filename: filename,
        vttFiles: refactoredVttFiles,
        imgFiles: [],
    };
};

function getFilename(name) {
    name = name.split("\\");
    return name[name.length-1];
}


// load local video
(function localFileVideoPlayerInit(win) {
    var URL = win.URL || win.webkitURL,
        displayMessage = (function displayMessageInit() {
            var node = document.querySelector('#message');
            return function displayMessage(message, isError) {
                node.innerHTML = message;
                node.className = isError ? 'error' : 'info';
            };
        }()),
        playSelectedFile = function playSelectedFileInit(event) {
            var file = this.files[0];
            var type = file.type;
            var videoNode = document.querySelector('video');
            var canPlay = videoNode.canPlayType(type);
            canPlay = (canPlay === '' ? 'no' : canPlay);
            var message = 'Can play type "' + type + '": ' + canPlay;
            var isError = canPlay === 'no';
            displayMessage(message, isError);
            if (isError) {
                return;
            }
            var fileURL = URL.createObjectURL(file);
            videoNode.src = fileURL;
        },
        inputNode = document.querySelector('#button-movie-file');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    if (!URL) {
        displayMessage('Your browser is not ' + 
           '<a href="http://caniuse.com/bloburls">supported</a>!', true);        
        return;
    }                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    inputNode.addEventListener('change', playSelectedFile, false);
    }(window));


// Event handlers

var jotacueri = document.querySelector.bind(document);

// Menu Init event handlers

jotacueri("#button-init-project").addEventListener("click", function(){
    sectionInit = jotacueri("#menu-init");
    sectionCreate = jotacueri("#menu-create");
    sectionCreate.className = "";
    sectionInit.className = "hidden";
});

// Menu Create event handlers

jotacueri("#addVtt").addEventListener("click", function(){
    newVttFile = document.createElement("input");
    newVttFile.setAttribute("name", "vttFile");
    newVttFile.setAttribute("class", "button button-primary");
    newVttFile.setAttribute("type", "file"); 
    newVttFile.setAttribute("accept", ".vtt");    
    currentDiv = document.getElementById("addVtt").parentNode; 
    currentDiv.parentNode.insertBefore(newVttFile, currentDiv);
});

jotacueri("#button-create-project").addEventListener("click", function(){
    var filename = document.getElementById("button-movie-file")
    if ( filename.value ) {
        var name = getFilename(filename.value);
        console.log(name);
        vttFiles = document.getElementsByName("vttFile");
        //var vttFiles_array = Array.prototype.slice.call(vttFiles); // converts NodeList to Array
        vttFiles.forEach( function(vtt) {
            console.log(getFilename(vtt.value));
        });

        var projectName = document.getElementById("projectName").value
        if (!projectName) {
            projectName = filename.value;
        }
        sectionCreate = jotacueri("#menu-create");
        sectionMain = jotacueri("#menu-main");
        sectionCreate.className = "hidden";
        sectionMain.className = "";
    } else {
        alert("Selecciona al menos un fichero de video")
    }
});

// Menu Main event handlers

// video controls

jotacueri("#button-pause").addEventListener("click", function(){
    video.pause();
});

jotacueri("#button-play-forward").addEventListener("click", function(){
    video.play();
});

// main options

jotacueri("#button-create-analysis").addEventListener("click", function(){
    sectionEditor = jotacueri("#menu-manual-editor");
    sectionAnalysis = jotacueri("#menu-analysis");
    sectionEditor.className = "hidden";
    if (sectionAnalysis.className == "") {
        sectionAnalysis.className = "hidden";
    } else {
        sectionAnalysis.className = "";
    }
});

jotacueri("#button-edit-vtt").addEventListener("click", function(){
    sectionEditor = jotacueri("#menu-manual-editor");
    sectionAnalysis = jotacueri("#menu-analysis");
    sectionAnalysis.className = "hidden";
    if (sectionEditor.className == "hidden") {
        sectionEditor.className = "";
    } else {
        sectionEditor.className = "hidden";
    }
});

jotacueri("#button-save-project").addEventListener("click", function(){
    // 
    // save zip file
    //
});

jotacueri("#button-new-project").addEventListener("click", function(){
    sectionCreate = jotacueri("#menu-create");
    sectionMain = jotacueri("#menu-main");
    sectionEditor = jotacueri("#menu-manual-editor");
    sectionAnalysis = jotacueri("#menu-analysis");
    sectionEditor.className = "hidden";
    sectionAnalysis.className = "hidden";
    sectionMain.className = "hidden";
    sectionCreate.className = "";
});

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

// Menu Analysis event handlers


jotacueri("#color-analysis").addEventListener("click", function(){
    colorAnalyzer.basicAnalyzer(video, canvas, filenameToSaveAs);
});


})();