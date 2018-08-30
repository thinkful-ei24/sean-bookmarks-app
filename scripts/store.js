
const store = (function() {


  function addBookmark(bookmark) {
    this.bookmarks.push(bookmark);
  }

  function findBookmark(id) {

  }

  function findAndUpdateBookmark(id) {

  }


  return {
    // Data
    bookmarks: [],
    showErrorNotification: false,
    errorNotificationText: 'Bookmark names cannot be empty. Please set a valid name.',
    selectedBookmarkId: null,
    expandSelected: false,
    editSelected: false,
    minDisplayRating: 0,
    // Functions
    addBookmark,
    findAndUpdateBookmark,

  };

}());