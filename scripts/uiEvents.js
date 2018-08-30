
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
    $('.button-visit-site').click(event => {
      console.log('visit site');
    });
  }

  function handleDetailsClicked() {
    $('.button-toggle-details').click(event => {
      console.log('toggle details');
    });
  }

  function handleDeleteClicked() {
    $('.button-delete').click(event => {
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