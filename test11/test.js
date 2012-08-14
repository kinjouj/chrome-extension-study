function alertCurrentTabURL(tab) {
  if ((tab !== undefined && tab !== null) && typeof(tab) === "object") {
    if ("url" in tab) {
      var url = tab.url;

      if (typeof(url) === "string") {
        return url;
      }
    }
  }

  return null;
}
