angular.module('filmViz')
  .factory('ColorQuant', [function() {
    return RgbQuant;
  },])
  .factory('ImgResemble', [function() {
    return resemble;
  },])
  .factory('Zip', [function() {
    return JSZip;
  },]);
