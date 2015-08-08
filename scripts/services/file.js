angular.module('filmViz')
  .service('File', [function() {

    this.download = function(blob, filename) {
      window.URL = window.URL || window.webkitURL;

      // Create fake anchor tag and establish filename
      var link = document.createElement('a');
      link.download = filename || 'file';

      // Link file, hide link and add link to DOM
      link.href = window.URL.createObjectURL(blob);
      link.style.display = 'none';
      document.body.appendChild(link);

      // Remove link element from DOM after click
      link.addEventListener('click', function(evt) {
        evt.target.parentNode.removeChild(evt.target);
      });

      // Programmatically click on link --> Download starts
      link.click();
    };

    this.getMediaFilename = function(mediaElement) {
      // Route for an user file will be 'C:\fakepath\<FileName>' always
      var name = mediaElement.currentSrc.split('\\');
      return name[name.length - 1];
    };
  },]);
