
const store = (function() {

  function addBookmark(bookmark) {
    this.bookmarks.unshift(bookmark);
  }

  function findAndUpdateBookmark(id, objProperties) {
    const selectedBookmark = this.bookmarks.find(bookmark => bookmark.id === id);
    Object.assign(selectedBookmark, objProperties);
  }

  function findBookmark(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  }

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  console.log('store module created');
  return {
    // Data
    bookmarks: [],
    showErrorNotification: false,
    errorNotificationText: 'Bookmark names cannot be empty. Please set a valid name.',
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