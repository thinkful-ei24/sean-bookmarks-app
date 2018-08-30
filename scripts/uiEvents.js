
const events = (function() {

  function bindUIListeners() {
    handleBookmarkAdd();
    handleVisitClicked();
    handleDetailsClicked();
    handleDeleteClicked();
    handleMinRatingChange();
  }

  function handleBookmarkAdd() {
    $('.button-delete')
  }

  function handleVisitClicked() {

  }

  function handleDetailsClicked() {

  }

  function handleDeleteClicked() {
    $('.button-delete')
  }

  // TODO handle combobox and the radiobox stars, splitting the function
  // only if it's needed
  function handleMinRatingChange() {

  }

  return {
    bindAllUIListeners
  };

}());