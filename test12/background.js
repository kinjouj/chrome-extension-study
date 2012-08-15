(function(undefined) {
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log(changes);
    console.log(namespace);
  });

  chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.local.get(["value"], function(item) {
      var n = 0;

      if ("value" in item) {
        n = parseInt(item.value);
      }

      chrome.storage.local.set({ "value": (n + 1) });

      console.log(n);
    });
  });
})();
