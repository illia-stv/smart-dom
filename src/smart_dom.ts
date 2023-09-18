import { findIntersection, traverseDOM } from './utils';

export default class SmartDOM {

  private _document: Document;
  
  private _window: Window;

  constructor( window: Window ) {
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

      if ( 
        node.textContent && 
        node.nodeType === 1 &&
        node.textContent.trim() === text.trim()
       ) {
        matches.push( node );
       }
    } )

    return matches;
  }

  _findByAttributes( attribute: AttributeType ): Array<Element> {
    const matches: Array<Element> = [];

    traverseDOM( this._document.body, node => {
      for (const attributeName in attribute) {
        if( 
            node.nodeType === 1 &&
            node.getAttribute( attributeName ) === attribute[ attributeName ] 
        ) {
          matches.push( node );
        }
      }
    } )

    return matches;
  }

  _findByTagName( tagName: string ): Array<Element> {
    const matches: Array<Element> = [];
    const body = this._document.body as HTMLElement;

    traverseDOM( body, node => {
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
