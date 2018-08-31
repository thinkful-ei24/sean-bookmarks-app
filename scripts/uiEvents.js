
/* global store, api, domRender, $ */

const uiEventHandlers = (function() {

  function bindAllEvents() {
    handleBookmarkAdd();
    handleVisitClicked();
    handleDetailsClicked();
    handleDeleteClicked();
    handleMinRatingChange();
  }

  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const singleObject = {};
      formData.forEach((val, name) => singleObject[name] = val);
      return JSON.stringify(singleObject);
    }
  });

  function getBookmarkIdFromEvent(innerButton) {
    return $(innerButton).closest('.bookmark-block').data('item-id');
  }

  function handleBookmarkAdd() {
    $('#bookmark-app-form').submit(event => {
      event.preventDefault();
      store.editSelected = true;
      store.expandSelected = true;

      // TODO: BOOKMARK INFO ISN'T TAKEN FROM FIELDS
      let newBookmark = {
        title:'New bookmark', url:'https://www.google.com', desc:'Hardcoded bookmark info',
        rating: Math.floor(Math.random() * 5) + 1};

      const onSuccess = function(response) {
        console.log(response.id);
        newBookmark.id = response.id;
        // store.selectedBookmarkId = newBookmark.id;
        store.addBookmark(newBookmark);
        // resest ui state
        store.editSelected = false;
        store.expandSelected = false;
        domRender.showStore();
      };

      // error callback
      const onFail = function(response) {
        console.log('name not valid. server rejected post');
        domRender.showStore();
      };

      api.createBookmark(newBookmark, onSuccess, onFail);
    });
  }

  function handleVisitClicked() {
    $('.bookmark-list').on('click', '.button-visit-site', event => {
      console.log('visit site');
    });
  }

  function handleDetailsClicked() {
    $('.bookmark-list').on('click', '.button-toggle-details', event => {
      const id = getBookmarkIdFromEvent(event.currentTarget);
      store.selectedBookmarkId = id;
      store.expandSelected = !store.expandSelected;
      console.log(store.expandSelected);
      domRender.showStore();
      console.log('toggle details');
    });
  }

  function handleDeleteClicked() {
    $('.bookmark-list').on('click', '.button-delete', event => {
      const id = getBookmarkIdFromEvent(event.currentTarget);
      console.log(id);
      api.deleteBookmark(id, () => {
        store.findAndDelete(id);
        domRender.showStore();
      });
    });
  }

  function handleMinRatingChange() {
    $('#dropdown-rating-filter').change(event => {
      store.minDisplayRating = parseInt(event.currentTarget.value, 10);
      domRender.showStore();
    });

    // $('.star-rating-filter').change(event => {

    // });
  }

  console.log('event module created');
  return {
    bindAllEvents
  };

}());