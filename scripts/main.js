
/* global store, api, uiEventHandlers, domRender $ */

$(document).ready(function() {

  uiEventHandlers.bindAllEvents();
  domRender.showStore();
  
  api.getBookmarks((bookmarks) => {
    console.log(bookmarks);
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    domRender.showStore();
  });
});