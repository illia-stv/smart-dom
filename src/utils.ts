import { isEqual } from "lodash";
import { AttributeType, ElementType } from "./smart_dom";

export function findIntersection( arr: Array<Array<Element>> ) {
		const firstArr = arr[ 0 ];
		const restArr = arr.slice( 1 );
		const matches = [];
	
		for( let i = 0; i < firstArr.length; i++ ) {
			const element = firstArr[ i ];
			let counter = 0;
	
			for( let j = 0; j < restArr.length; j++ ) {
				const currentArr = restArr[ j ];
				const result = currentArr.find( item => isEqual(element, item) )
	
				if( result ) {
					counter++;
				} 
			}
	
			if( counter === restArr.length ) {
				matches.push( element );
			}
		}
	
		return matches
}

export function traverseDOM( node: Element, callback: ( arg : Element ) => void ) {
	callback(node);

	for( const child of node.children ) {
		traverseDOM(child, callback);
	}
}
	
export function checkText ( node: Element, text: string ): boolean {
	if ( 
		node.textContent && 
		node.nodeType === 1 &&
		node.textContent.trim() === text.trim()
	) {
		return true;
	}

	return false;
}

export function checkAttribute ( node: Element, attributeName: string, attribute: AttributeType ): boolean {
	if( 
		node.nodeType === 1 &&
		node.getAttribute( attributeName ) === attribute[ attributeName ] 
	) {
		return true;
	}

	return false;
}

export function checkTagName ( node: Element, tagName: string ): boolean {
	if ( node.tagName && node.tagName === tagName.toUpperCase() ) {
		return true;
	}

	return false;
}

export function checkAll ( node: Element, element: ElementType ): boolean {
	
	if ( element.text && !checkText( node, element.text ) ) {
		return false;
	}

	if ( element.tagName && !checkTagName( node, element.tagName ) ) {
		return false;
	}

	if ( element.attributes ) {
		for ( const attribute in element.attributes ) {
			if ( !checkAttribute( node, attribute, element.attributes ) ) {
				return false;
			}
		}
	}

	if ( 
		element.parent 
	) {
		if ( !node ) {
			return false;
		}

		if ( 
			!checkParent( node, element.parent ) 
		) {
			return false;
		}
	}

	return true;
}

export function checkParent ( node: Element, parent: ElementType ): boolean {
	if ( node.parentElement && checkAll( node.parentElement, parent ) ) {
		return true;
	}

	return false;
}

