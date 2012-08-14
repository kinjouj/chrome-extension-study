(function(undefined) {
  var referrer = chrome.privacy.websites.referrersEnabled;
  referrer.set({ "value": false, "scope": "regular" });
})();
