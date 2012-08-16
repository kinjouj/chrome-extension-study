(function(undefined) {
  document.querySelector("#btn").addEventListener("click", function() {
    var port = chrome.extension.connect({ "name": "test" });
    port.postMessage({ "data": "hoge fuga foobar" });
    port.onMessage.addListener(function(res) {
      var h = document.createElement("h2");
      h.innerText = res.name;

      document.querySelector("#names").appendChild(h);
    });
  });
})();
