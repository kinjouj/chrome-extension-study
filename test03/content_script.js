var elements = document.querySelectorAll('a');

if (elements instanceof NodeList) {
  elements = Array.prototype.slice.call(elements);
}

elements.forEach(function(element) {
  if (element instanceof HTMLAnchorElement) {
    element.addEventListener('mouseover', function(event) {
      var href = this.getAttribute('href');

      if (href !== undefined && /^http(?:.+)[jpg|png]$/.test(href)) {
        chrome.extension.sendRequest({ "url": href });
      }
    });
  }
});
