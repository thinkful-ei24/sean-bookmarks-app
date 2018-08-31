
/* globals $ */

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/sean/bookmarks';

  const createBookmark = function(title, url, success, error) {
    // create new obj from title
    const bookmark = { title, url };

    const data = {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(bookmark)
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
