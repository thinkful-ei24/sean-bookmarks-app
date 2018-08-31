
/* global store, api, domRender, $ */

const uiEventHandlers = (function() {

  function bindAllEvents() {
    handleAddButtonClicked();
    handleBookmarkAdd();
    handleFormCancel();
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
    const form = $('#bookmark-add-form');
    form.submit(event => {
      event.preventDefault();
      const jsonData = JSON.parse(form.serializeJson());

      let newBookmark = {
        title: jsonData['bookmark-title'],
        url: jsonData['bookmark-url'],
        desc:jsonData['bookmark-descr'],
        // TODO grab rating from form
        rating: Math.floor(Math.random() * 5) + 1};

      const onSuccess = function(response) {
        newBookmark.id = response.id;
        store.addBookmark(newBookmark);
        store.showErrorNotification = false;
        store.adding = false;
        domRender.showStore();
      };

      // error callback
      const onFail = function(response) {
        store.showErrorNotification = true;
        domRender.showStore();
      };

      api.createBookmark(newBookmark, onSuccess, onFail);
    });
  }

  function handleAddButtonClicked() {
    $('.button-show-form').click(event => {
      if(store.adding) {
        if(confirm('Are you sure you want to stop adding this bookmark?')) {
          store.showErrorNotification = false;
          store.adding = false;
        }
      } else {
        store.adding = true;
      }
      domRender.showStore();
    });
  }
  
  function handleFormCancel() {
    $('#bookmark-add-form').on('click', '#button-cancel', event => {
      store.showErrorNotification = false;
      store.adding = false;
      domRender.showStore();
    });
  }

  function handleDetailsClicked() {
    $('.bookmark-list').on('click', '.button-toggle-details', event => {
      const id = getBookmarkIdFromEvent(event.currentTarget);
      const lastId = store.selectedBookmarkId;
      if(lastId === id) {
        store.selectedBookmarkId = '';
      } else {
        store.selectedBookmarkId = id;
      }

      store.showErrorNotification = false;

      domRender.showStore();
    });
  }

  function handleDeleteClicked() {
    $('.bookmark-list').on('click', '.button-delete', event => {
      const id = getBookmarkIdFromEvent(event.currentTarget);
      if(!confirm('Delete bookmark?')) {
        return;
      }

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