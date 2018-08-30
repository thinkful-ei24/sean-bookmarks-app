
/* globals store, $ */

const domRender = (function() {

  // main renderer call
  function renderMain() {
    let items = store.bookmarks;

    const minRating = store.minDisplayRating;
    if(minRating > 0) {
      items = items.filter(bookmark => bookmark.rating >= minRating);
    }

    const renderedHtml = items.map(bookmark => generateListBlock(bookmark))
      .join('');
    $('.bookmark-list').html(renderedHtml);
  }

  function generateListBlock(bookmark) {
    return `<li class="bookmark-block">
      <h2>${bookmark.title}</h2>
        <span class="bookmark-rating"></span>
        <button class="button-delete">Delete</button>
      <h3 class="bookmark-details">Details</h3>
      <p>DETAILS/DESCRIPTION</p>
      <div class="bookmark-bottom-nav">
        <button class="button-visit-site">Visit site</button>
        <button class="button-toggle-details">Hide details</button>
      </div>
    </li>`;
  }

  return {
    showStore: renderMain
  };
}());