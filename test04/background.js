function bindPageAction(tabId) {
  chrome.pageAction.show(tabId);
}

(function(undefined) {
  chrome.tabs.onActivated.addListener(function(activeInfo) {
    bindPageAction(activeInfo.tabId);
  });

  chrome.tabs.onUpdated.addListener(function(id, changeInfo, tab) {
    if (id !== tab.id) {
      id = tab.id;
    }

    bindPageAction(id);
  });

  chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.tabs.captureVisibleTab(undefined, function(dataUrl) {
      chrome.tabs.create({ "url": dataUrl, "selected": false });
    });
  });
})();
