function getURL(cb) {
  chrome.tabs.getSelected(undefined, function(tab) {
    cb(tab);
  });
}
