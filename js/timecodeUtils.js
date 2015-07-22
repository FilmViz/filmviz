var timecodeUtils = (function() {
  return {
    calcCueDuration: function (cueIn, cueOut) {
      var cueInMilis = timecodeUtils.timecodeToMilis(cueIn);
      var cueOutMilis = timecodeUtils.timecodeToMilis(cueOut);
      cueDuration = timecodeUtils.milisToTimecode(cueOutMilis - cueInMilis);
      return cueDuration;
    },

    milisToTimecode: function (s) {

      function addZ(n) {
        return (n < 10 ? '0' : '') + n;
      }

      s = Math.floor(s);

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs) + '.' + ms;
    },

    timecodeToMilis: function (tc) {

      var hrs = +(tc.split(":")[0]);
      var min = +(tc.split(":")[1]);
      var sec = +(tc.split(":")[2]);

      seconds = sec + min * 60 + hrs * 3600;
      return seconds * 1000;
    }
  };
})();