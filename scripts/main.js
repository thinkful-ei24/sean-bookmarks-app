
/* global store uiEventHandlers, domRender $ */

$(function() {

  // TODO: dummy data
  const bookmarks = [
    {title:'Bookmark A', url:'url', description:'descr', rating:3},
    {title:'Bookmark B', url:'url', description:'descr', rating:4},
    {title:'Bookmark C', url:'url', description:'descr', rating:2},
    {title:'Bookmark D', url:'url', description:'descr', rating:5},
    {title:'Google', url:'http://www.google.com',
      description:'Make sure that a rating of 0 is still somehow rendered? Users probably shouldn\'t \
      be able to  set a bookmark with a rating of 0', rating:0}
  ];
  bookmarks.map(bookmark => store.addBookmark(bookmark));

  uiEventHandlers.bindAllEvents();
  domRender.showStore();
  console.log('document loaded');
});