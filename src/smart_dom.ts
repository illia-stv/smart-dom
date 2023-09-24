import Matcher from './matcher';
import { findIntersection } from './utils';

export default class SmartDOM {
	public matcher: Matcher;

	private _document: Document;

	private _window: Window;

	private _criterias: Array<{ callback: CriteriaCallbackType, name: string }> 

	constructor( window: Window ) {
		this._window = window;
		this._document = this._window.document;
		this.matcher = new Matcher( this._document );
		this._criterias = []

		this._register( this.matcher.matchByParent, 'parent' );
		this._register( this.matcher.matchByText, 'text' );
		this._register( this.matcher.matchByAttributes, 'attributes' );
		this._register( this.matcher.matchByTagName, 'tagName' );
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

			if ( option ) {
				collection.push( criteria.callback( option ) )
			}
		}

		return findIntersection( collection );
	}

	_register( callback: CriteriaCallbackType, name: string ) {
		const criteria = {
			name,
			callback: callback.bind( this )
		}

		this._criterias.push( criteria );
	}
}

export type CriteriaCallbackType = ( args: any ) => Array<Element>;
 
export interface AttributeType {
	[ key: string ] : string;
}

export interface ElementType {
	[ key: string ] : string;
}
