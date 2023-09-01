# SmartDOM

SmartDOM is a JavaScript class for efficient DOM manipulation and element retrieval.

## Installation

To use SmartDOM in your project, you can install it via npm or include it directly in your HTML file.

### npm

You can install SmartDOM using npm:

```bash
npm install smart-dom
```

Then, import it into your JavaScript/TypeScript file:

```js
import SmartDOM from 'smart-dom';
```

## Finding Elements

You can use SmartDOM to find elements in the DOM using various criteria:

Find by Text
```js
const elementsByText = smartDOM.find({ text: 'Example Text' });
```

Find by Tag Name
```js
const elementsByTagName = smartDOM.find({ tagName: 'div' });
```

Find by Attributes
```js
const elementsByAttributes = smartDOM.find({
  attributes: {
    class: 'example-class',
    data: 'value'
  }
});
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

License
This project is licensed under the MIT License - see the LICENSE file for details.
