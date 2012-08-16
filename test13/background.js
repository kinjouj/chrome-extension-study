(function(undefined) {
  chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(req) {
      req.data.split(' ').forEach(function(name) {
        port.postMessage({ "name": name.toUpperCase() });
      });
    });
  });
})();
