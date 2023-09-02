import { findIntersection, traverseDOM } from './utils';

export default class SmartDOM {

  private _document: Document;
  
  private _window: Window;

  constructor( currentWindow: Window ) {
    if ( !currentWindow ) {
      throw new Error( "Window is not defined" );
    } 

    this._window = currentWindow || window;
    this._document = this._window.document;
  }

  find( options?: OptionType ): Array<Element> | null {
    const arr = [];

    if( !options ){
      return null;
    }

    if( options.text ) {
      arr.push(this._findByText( options.text ))
    }

    if( options.attributes ) {
      arr.push(this._findByAttributes( options.attributes ))
    }

    if( options.tagName ) {
      arr.push(this._findByTagName( options.tagName ))
    }

    return findIntersection( arr );
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

      for (const attributeName in attribute) {
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
 
interface AttributeType {
  [ key: string ] : string | true;
}

interface OptionType {
  text?: string,
  tagName?: string,
  attributes?: AttributeType
}
