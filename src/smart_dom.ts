import Matcher from './matcher';
import { findIntersection } from './utils';
import { CheckExecuteCallback } from './validator';

export default class SmartDOM {
	public matcher: Matcher;

	private _document: Document;

	private _window: Window;

	private _criterias: Array<{ callback: CriteriaCallbackType, name: string }> 

	constructor( window: Window ) {
		this._window = window;
		this._document = this._window.document;
		this.matcher = new Matcher( this._document );
		this._criterias = [];

		this._addCriterias();
	}

	/*
	* This method is for finding elements in DOM with given options.
	*
	* @param options you could define type of your DOM element.  
	*/
	findElement( options?: ElementType ): Array<Element> | null {
		const collection = [];
		const criterias = this._criterias;

		if ( !options ) {
			return null;
		}

		for( const criteria of criterias ) {
			const name = criteria.name;
			const option = options[ name as keyof ElementType ];

			if ( option !== undefined ) {
				collection.push( criteria.callback( option ) )
			}
		}

		return findIntersection( collection );
	}

	addCriteria( name: string, callback: CheckExecuteCallback ) {
		const matcher = this.matcher.addMatcher( name, callback );

		if ( matcher ) {
			this._register( matcher, name );
		}
	}

	_register( callback: CriteriaCallbackType, name: string ) {
		const criteria = {
			name,
			callback: callback.bind( this )
		}

		this._criterias.push( criteria );
	}

	_addCriterias() {
		this.addCriteria( 'text', ( node: Element, text: string ) => {
			if ( node.tagName === 'P' ) {
				console.log(node.childNodes[ 0 ].nodeValue);
			}
            return !!( 
                node.textContent && 
                node.nodeType === 1 &&
                node.textContent.trim() === text.trim()
            )
        } );

		this.addCriteria( 'tagName', ( node: Element, tagName: string ) => {
            return !!( 
				node &&
                node.tagName &&
                node.tagName === tagName.toUpperCase()
            )
        } );

		this.addCriteria( 'attributes', ( node: Element, attributes: AttributeType ) => {
            for ( const attributeName in attributes ) {
                if ( node.nodeType === 1 && node.getAttribute( attributeName ) !== attributes[ attributeName ] ) {
                    return false;
                }
            }

            return true;
        } );

		this.addCriteria( 'parent', ( node: Element, parent: ElementType ) => {
            return !!( 
                node && node.parentElement &&
                this.matcher.validator.checkAll( node.parentElement, parent )
            )
        } );

		this.addCriteria( 'children', ( node: Element, children: Array<ElementType> ) => {
            let counter = 0;
			const childNodes = [ ...node.childNodes ].filter( item => item.nodeType === 1 );

			for( let i = 0; i < children.length; i++ ) {
				const childElement = children[ i ];
				const childNode = childNodes[ i ];

				if ( 
					childElement && childNode instanceof Element &&
					this.matcher.validator.checkAll( childNode, childElement )
				) {
					counter++;
				} 
			}

			if ( counter === children.length ){
				return true;
			} else {
				return false;
			}
        } );
	}
}

export type CriteriaCallbackType = ( args: any ) => Array<Element>;
 
export interface AttributeType {
	[ key: string ] : string;
}

export interface ElementType {
	[ key: string ] : string;
}
