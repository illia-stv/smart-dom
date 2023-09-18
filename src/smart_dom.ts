import { checkAttribute, checkParent, checkTagName, checkText, findIntersection, traverseDOM } from './utils';

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
  findElement( options?: ElementType ): Array<Element> | null {
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

	if( options.parent ) {
		collection.push(this._findByParent( options.parent ))
	}

	return findIntersection( collection );
  }

  _findByParent ( parent: ElementType ): Array<Element> {
	const matches: Array<Element> = [];

	traverseDOM( this._document.body, node => {
		if ( checkParent( node, parent ) ) {
			matches.push( node );
		}
	} )

	return matches;
  }

  _findByText ( text: string ): Array<Element> {
	const matches: Array<Element> = [];
	
	traverseDOM( this._document.body, node => {
		if ( checkText( node, text ) ) {
			matches.push( node );
		}
	} )

	return matches;
  }

  _findByAttributes( attribute: AttributeType ): Array<Element> {
	const matches: Array<Element> = [];

	traverseDOM( this._document.body, node => {
		for (const attributeName in attribute) {
			if ( checkAttribute( node, attributeName, attribute ) ) {
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
		if ( checkTagName( node, tagName ) ) {
			matches.push( node );
		}
	} )

	return matches;
  }
}
 
export interface AttributeType {
  [ key: string ] : string | true;
}

export interface ElementType {
  text?: string,
  tagName?: string,
  attributes?: AttributeType,
  parent?: ElementType
}
