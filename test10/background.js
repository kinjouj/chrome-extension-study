(function(undefined) {
  chrome.browserAction.onClicked.addListener(function() {
    chrome.extension.isAllowedFileSchemeAccess(function(allowed) {
      if (allowed) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "file:///home/kinjouj/.vimrc");

        xhr.onload = function() {
          alert(xhr.responseText);
        };

        xhr.send(null);
      } else {
        alert("ERROR: cannot access denied file:// url");
      }
    });
  });
})();
