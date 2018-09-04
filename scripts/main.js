
/* global store, api, uiEventHandlers, render $ */

$(document).ready(function() {

  uiEventHandlers.bindAllEvents();
  render.showStore();
  
  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    render.showStore();
  });
});