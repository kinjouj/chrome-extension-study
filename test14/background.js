(function(undefined) {
  chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.experimental.infobars.show(
        {
          "path": "infobar.html",
          "tabId": tab.id
        },
        function(w) {
          console.log(w);
        }
      );
    });
  });
})();
