chrome.tabs.getSelected = function(tab, cb) {
  cb({ "url": "https://twitter.com" });
};

chrome.test.runTests([
  function testSample() {
    getURL(function(tab) {
      chrome.test.assertEq("http://twitter.com", tab.url);
      chrome.test.succeed();
    });
  }
]);
