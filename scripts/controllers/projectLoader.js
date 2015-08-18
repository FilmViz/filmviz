angular.module('filmViz')
  .controller('ProjectLoader', ['ProjectData', function(ProjectData) {
    'use strict';
    var loadVideo = function(event) {
      var videoFile = event.target.files[0];
      ProjectData.videoUrl = window.URL.createObjectURL(videoFile);
    };

    var loadZip = function(event) {
      var zipFile = event.target.files[0];
      ProjectData.readZip(zipFile);
    };

    var inputLoadVideo = document.getElementById('input-load-video');
    inputLoadVideo.addEventListener('change', loadVideo, false);

    var inputLoadZip = document.getElementById('input-load-zip');
    inputLoadZip.addEventListener('change', loadZip, false);
  },]);
