(function(undefined) {
  document.querySelector("#send_btn").addEventListener("click", function() {
    chrome.extension.sendRequest({ "message": "hoge" }, function(res) {
      alert(res);
    });
  });
})();
