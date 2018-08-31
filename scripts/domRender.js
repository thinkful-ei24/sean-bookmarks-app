
/* globals store, $ */

const domRender = (function() {

  // main renderer call
  function renderMain() {
    let items = store.bookmarks;

    // form drawing
    if(store.adding) {
      if($('#bookmark-add-form').is(':empty')) {
        $('#bookmark-add-form').html(generateAddFormContents());
      }
    } else {
      $('#bookmark-add-form').html('');
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

  function generateAddFormContents() {
    return `
    <fieldset>
      <legend>Add a new bookmark</legend>
      <input type="text" placeholder="Bookmark title" id="bookmark-title" name="bookmark-title">
      <label for="bookmark-title-field">
      <input type="text" placeholder="http://www.google.com" id="bookmark-url" name="bookmark-url">
      <label for="bookmark-url-field">
      <input type="text" placeholder="Bookmark description" id="bookmark-descr" name="bookmark-descr">
      <label for="bookmark-descr"></label>
      <fieldset class="rating" name="rating-selector" id="rating-selector">
        <input type="radio" name="1-star" class="star-rating"><label for="1-star"></label>
        <input type="radio" name="2-star" class="star-rating"><label for="2-star"></label>
        <input type="radio" name="3-star" class="star-rating"><label for="3-star"></label>
        <input type="radio" name="5-star" class="star-rating"><label for="4-star"></label>
        <input type="radio" name="4-star" class="star-rating"><label for="5-star"></label>
      </fieldset>
      <input type="submit" value="Create new bookmark">
      <button type="button" id="button-cancel">Cancel</button>
    </fieldset>`;
  }
  // TODO use this
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

    const stars = '&#9734;'.repeat(5-bookmark.rating) + '&#9733;'.repeat(bookmark.rating);
    return `<li class="bookmark-block" data-item-id="${bookmark.id}">
      <div class="bookmark-top-container">
        <button class="button-delete">Delete</button>
        <h2>${titleField}</h2>
        <span class="rating" data-rating=${bookmark.rating}>${stars}</span>
      </div>
      ${isExpandedBlock ? generateDescription(bookmark.desc) : ''}
      <div class="bookmark-bottom-nav">
        ${isExpandedBlock ? generateVisitButton(bookmark.url) : ''}
        <button class="button-toggle-details">${isExpandedBlock ? 'Hide details' : 'Show details'}</button>
      </div>
    </li>`;
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
    return `<button class="button-visit-site"><a href="${url}">Visit site</a></button>`;
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