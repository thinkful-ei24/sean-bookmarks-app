
/* globals $ */

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/sean/bookmarks';

  const createBookmark = function(name, success, error) {
    // create new obj from name
    const bookmark = { name };

    const data = {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(bookmark),
      success, error
    };

    $.ajax(BASE_URL, data)
      .done(success)
      .fail(error);
  };

  const getBookmarks = function(id, callback) {
    $.getJSON(BASE_URL, callback);
  };

  const updateBookmark = function(id, newData, success, error) {
    const data = {
      url: '/' + id,
      method: 'PATCH',
      contentType: 'application/json',
      data: newData,
    };
    $.ajax(data)
      .done(success)
      .fail(error);
  };

  const deleteBookmark = function(id, callback) {
    const data = {
      url: '/' + id,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback
    };
    $.ajax(data);
  };

  return {
    createBookmark,
    getBookmarks,
    updateBookmark,
    deleteBookmark
  }
}());
