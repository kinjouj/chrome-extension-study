(function(undefined) {
  document.querySelector("#btn").addEventListener("click", function() {
    chrome.extension.sendRequest({ "message": "hoge" }, function(res) {
      alert(res);
    });
  });
})();
