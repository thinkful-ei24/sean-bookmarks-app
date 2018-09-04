
const store = (function() {

  function addBookmark(bookmark) {
    this.bookmarks.unshift(bookmark);
  }

  function findAndUpdateBookmark(id, objProperties) {
    const selectedBookmark = this.bookmarks.find(bookmark => bookmark.id === id);
    Object.assign(selectedBookmark, objProperties);
  }

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  return {
    // Data
    bookmarks: [],
    showErrorNotification: false,
    //'Bookmark names cannot be empty. Please set a valid name.',
    errorNotificationText: 'Cannot create bookmark. Please check the fields and try again.',
    selectedBookmarkId: '',
    editSelected: false,
    minDisplayRating: 0,
    adding: false,
    // Functions
    addBookmark,
    findAndUpdateBookmark,
    findAndDelete
  };

}());