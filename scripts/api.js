
/* globals $ */

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/sean/bookmarks';

  const createBookmark = function(bookmarkInfo, success, error) {
    // create new obj from title

    console.log(JSON.stringify(bookmarkInfo));
    const data = {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(bookmarkInfo)
    };

    $.ajax(BASE_URL, data)
      .done(success)
      .fail(error);
  };

  const getBookmarks = function(callback) {
    $.getJSON(BASE_URL, callback);
  };

  const updateBookmark = function(id, newData, success, error) {
    const data = {
      url: '/' + id,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(newData)
    };
    $.ajax(BASE_URL + '/' + id, data)
      .done(success)
      .fail(error);
  };

  const deleteBookmark = function(id, callback) {
    const data = {
      method: 'DELETE',
      contentType: 'application/json',
      success: callback
    };
    $.ajax(BASE_URL + '/' + id, data);
  };

  console.log('api module created');
  return {
    createBookmark,
    getBookmarks,
    updateBookmark,
    deleteBookmark
  };
}());
