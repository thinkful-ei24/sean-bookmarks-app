
/* globals store, $ */

const domRender = (function() {

  // main renderer call
  function renderMain() {
    let items = store.bookmarks;

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
    const renderedHtml = items.map(bookmark => generateListBlock(bookmark, true))
      .join('');
    $('.bookmark-list').html(renderedHtml);
  }

  // TODO use this
  function generateListBlock(bookmark, selectedBookmarkId) {

  }
  
  // TODO set a selected bookmark id and just check against that
  function generateListBlock(bookmark, expanded=false, editable=false) {
    // TODO is it better to split stars into individual spans? That may be
    // needed for the component. For now, just add and track them manually
    const stars = '&#9734;'.repeat(5-bookmark.rating) + '&#9733;'.repeat(bookmark.rating);
    return `<li class="bookmark-block" data-item-id="${bookmark.id}">
      <div class="bookmark-top-container">
        <button class="button-delete">Delete</button>
        <h2>${bookmark.title}</h2>
        <span class="rating" data-rating=${bookmark.rating}>${stars}</span>
      </div>
      ${expanded ? generateDescription(bookmark.desc) : ''}
      <div class="bookmark-bottom-nav">
        ${expanded ? generateVisitButton(bookmark.url) : ''}
        <button class="button-toggle-details">${expanded ? 'Hide details' : 'Show details'}</button>
      </div>
    </li>`;
  }

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