import SmartDOM from "../../src/smart_dom";

const smartDOM = new SmartDOM( window );

smartDOM.addCriteria( 'childElementCount', ( node, attribute ) => {
    return !!( node.childElementCount === attribute );
} )

smartDOM.addCriteria( 'nodeType', ( node, attribute ) => {
    return !!( node.nodeType === attribute );
} )

const elements = smartDOM.findElement( {
    text: 'About',
    tagName: 'li',
    children: [
        {
            tagName: 'a',
            attributes: {
                href: '#'
            }
        }
    ],
    parent: {
        tagName: 'ul',
        id: 'list',
        parent: {
            tagName: 'nav'
        }
    }
} );

console.log( elements )
