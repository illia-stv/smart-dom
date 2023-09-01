import { isEqual } from "lodash";

export function findIntersaction( arr: Array<Array<Element>> ) {
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

export function traverseDOM( node: Element | ChildNode, callback: ( arg : Element | ChildNode ) => void ) {
    callback(node);
  
    node.childNodes.forEach( child => {
      traverseDOM(child, callback);
    });
  }
  
