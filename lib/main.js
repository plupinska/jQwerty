const DOMNodeCollection = require('./dom_node_collection.js');

let que = [];
window.$j = function(selector) {
  let elements = null;

  if(typeof(selector) === "string") {
    let array = Array.from(document.querySelectorAll(selector));
    elements = new DOMNodeCollection(array);
  }

  if(selector instanceof HTMLElement) {
    elements = new DOMNodeCollection([selector]);
  }

  if(selector instanceof Function) {
    que.push(selector);
    document.addEventListener("DOMContentLoaded", (e) => {

      e.stopPropgation();
      for (let i = 0; i < que.length; i++) {
        que[i]();
      }
    });
  }

  return elements;
};

