
/* globals store, $ */

const domRender = (function() {

  // main renderer call
  function renderMain() {
    let items = store.bookmarks;

    const errorMessageContainer = $('.error-message-container');
    if(store.showErrorNotification) {
      errorMessageContainer.html(generateErrorMessageBlock());
    } else {
      errorMessageContainer.html('');
    }

    // form drawing
    const form = $('#bookmark-add-form');
    if(store.adding) {
      if(form.is(':empty')) {
        form.html(generateFormContents());
        form.removeClass('hidden');
      }
    } else {
      form.html('');
      form.addClass('hidden');
    }


    // rating filter
    let minRating = store.minDisplayRating;
    if(minRating > 0) {
      items = items.filter(bookmark => bookmark.rating >= minRating);
    }

    // block expand
    if(store.expandSelected && store.selectedBookmarkId) {
      //items.indexOf()
      // console.log(items.shift());
      // tempBlock = generateListBlock(items.shift(), true, false);
    }

    // render condensed
    const renderedHtml = items.map(bookmark => generateListBlock(bookmark, store.selectedBookmarkId))
      .join('');
    $('.bookmark-list').html(renderedHtml);
  }

  function generateErrorMessageBlock() {
    return `<span class="error-message">${store.errorNotificationText}</span>`;
  }

  function generateListBlock(bookmark, selectedBookmarkId) {
    let isExpandedBlock = false;
    if(selectedBookmarkId) {
      isExpandedBlock = (bookmark.id === selectedBookmarkId);
    }

    let titleField;
    if(store.editSelected) {
      if(bookmark.title) {
        titleField = `<input type="text" placeholder="${bookmark.title}" value=${bookmark.title} class="bookmark-edit-title"></input>`;
      } else {
        titleField = '<input type="text" placeholder="Bookmark title" value="" class="bookmark-edit-title-"></input>';
      }
    } else {
      titleField = bookmark.title;
    }

    const stars = '&#9733;'.repeat(bookmark.rating) + '&#9734;'.repeat(5-bookmark.rating);
    return `<li class="bookmark-block" data-item-id="${bookmark.id}">
      <div class="bookmark-block-titleinfo"
        <h2>${titleField}</h2>
        <span class="rating" data-rating=${bookmark.rating}>${stars}</span>
        <button class="button-delete">Delete</button>
      </div>
      ${isExpandedBlock ? generateDescription(bookmark.desc) : ''}
      <div class="bookmark-bottom-nav">
        ${isExpandedBlock ? generateVisitButton(bookmark.url) : ''}
        <button class="button-toggle-details">${isExpandedBlock ? 'Hide details' : 'Show details'}</button>
      </div>
    </li>`;
  }

  function generateFormContents() {
    return `
      <fieldset class="form-content">
        <legend>Add a new bookmark</legend>
        <label for="bookmark-title-field">Title</label>
        <input type="text" placeholder="Bookmark title" id="bookmark-title" name="bookmark-title">
        <label for="bookmark-url">URL</label>
        <input type="text" placeholder="http://www.google.com" id="bookmark-url" name="bookmark-url">
        <label for="bookmark-descr">Details</label>
        <input type="text" rows="3" placeholder="Bookmark description" id="bookmark-descr" name="bookmark-descr">
        <label for="rating-selector">Rating</label>
        <fieldset name="choose-rating" id="rating-selector">
          <input type="radio" name="set-rating" class="star-rating" value="1"><label for="1-star"></label>
          <input type="radio" name="set-rating" class="star-rating" value="2"><label for="2-star"></label>
          <input type="radio" name="set-rating" class="star-rating" value="3"><label for="3-star"></label>
          <input type="radio" name="set-rating" class="star-rating" value="4"><label for="4-star"></label>
          <input type="radio" name="set-rating" class="star-rating" value="5"><label for="5-star"></label>
        </fieldset>
        <input type="submit" value="Create new bookmark">
        <button type="button" id="button-cancel">Cancel</button>
      </fieldset>`;
  }
  
  // // TODO set a selected bookmark id and just check against that
  // function generateListBlock(bookmark, expanded=false, editable=false) {
  //   // TODO is it better to split stars into individual spans? That may be
  //   // needed for the component. For now, just add and track them manually
  //   const stars = '&#9734;'.repeat(5-bookmark.rating) + '&#9733;'.repeat(bookmark.rating);
  //   return `<li class="bookmark-block" data-item-id="${bookmark.id}">
  //     <div class="bookmark-top-container">
  //       <button class="button-delete">Delete</button>
  //       <h2>${bookmark.title}</h2>
  //       <span class="rating" data-rating=${bookmark.rating}>${stars}</span>
  //     </div>
  //     ${expanded ? generateDescription(bookmark.desc) : ''}
  //     <div class="bookmark-bottom-nav">
  //       ${expanded ? generateVisitButton(bookmark.url) : ''}
  //       <button class="button-toggle-details">${expanded ? 'Hide details' : 'Show details'}</button>
  //     </div>
  //   </li>`;
  // }

  function generateVisitButton(url) {
    return `<button class="button-visit-site"><a href="${url}" target="_blank">Visit site</a></button>`;
  }

  function generateDescription(description) {
    return `<h3 class="bookmark-details">Details</h3>
    <p>${description}</p>`;
  }

  console.log('render module created');
  return {
    showStore: renderMain
  };
}());