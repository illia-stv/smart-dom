# SmartDOM

SmartDOM is a JavaScript library for efficient DOM element searching.

## Installation

To use SmartDOM in your project, you can install it via npm.

```bash
npm install smart-dom
```

Then, import it into your JavaScript/TypeScript file:

```js
import SmartDOM from 'smart-dom';
```

## Finding Elements

You can use SmartDOM to find elements in the DOM using various criteria:

```js
const smartDOM = new SmartDOM( window );
```

Find by text
```js
const elementsByText = smartDOM.findElement( { 
  text: 'Example Text' 
} );
```

Find by tag name
```js
const elementsByTagName = smartDOM.findElement( { 
  tagName: 'div'
} );
```

Find by attributes
```js
const elementsByAttributes = smartDOM.findElement( {
  attributes: {
    class: 'example-class',
    text: 'value'
  }
} );
```

Find by parent
```js
const elementsByAttributes = smartDOM.findElement( {
  parent: {
    class: 'parent-class',
    tagName: 'div'
  }
} );
```

Find by children
```js
const elementsByAttributes = smartDOM.findElement( {
  children: [ {
    class: 'children-class',
    tagName: 'div'
  } ]
} );
```

# API

### SmartDOM(window: Window)

The constructor accepts a `window` object, which is used for DOM manipulation. It initializes the SmartDOM instance.

`find(options: OptionType): Array<Element>`
Finds elements in the DOM based on the provided options.

- `options` (OptionType): An object specifying the criteria for finding elements.

### OptionType
An object with optional properties for specifying the criteria to find elements:

- text (string): Text content to search for within elements.
- tagName (string): The tag name of elements to search for.
- attributes (AttributeType): An object specifying attribute-value pairs to match elements.

### AttributeType
An object where keys represent attribute names, and values represent the expected attribute values. Values can be strings or `true` for attribute existence checks.
