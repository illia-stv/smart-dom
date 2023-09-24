import type { AttributeType, ElementType } from "./smart_dom";

export interface CheckCallbackType {
    execute: ExecuteCallbackType;
    name: string;
}
export type ExecuteCallbackType = ( node: Element, ...args: any ) => boolean;

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

        this.setChecker(
            {
                execute: checkCallback,
                name: 'text'
            }, 
            'checkText'
        )
    }

    _createCheckTagName() {
        const checkCallback = ( node: Element, tagName: string ) => {
            return !!( 
                node.tagName &&
                node.tagName === tagName.toUpperCase()
            )
        }

        this.setChecker( 
            {
                execute: checkCallback,
                name: 'tagName'
            },
            'checkTagName'
        )
    }

    _createAttributeChecker() {
        const checkCallback = ( node: Element, attribute: AttributeType ) => {
            for ( const attributeName in attribute ) {
                if ( node.nodeType === 1 && node.getAttribute( attributeName ) !== attribute[ attributeName ] ) {
                    return false;
                }
            }
            return true;
        }

        this.setChecker( 
            {
                execute: checkCallback,
                name: 'attribute'
            },
            'checkAttribute'
        )
    }

    _createParentChecker() {
        const checkCallback = ( node: Element, parent: ElementType ) => {
            return !!( 
                node && node.parentElement &&
                this.checkAll( node.parentElement, parent )
            )
        }

        this.setChecker( 
            {
                execute: checkCallback,
                name: 'parent'
            },
            'checkParent'
        )
    }
    
    public checkAll ( node: Element, element: ElementType ): boolean {
        for( const [, checker] of this._checkers ) {
            const checkerName = checker.name;

            if ( element && element[ checkerName ] && !checker.execute( node, element[ checkerName ] ) ) {
                return false;
            }
        }
    
        return true;
    }
}
