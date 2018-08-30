
/* globals store, $ */

const domRender = (function() {

  // main renderer call
  function renderMain() {
    const renderedHtml = store.bookmarks.map(bookmark => generateListBlock(bookmark))
      .join('');
    console.log(renderedHtml);
    $('.bookmark-list').html(renderedHtml);
  }

  function generateListBlock(bookmark) {
    return `<li>
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