import { findIntersaction, traverseDOM } from './utils';

export default class SmartDOM {

  private _window: Window;

  private _document: Document;

  constructor( _window: Window ) {
    if ( !_window ) {
      throw new Error( 'Window is not defined' );
    } 

    this._window = _window || window;
    this._document = this._window.document;
  }

  find( options: OptionType ): Array<Element> {
    const arr = [];

    if( options.text ) {
      arr.push(this._findByText( options.text ))
    }

    if( options.attributes ) {
      arr.push(this._findByAttributes( options.attributes ))
    }

    if( options.tagName ) {
      arr.push(this._findByTagName( options.tagName ))
    }

    return findIntersaction( arr );
  }

  _findByText ( text: string ): Array<Element> {
    const matches: Array<Element> = [];

    traverseDOM( this._document.body, node => {
      if ( node.textContent && node.nodeType === 3 && node.textContent === text && node.parentElement ) {
        matches.push( node.parentElement );
      }
    } )

    return matches;
  }

  _findByAttributes( attribute: AttributeType ): Array<Element> {
    const matches: Array<Element> = [];

    traverseDOM( this._document.body, node => {
      if( !(node instanceof Element) ) {
        return;
      }

      for (let attributeName in attribute) {
        if( node.nodeType === 1 && node.getAttribute( attributeName ) === attribute[ attributeName ] ) {
          matches.push( node );
        }
      }
    } )

    return matches;
  }

  _findByTagName( tagName: string ): Array<Element> {
    const matches: Array<Element> = [];

    traverseDOM( this._document.body, node => {
      if( !(node instanceof Element) ) {
        return;
      }

      if ( node.tagName && node.tagName === tagName.toUpperCase() ) {
        matches.push( node );
      }
    } )

    return matches;
  }
}

type AttributeType = {
  [ key: string ] : string | true;
}

type OptionType = {
  text?: string,
  tagName?: string,
  attributes?: AttributeType
}
