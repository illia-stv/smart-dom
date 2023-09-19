import validator from "./validator";
import { traverseDOM } from "./utils";
import type { AttributeType, ElementType } from "./smart_dom";

type ValidateCallback = ( node: Element, arg: any, matches: Element[] ) => void

export default class Matcher {    
    public matchByParent: ( arg: ElementType ) => Array<Element>;
    
    public matchByText: ( arg: string ) => Array<Element>;
    
    public matchByAttributes: ( arg: AttributeType ) => Array<Element>;
    
    public matchByTagName: ( arg: string ) => Array<Element>;
    
    private _document: Document;

    constructor( document: Document ) {
        this._document = document;

        this.matchByParent = this._matchTemplate( ( node, argument, matches ) => {
            if ( validator.checkParent( node, argument ) ) {
				matches.push( node );
			}
        } )

        this.matchByText = this._matchTemplate( ( node, argument, matches ) => {
            if ( validator.checkText( node, argument ) ) {
				matches.push( node );
			}
        } )

        this.matchByAttributes = this._matchTemplate( ( node, argument, matches ) => {
            for (const attributeName in argument) {
				if ( validator.checkAttribute( node, attributeName, argument ) ) {
					matches.push( node );
				}
			}
        } )

        this.matchByTagName = this._matchTemplate( ( node, argument, matches ) => {
            if ( validator.checkTagName( node, argument ) ) {
				matches.push( node );
			}
        } )
    }

    _matchTemplate ( callback: ValidateCallback ) {
        return ( argument: any ) => {
            const matches: Array<Element> = [];

            traverseDOM( this._document.body, node => {
                callback( node, argument, matches )
            } )

            return matches;
        }
    }
}
