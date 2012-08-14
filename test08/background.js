(function(undefined) {
  chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
      details.requestHeaders.forEach(function(header) {
        if ("name" in header && header.name === "User-Agent") {
          header.value = "Android";
        }
      });

      console.log(details.requestHeaders);

      return { "requestHeaders": details.requestHeaders };
    },
    { "urls": ["*://*/*"] },
    ["requestHeaders", "blocking"]
  );
})();
