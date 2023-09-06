import { findIntersection, traverseDOM } from './utils';

class SmartDOM {

  private _document: Document;
  
  private _window: Window;

  constructor( window: Window ) {
    if ( !window ) {
      throw new Error( "Window is not defined" );
    } 

    this._window = window;
    this._document = this._window.document;
  }

  /*
  * This method is for finding elements in DOM with given options.
  *
  * @param options you could define type of your DOM element.  
  */
  findElement( options?: OptionType ): Array<Element> | null {
    const collection = [];

    if( !options ){
      return null;
    }

    if( options.text ) {
      collection.push(this._findByText( options.text ))
    }

    if( options.attributes ) {
      collection.push(this._findByAttributes( options.attributes ))
    }

    if( options.tagName ) {
      collection.push(this._findByTagName( options.tagName ))
    }

    return findIntersection( collection );
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

export default SmartDOM;
