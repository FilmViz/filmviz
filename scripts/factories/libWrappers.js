angular.module('filmViz')
  .factory('RgbQuantLib', [function() {
    return RgbQuant;
  },])
  .factory('ResembleLib', [function() {
    return resemble;
  },])
  .factory('D3Lib', [function() {
    return d3;
  },])
  .factory('JSZipLib', [function() {
    return JSZip;
  },]);
