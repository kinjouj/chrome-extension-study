function registerBookmarkMenu(bookmark, menuId) {
  if ("children" in bookmark) {
    if (bookmark.children.length > 0) {
      var id = chrome.contextMenus.create({
        "title": bookmark.title,
        "parentId": menuId,
        "onclick": function(info, tab) {
        }
      });

      bookmark.children.forEach(function(subBookmark) {
        registerBookmarkMenu(subBookmark, id);
      });
    }
  } else {
    var title = bookmark.title.length > 0 ? bookmark.title : bookmark.url;

    chrome.contextMenus.create({
      "type": "normal",
      "title": title,
      "parentId": menuId,
      "onclick": function(info, tab) {
        chrome.tabs.create({ "url": bookmark.url, "selected": false });
      }
    });
  }
}

(function(undefined) {
  var id = chrome.contextMenus.create({ "title": "bookmark" });

  chrome.bookmarks.getTree(function(results) {
    results.forEach(function(result) {
      if ("children" in result) {
        result.children.forEach(function(bookmark) {
          registerBookmarkMenu(bookmark, id);
        });
      }
    });
  });
})();
