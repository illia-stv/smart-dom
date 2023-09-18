import SmartDOM from "../../src/smart_dom";

const smartDOM = new SmartDOM( window );

const target = document.getElementById( 'target' );

const elements = smartDOM.findElement( {
    parent: {
        attributes: {
            id: 'list',
        },
        parent: {
            tagName: 'nav'
        }
    },
    tagName: 'li',
    text: 'About'
} )

console.log( elements )

for( const element of elements ) {
    target.appendChild( element.cloneNode( true ) );
}
