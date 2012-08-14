(function(undefined) {
  chrome.tabs.captureVisibleTab(undefined, function(dataUrl) {
    chrome.tabs.create({ "url": dataUrl, "selected": false });
  });
})();
