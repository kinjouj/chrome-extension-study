(function(undefined) {
  chrome.browserAction.onClicked.addListener(function() {
    chrome.experimental.socket.create(
      "tcp",
      {},
      function (sock) {
        chrome.experimental.socket.connect(
          sock.socketId,
          "localhost",
          5555,
          function(result) {
            var bb = new WebKitBlobBuilder();
            bb.append("hoge");

            var fr = new FileReader();
            fr.onload = function(e) {
              chrome.experimental.socket.write(
                sock.socketId,
                e.target.result,
                function() {}
              );
            };
            fr.readAsArrayBuffer(bb.getBlob());

            chrome.experimental.socket.read(
              sock.socketId,
              1024,
              function(response) {
                if (response.resultCode != 5) {
                  return;
                }

                console.log(response);

                var data = new Uint8Array(response.data);
                var str = '';

                for (var i = 0; i < data.byteLength; i++) {
                  str += String.fromCharCode(data[i]);
                }

                console.log(str);
              }
            );
          }
        );
      }
    );
  });
})();
