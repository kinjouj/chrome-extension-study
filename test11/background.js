(function(undefined) {
  initBackground();
})();

function initBackground(cb) {
  chrome.browserAction.onClicked.addListener(function(tab) {
    var url = alertCurrentTabURL(tab);

    if (typeof(cb) === "function") {
      cb(url);
    } else {
      alert(url);
    }
  });
}
