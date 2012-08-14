(function(undefined) {
  chrome.extension.onRequest.addListener(
    function(req, sender, res) {
      res(req.message.toUpperCase());
    }
  );
})();
