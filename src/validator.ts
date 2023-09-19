import type { AttributeType, ElementType } from "./smart_dom";

export default class Validator {
    static checkText ( node: Element, text: string ): boolean {
        if ( 
            node.textContent && 
            node.nodeType === 1 &&
            node.textContent.trim() === text.trim()
        ) {
            return true;
        }
    
        return false;
    }
    
    static checkAttribute ( node: Element, attributeName: string, attribute: AttributeType ): boolean {
        if( 
            node.nodeType === 1 &&
            node.getAttribute( attributeName ) === attribute[ attributeName ] 
        ) {
            return true;
        }
    
        return false;
    }
    
    static checkTagName ( node: Element, tagName: string ): boolean {
        if ( node.tagName && node.tagName === tagName.toUpperCase() ) {
            return true;
        }
    
        return false;
    }

    static checkParent ( node: Element, parent: ElementType ): boolean {
        if ( node.parentElement && this.checkAll( node.parentElement, parent ) ) {
            return true;
        }
    
        return false;
    }
    
    static checkAll ( node: Element, element: ElementType ): boolean {
        if ( element.text && !this.checkText( node, element.text ) ) {
            return false;
        }
    
        if ( element.tagName && !this.checkTagName( node, element.tagName ) ) {
            return false;
        }
    
        if ( element.attributes ) {
            for ( const attribute in element.attributes ) {
                if ( !this.checkAttribute( node, attribute, element.attributes ) ) {
                    return false;
                }
            }
        }
    
        if ( element.parent ) {
            if ( !node ) {
                return false;
            }
    
            if ( !this.checkParent( node, element.parent ) ) {
                return false;
            }
        }
    
        return true;
    }
}
