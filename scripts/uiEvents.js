
/* global $ */

const uiEventHandlers = (function() {

  function bindAllEvents() {
    handleBookmarkAdd();
    handleVisitClicked();
    handleDetailsClicked();
    handleDeleteClicked();
    handleMinRatingChange();
  }

  function handleBookmarkAdd() {
    $('#bookmark-app-form').submit(event => {
      event.preventDefault();
      console.log('add bookmark');
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

  }

  return {
    bindAllEvents
  };

}());