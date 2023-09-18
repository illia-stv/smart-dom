import { expect, test, describe, beforeEach } from 'vitest'
import SmartDOM from '../src/smart_dom';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`
    <!DOCTYPE html>
    <div>
        <h1 id="heading">
            Welcome to My Website
        </h1>
        <p id="paragraph">
            This is a sample paragraph of text on my website.
        </p>
        <ul>
            <li id="first_item_in_list">
                Item 1
            </li>
            <li>
                Item 2
            </li>
            <li>
                Item 3
            </li>
        </ul>
    </div>
`, {
    url: "https://example.org/",
  });

describe('SmartDom', () => {
    let smartDom, document;

    beforeEach( () => {
        smartDom = new SmartDOM( dom.window );
        document = dom.window.document;
    } )

    describe( 'find by text option', () => {
        test( 'should return null if there is no options', () => {
            expect(smartDom.findElement()).toBe( null )
        } )

        test( 'should return proper DOM element by text option', () => {
            const itemFromDOM = document.querySelector( '#first_item_in_list' );
            
            const matches = smartDom.findElement( {
                text: 'Item 1'
            } )

            expect( matches[ 0 ].id ).toEqual( itemFromDOM.id )
            expect( matches[ 0 ] ).not.toEqual( null )
        } )

        test( 'should return heading by text option', () => {
            const itemFromDOM = document.querySelector( '#heading' );
            
            const matches = smartDom.findElement( {
                text: 'Welcome to My Website'
            } )

            expect(matches[ 0 ]).toEqual( itemFromDOM )
            expect(matches[ 0 ]).not.toEqual( null )
        } )
    } )

    describe( 'find by attribute', () => {
        test( 'should return proper DOM element by attribute option', () => {
            const itemFromDOM = document.querySelector( '#first_item_in_list' );

            const matches = smartDom.findElement( {
                attributes: {
                    id: "first_item_in_list"
                }
            } )

            expect(matches[ 0 ]).toEqual( itemFromDOM )
            expect(matches[ 0 ]).not.toEqual( null )
        } )

        test( 'should return paragraph by attribute option', () => {
            const itemFromDOM = document.querySelector( '#paragraph' );

            const matches = smartDom.findElement( {
                attributes: {
                    id: "paragraph"
                }
            } )

            expect(matches[ 0 ]).toEqual( itemFromDOM )
            expect(matches[ 0 ]).not.toEqual( null )
        } )
    } )

    describe( 'find by tag name', () => {
        test( 'should return proper DOM element by text option', () => {
            const itemFromDOM = document.querySelector( '#heading' );

            const matches = smartDom.findElement( {
                tagName: 'h1'
            } )

            expect(matches[ 0 ]).toEqual( itemFromDOM )
            expect(matches[ 0 ]).not.toEqual( null )
        } )
    } )

    describe( 'find by tag name, text and attributes', () => {
        test( 'should return proper DOM element by text option', () => {
            const itemFromDOM = document.querySelector( '#heading' );

            const matches = smartDom.findElement( {
                tagName: 'h1',
                attributes: {
                    id: 'heading',
                },
                text: 'Welcome to My Website'
            } )

            expect(matches[ 0 ]).toEqual( itemFromDOM )
            expect(matches[ 0 ]).not.toEqual( null )
        } )
    } )
})
