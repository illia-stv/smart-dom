import { isEqual } from "lodash";

export function findIntersection( arr: Array<Array<Element>> )  {
		const matches = [];

		if( !arr.length ) {
			return [];
		}

		const firstArr = arr[ 0 ];
		const restArr = arr.slice( 1 );
	
		for( let i = 0; i < firstArr.length; i++ ) {
			const element = firstArr[ i ];
			let counter = 0;
	
			for( let j = 0; j < restArr.length; j++ ) {
				const currentArr = restArr[ j ];
				const result = currentArr.find( item => isEqual(element, item) );
	
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
