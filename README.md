# Filmviz


## Description

The final aim of this project is to build an online database of film analysis that allows users to visually compare different aspects of films, such as their main colors, their motion or rhythm through the number of cuts, the amount of dialogue and music, etc.

The project is inspired by a number of independent analysis of different films that are available out there (such as [this](http://moviesincolor.com/), [this](http://moviebarcode.tumblr.com/), [this](http://www.smartjava.org/examples/movie-viz/index.html) or [this](http://www.smartjava.org/examples/movie-viz/batman.html)). We want to provide a common tool for film analysis and comparison to the community.


## Objectives

The first logical step is to build a **film analysis tool**. The tool will run locally in the browser and will perform automatic color, motion and audio analysis, and will also allow the user to manually input additional metadata (such as types of camera shots, actors in the shots or a day/night classification). The tool will show visualizations for all the data gathered as well. Once the analysis is done, the user will be able to share it by uploading it to an online database.

The second part of the project would be to build an **online film analysis database**, to which users will upload the analysis performed locally with the tool. A website will display visualizations for all the film analysis uploaded, and will allow users to see comparisons between films.


## Findings

We run some tests to figure out an acceptable sample rate for the motion analysis, since we needed to find the right balance between accuracy and the time the analysis takes: getting a lot of samples per second would make the analysis unbearably slow, but getting too few would affect our ability to detect cuts in the video.

We performed a few motion analysis for the same one minute video with different sample rates. The results can be seen in the graph below (the x axis is time, while the y axis indicates the motion difference between two samples, ranging from 0 to 1). The video used for testing has two cuts, around second 6 and second 20.

![Sample rates graph](sample_rates_for_motion.png) 

- For 2000 ms, the analysis took 8.143 s (13.6% of the video duration)
- For 1000 ms, the analysis took 17.119 s (28.5% of the video duration)
- For 500 ms, the analysis took 36.136 s (60,2% of the video duration)
- For 250 ms, the analysis took 71.847 s (120% of the video duration)
- For 100 ms, the analysis took 182.665 s (304% of the video duration)

We concluded that getting a frame every half second (500 ms) will be good enough for our application. This conclusion is however susceptible of being revisited in the future.


## Documentation

### WebVTT
- http://dev.w3.org/html5/webvtt/
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Video_Text_Tracks_Format

### Color analysis
- http://moviesincolor.com/
- http://moviebarcode.tumblr.com/page/7
- http://thecreatorsproject.vice.com/blog/visualizing-a-movies-color-footprint
- http://www.smartjava.org/examples/movie-viz/index.html
- http://www.smartjava.org/examples/movie-viz/batman.html
- http://www.smartjava.org/content/movie-color-analysis-xbmc-boblight-java-and-d3js
- https://en.wikipedia.org/wiki/Color_quantization
- http://www.runtime-era.com/2011/11/grouping-html-hex-colors-by-hue-in.html
- http://paletton.com/widget/

### Motion analysis
- http://cinemetrics.lv/cinemetrics.php
- http://huddle.github.io/Resemble.js/

### Audio analysis
- https://en.wikipedia.org/wiki/Voice_activity_detection
- http://dsp.stackexchange.com/questions/1499/how-to-extract-vocal-part-from-stereo-audio-signal
- https://www.math.ucdavis.edu/~aberrian/research/voice_separation/
- https://github.com/corbanbrook/dsp.js/

### Metadata analysis
- http://fathom.info/rocky/