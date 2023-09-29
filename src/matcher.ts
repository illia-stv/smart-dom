import Validator, { CheckExecuteCallback } from "./validator";
import { traverseDOM } from "./utils";

type ValidateCallback = ( node: Element, arg: any, matches: Element[] ) => void;
type MatchCallback = ( argument: any ) => Array<Element>;

export default class Matcher {    
	public validator: Validator;

    private _document: Document;

    private _matchers: Map< string, MatchCallback >;

    constructor( document: Document ) {
        this.validator = new Validator();
        this._document = document;
        this._matchers = new Map();
    }

    setMatcher( matcherName: string, callback: MatchCallback ) {
        this._matchers.set( matcherName, callback );
    }

    getMatcher( matcherName: string ) : MatchCallback | undefined {
        return this._matchers.get( matcherName );
    }

    addMatcher( name: string, callback: CheckExecuteCallback ) {
        this.validator.setChecker( { execute: callback, name }, name );

        this.setMatcher( name , this._matchTemplate( ( node, argument, matches ) => {
            if ( this.validator.getChecker( name )!.execute( node, argument ) ) {
				matches.push( node );
			}
        } ) );

        return this.getMatcher( name );
    }

    _matchTemplate ( callback: ValidateCallback ): MatchCallback {
        return ( argument: any ) => {
            const matches: Array<Element> = [];

            traverseDOM( this._document.body, node => {
                callback( node, argument, matches )
            } )

            return matches;
        }
    }
}
