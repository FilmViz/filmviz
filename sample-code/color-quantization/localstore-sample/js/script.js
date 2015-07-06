(function() {

var video = document.getElementById("video");
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var interval = prompt("Please insert interval in seconds", "30");		

var i = 0;

video.addEventListener('loadeddata', function() {
	canvas.height = video.videoHeight/4;
  	canvas.width = video.videoWidth/4;
    video.currentTime = i;
}, false);


video.addEventListener('seeked', function() {
    pal = convertPalette(capturePalette());

    console.log(i, pal)
    localStorage.setItem(i, pal);
    i += parseInt(interval);
    if (i <= video.duration) {
        video.currentTime = i;
    } else {
        writePaletteVtt();
    }
}, false);


function capturePalette() {
	context.drawImage(video, 0, 0, canvas.width, canvas.height);
    var src = canvas.toDataURL();
    var img = document.querySelector("#capture");
    img.src = src;
  
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


function writePaletteVtt() {
    console.log("terminado")
    //var pal = localStorage.getItem("lastname"); 
    }


function convertPalette(pal) {
    var newpalette = [];
    for (i=0; i < pal.length/4; i++) {
        color = rgbToHex(pal[i*4+0], pal[i*4+1], pal[i*4+2])
        newpalette.push(color)
        }
    return newpalette
    }


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
    }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }


})();