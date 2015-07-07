(function() {

function project() {
    return {
        projectName:"",
        filename:"",
        vttFiles: [
            {
                name: '',
                data: '',
            }
        ],
        imgFiles: [
            {
                name: '',
                data: '',
            }
        ],
    };
};

function getFilename(name) {
    name = name.split("\\");
    return name[name.length-1];
}

var jotacueri = document.querySelector.bind(document);

jotacueri("#addVtt").addEventListener("click", function(){
    newVttFile = document.createElement("input");
    newVttFile.setAttribute("name", "vttFile");
    newVttFile.setAttribute("type", "file"); 
    newVttFile.setAttribute("accept", ".vtt");    
    currentDiv = document.getElementById("addVtt"); 
    currentDiv.parentNode.insertBefore(newVttFile, currentDiv);
    });

jotacueri("#createProject").addEventListener("click", function(){
    var filename = document.getElementById("filename")
    if ( filename.value ) {
        var name = getFilename(filename.value);
        console.log(name);
        vttFiles = document.getElementsByName("vttFile");
        NodeList.prototype.forEach = Array.prototype.forEach;
        //var vttFiles_array = Array.prototype.slice.call(vttFiles); // converts NodeList to Array
        vttFiles.forEach( function(vtt) {
            console.log(getFilename(vtt.value));
        });

        var projectName = document.getElementById("projectName").value
        if (!projectName) {
            projectName = filename.value;
        }
    } else {
        alert("Selecciona al menos un fichero de video")
    }
});


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
        inputNode = document.querySelector('input');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    if (!URL) {
        displayMessage('Your browser is not ' + 
           '<a href="http://caniuse.com/bloburls">supported</a>!', true);
        
        return;
    }                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    inputNode.addEventListener('change', playSelectedFile, false);
    }(window));


// Event handlers
$("#InTc").click(function(){
    var element = document.getElementsByName("cueIn")[0];
    element.value = milisToTimeCode(Math.round(video.currentTime*1000));
    calcCueDuration()
    });

$("#OutTc").click(function(){
    var element = document.getElementsByName("cueOut")[0];
    element.value = milisToTimeCode(Math.round(video.currentTime*1000));
    calcCueDuration()
    });

function calcCueDuration() {
    var cueOut = document.getElementsByName("cueOut")[0];
    var cueIn = document.getElementsByName("cueIn")[0];
    var cueDuration = document.getElementsByName("cueDuration")[0];

    cueDuration.value = cueOut.value - cueIn.value; 
}

$("#ColorAnalyzer").click(function(){
    console.log("starting color analyzer")

    var video = document.getElementById("video");
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var interval = prompt("Please insert interval in seconds", "30");		
    var i = 0;
    video.pause();
    video.currentTime = 0;

    canvas.height = video.videoHeight/2;
    canvas.width = video.videoWidth/2;
    video.currentTime = i;
    localStorage.clear();

    video.addEventListener('seeked', function() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        var img = new Image();
        img.src = canvas.toDataURL("image/jpg");

        var pal = convertPalette(capturePalette(img));
        var tc = Math.round(milisToTimeCode(i*1000));

        localStorage.setItem(tc, pal);
        console.log(tc, pal);

        i += parseInt(interval);

        if (i <= video.duration) {
            video.currentTime = i;
        } else {
            saveTextAsJson();
            saveTextAsVtt();
        }
        }, false);


    function capturePalette(img) {
        var opts = {
            colors: 16,             // desired palette size
            method: 2,               // histogram method, 2: min-population threshold within subregions; 1: global top-population
            boxSize: [64,64],        // subregion dims (if method = 2)
            boxPxls: 2,              // min-population threshold (if method = 2)
            initColors: 4096,        // # of top-occurring colors  to start with (if method = 1)
            minHueCols: 0,           // # of colors per hue group to evaluate regardless of counts, to retain low-count hues
            dithKern: null,          // dithering kernel name, see available kernels in docs below
            dithDelta: 0,            // dithering threshhold (0-1) e.g: 0.05 will not dither colors with <= 5% difference
            dithSerp: false,         // enable serpentine pattern dithering
            palette: [],             // a predefined palette to start with in r,g,b tuple format: [[r,g,b],[r,g,b]...]
            reIndex: false,          // affects predefined palettes only. if true, allows compacting of sparsed palette once target palette size is reached. also enables palette sorting.
            useCache: true,          // enables caching for perf usually, but can reduce perf in some cases, like pre-def palettes
            cacheFreq: 10,           // min color occurance count needed to qualify for caching
            colorDist: "euclidean",  // method used to determine color distance, can also be "manhattan"
        };
        var q = new RgbQuant(opts);
        // analyze histograms
        q.sample(img);
        // build palette
        var pal = q.palette();
        return pal
      }


    function convertPalette(pal) {
        var newpalette = [];
        for (var index=0; index < pal.length/4; index++) {
            color = rgbToHex(pal[index*4+0], pal[index*4+1], pal[index*4+2]);
            newpalette.push(color);
            }
        return newpalette;
        }


    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
        }


    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

    });


function milisToTimeCode(s) {

    function addZ(n) {
        return (n<10? '0':'') + n;
        }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs) + '.' + ms;
    }


function saveTextAsJson() {
    var textToWrite = JSON.stringify(localStorage);
    console.log(textToWrite);
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = "colors.json";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "My Hidden Link";
    window.URL = window.URL || window.webkitURL;
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    }


function saveTextAsVtt() {
    var textToWrite = "" // JSON.stringify(localStorage);
    textToWrite += "WEBVTT\n\n";

    for(var key in localStorage) {
        textToWrite += key+"\n";
        val = localStorage.getItem(key); 
        textToWrite += "{\n"+JSON.stringify(val)+"\n}\n"+"\n";
    }
    console.log(textToWrite);

    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = "colors.vtt";
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "My Hidden Link";
    window.URL = window.URL || window.webkitURL;
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    }


function destroyClickedElement(event) { 
    document.body.removeChild(event.target);
    }


})();