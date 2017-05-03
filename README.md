# jQwerty

## Overview

jQwerty is a DOM manipulation library inspired by jQuery. This library can be used for making AJAX requests, handling events, and manipulating the DOM.

## How to Use

jQwerty is an easy to use library that can be downloaded into your project and included as a script tag in the head of your html document.

``` html  
<script src="./lib/jQwerty.js" type="text/javascript"></script>

```

## API

[`$j`](#j)

#### DOM Traversal
* [`each`](#each)
* [`children`](#children)
* [`parent`](#parent)
* [`html`](#html)
* [`empty`](#empty)
* [`append`](#append)
* [`attr`](#attr)
* [`addClass`](#addClass)
* [`removeClass`](#removeClass)
* [`find`](#find)
* [`remove`](#remove)

#### Event Handling
* [`on`](#on)
* [`off`](#off)

#### AJAX Requests
* [`ajax`](#ajax)

### $j

The jQwerty library exports a global variable, ```$j``` that accepts three classes of objects: strings used as CSS selectors, instances of HTML Elements, as well as functions.  ```$j``` acts as a wrapper, returning an instance of DOMNodeCollection for all of the methods in the jQwerty library.

### each

The each method acts as an itterator on DomNodeCollection objects, applying a callback function to each respective element in the array.

### children

Returns an instance of DOMNodeCollection with the direct children of a given HTML Element.

### parent

Returns an instance of DOMNodeCollection with the direct parent of a given HTML Element input.

### html

Returns the inner html of a given input element. If this method is called on a collection of elements, it will only return the inner html of the first element in the collection.

### empty

Sets the inner html of a given input element equal to an empty string. This method works on single elements as well as collections.

### append

Appends content(either html or string) to the end of each element in the set of matched elements.

### attr

Takes one or an optional second argument ``` attr(k,v) ```. Depending on the input value this method can be used to retrieve the value of ```k``` within the given element, or set the value of ```k``` equal to ```v```.

### addClass

Accepts a string argument and sets the html elements className equal to the input string.

### removeClass

Removes a given class from an element.

### find

Searches the descendants of a given html element using an argument as a selector. Constructs a new DOMNodeCollection object from the resulting matches.

### remove

Removes the set of all elements matching the selector argument.


### on

Takes an event and callback as arguments and places the event listener on the DOM element. When the event is triggered the callback will be executed.

### off

Removes events from elements in the DOM.

### ajax
