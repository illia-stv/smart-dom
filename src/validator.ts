import type { AttributeType, ElementType } from "./smart_dom";

export type CheckCallbackType = ( node: Element, ...args: any ) => boolean;

export default class Validator {

    private _checkers: Map< string, CheckCallbackType >;

    constructor() {
        this._checkers = new Map();

        this._createCheckTagName();
        this._createTextChecker();
        this._createAttributeChecker();
        this._createParentChecker();
    }

    setChecker( checkCallback: CheckCallbackType, name: string ): void {
        this._checkers.set( name, checkCallback );
    }

    getChecker( name: string ): CheckCallbackType | undefined {
        return this._checkers.get( name );
    }

    _createTextChecker() {
        const checkCallback = ( node: Element, text: string ) => {
            return !!( 
                node.textContent && 
                node.nodeType === 1 &&
                node.textContent.trim() === text.trim()
            )
        }

        this.setChecker( checkCallback, 'checkText' )
    }

    _createCheckTagName() {
        const checkCallback = ( node: Element, tagName: string ) => {
            return !!( 
                node.tagName &&
                node.tagName === tagName.toUpperCase()
            )
        }

        this.setChecker( checkCallback, 'checkTagName' )
    }

    _createAttributeChecker() {
        const checkCallback = ( node: Element, attributeName: string, attribute: AttributeType ) => {
            return !!( 
                node.nodeType === 1 &&
                node.getAttribute( attributeName ) === attribute[ attributeName ]
            )
        }

        this.setChecker( checkCallback, 'checkAttribute' )
    }

    _createParentChecker() {
        const checkCallback = ( node: Element, parent: ElementType ) => {
            return !!( 
                node.parentElement &&
                this.checkAll( node.parentElement, parent )
            )
        }

        this.setChecker( checkCallback, 'checkParent' )
    }
    
    public checkAll ( node: Element, element: ElementType ): boolean {
        const checkText = this.getChecker( 'checkText' );
        const checkTagName = this.getChecker( 'checkTagName' );
        const checkAttribute = this.getChecker( 'checkAttribute' );
        const checkParent = this.getChecker( 'checkParent' );


        if ( element.text && checkText && !checkText( node, element.text ) ) {
            return false;
        }
    
        if ( element.tagName && checkTagName && !checkTagName( node, element.tagName ) ) {
            return false;
        }
    
        if ( element.attributes ) {
            for ( const attribute in element.attributes ) {
                if ( checkAttribute && !checkAttribute( node, attribute, element.attributes ) ) {
                    return false;
                }
            }
        }
    
        if ( element.parent ) {
            if ( !node ) {
                return false;
            }
    
            if ( checkParent && !checkParent( node, element.parent ) ) {
                return false;
            }
        }
    
        return true;
    }
}
