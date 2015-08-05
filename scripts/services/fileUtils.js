var fileUtils = (function() {

  return {
    jsonToString: function(json, replacer) {

      // Prettify String output with 2 spaces
      return JSON.stringify(json, replacer, 2);
    },

    download: function(blob, filename) {
      // Create fake anchor tag
      var link = document.createElement('a');

      // Establish filename
      link.download = filename || 'file';

      // Link file
      window.URL = window.URL || window.webkitURL;
      link.href = window.URL.createObjectURL(blob);

      // Remove link element from DOM after click
      link.addEventListener('click', function(evt) {
        evt.target.parent.removeChild(evt.target);
      });

      // Hide the link
      link.style.display = 'none';

      // Add link to DOM
      document.body.appendChild(link);

      // Programmatically clicking on link --> Download starts
      link.click();
    },

    getMediaFilename: function(mediaElement) {
      // Route for an user file will be 'C:\fakepath\<FileName>' always
      name = mediaElement.currentSrc.split('\\');
      return name[name.length - 1];
    },
  };

}());
