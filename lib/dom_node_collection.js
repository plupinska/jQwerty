class DOMNodeCollection {

  constructor(htmlEls) {
   this.htmlEls = htmlEls;
 }

  html(params) {
     if(!params) {
       return this.htmlEls[0];
     } else {
       this.htmlEls.forEach((el) => {
         el.innerHTML = params;
       });
     }
   }

   empty() {
     this.htmlEls.forEach((el) => {
       el.html("");
     });
   }

   append(content) {
     this.htmlEls.forEach((el)=> {
       el.appendChild(content);
     });
   }

   attr(key, value) {
     if(value){
       //setter
       this.htmlEls.forEach((el) => {
         el.setAttribute(key, value);
       });
       }

     else if (value === null) {
       this.htmlEls.forEach((el) => {
         el.removeAttribute(key);
       });
     } else {
       //getter
       this.htmlEls[0].getAttribute(key);
     }
   }

   addClass(value) {
     this.htmlEls.forEach((el) => {
       el.attr("class", value);
     });
   }

   removeClass(value) {
     this.htmlEls.forEach((el) => {
       el.attr("class", null);
     });
   }

   children(selector) {
     let childs = [];
     this.each(el => {
       const childNodes = el.children;
       childs = childs.concat(Array.from(childNodes));
     });

     return new DOMNodeCollection(childs);
   }

   parent(selector) {
     let parents = [];
     let realParents = [];

     this.htmlEls.forEach((el) => {
       parents = parents.concat(Array.from(el.parentNode));
     });

     if (selector) {
       $j(selector).forEach((el) => {
         if(parents.includes(el)) {
           realParents.push(el);
         }
       });
     } else {
       realParents = parents;
     }

     return new DOMNodeCollection(realParents);
   }

   find(selector) {
     let found = [];
     this.htmlEls.forEach((el) => {
       found.push(el.querySelectorAll(selector)[0]);
     });
     return new DOMNodeCollection(found);
   }

   remove(selector) {
     let selectedEls = [];
     let foundBySelector = [];
     // debugger
     if(selector){
       this.htmlEls.forEach((el) => {
         foundBySelector.push($j(el).find(selector));
       });
     } else {
       this.htmlEls.forEach((el) => {
         // debugger
         el.remove();
       });
     }

     if(foundBySelector.length > 0) {
       foundBySelector.forEach((el) => {
         el.remove();
       });
     }
   }

   on(e, callback) {
     this.htmlEls.forEach((el) => {
       el.addEventListener(e, callback);
       el.cb = callback;
     });

   }

   off(e) {
     this.htmlEls.forEach((el) => {
       // const callback = el[cb]
       el.removeEventListener(e, el.cb);
     });
   }

   height() {
     return this.offsetHeight;
   }

   width() {
    return  this.offsetWidth;
   }
}


module.exports = DOMNodeCollection;
