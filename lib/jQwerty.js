/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

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


/***/ })
/******/ ]);