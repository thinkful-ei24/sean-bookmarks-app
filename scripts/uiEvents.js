
/* global store, domRender $ */

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

  function handleBookmarkAdd() {
    $('#bookmark-app-form').submit(event => {
      event.preventDefault();
      console.log('add button clicked');
      let jsonData = $(event.target).serializeJson();
      // TODO add logic
      domRender.showStore();
    });
  }

  function handleVisitClicked() {
    $('.bookmark-list').on('click', '.button-visit-site', event => {
      console.log('visit site');
    });
  }

  function handleDetailsClicked() {
    $('.bookmark-list').on('click', '.button-toggle-details', event => {
      console.log('toggle details');
    });
  }

  function handleDeleteClicked() {
    $('.bookmark-list').on('click', '.button-delete', event => {
      console.log('delete bookmark');
    });
  }

  // TODO handle combobox and the radiobox stars, splitting the function
  // only if it's needed
  function handleMinRatingChange() {
    $('#dropdown-rating-filter').change(event => {
      // console.log('rating changed');
      // let selectedElementName = $(event.currentTarget).JSON.parse(jsonData)['rating-filter'];
      // let rating = parseInt(selectedElementName.slice(-1), 10);
      // console.log(rating);
      console.log(parseInt(event.currentTarget.value, 10));
      store.minDisplayRating = parseInt(event.currentTarget.value, 10);
      domRender.showStore();
    });

        // $('.star-rating-filter').change(event => {

    // });
  }

  return {
    bindAllEvents
  };

}());