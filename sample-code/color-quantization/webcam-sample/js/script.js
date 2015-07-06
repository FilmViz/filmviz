(function(){


  // var webcamStream;
  var video = document.querySelector("#video");
  var canvas = document.querySelector("#canvas");
  var context = canvas.getContext("2d");

  function startVideo() {
     navigator.webkitGetUserMedia({audio: true, video: true},
       successCallback, errorCallback);
     function successCallback(stream) {
         video.src = window.URL.createObjectURL(stream);
         // webcamStream = stream;
     }
     function errorCallback(error) {
         console.error('An error occurred: [CODE ' + error.code + ']');
     }
  }

  function stopVideo() {
    video.src = "";
  }


  function drawVideoToCanvas(){
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    var pixelData = context.getImageData(0, 0, canvas.width, canvas.height);
    //pixelData.data = convertToGrayScale(pixelData.data);
    //context.putImageData(pixelData, 0, 0);
    setTimeout(drawVideoToCanvas, 50);
  }

  function captureImage() {
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

    console.log(pal);

    drawpalette(pal)
  }

  function drawpalette(pal) {
    $( ".square" ).remove();

    for (i=0; i < pal.length/4; i++) {
      newsquare = document.createElement("div"); 
      color = rgbToHex(pal[i*4+0], pal[i*4+1], pal[i*4+2])
      var style = 'background-color:'+color
      newsquare.setAttribute("style", style);
      newsquare.setAttribute("class", "square");
      
      // add the newly created element and its content into the DOM 
      var currentDiv = document.getElementById("palette"); 
      document.body.insertBefore(newsquare, currentDiv); 
       
      }
    }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  // Event handlers
  $("#start-button").click(function(){
    startVideo();
    drawVideoToCanvas();
  });

  $("#stop-button").click(function(){
    stopVideo();
  });

  $("#capture-button").click(function(){
    captureImage();
  });


})();