(function(undefined) {
  chrome.extension.onRequest.addListener(function(req, sender, res) {
    console.log(req.url);

    chrome.tabs.create({ "url": req.url, "selected": false });
  });
})();
