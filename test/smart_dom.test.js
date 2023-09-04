import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import SmartDOM from '../src/smart_dom';
import { JSDOM } from 'jsdom';

// Mock the DOM environment
const dom = new JSDOM();
const document = dom.window.document;

describe('SmartDom', () => {
    let smartDom;

    beforeEach( () => {
        smartDom = new SmartDOM( dom.window );
        buildWEBPage();
    } )

    afterEach( () => {
        document.body.children[ 0 ].remove();
    } ) 

    describe( 'find()', () => {
        test( 'should return null if there is no options', () => {
            expect(smartDom.find()).toBe( null )
        } )
    
        test( 'should return proper DOM element by text option', () => {
            const elementsContent = 'Item 1';
            const itemFromDOM = document.querySelector( '#first_item_in_list' );
            const itemCreatedSyntactically = document.createElement('li');
            
            itemCreatedSyntactically.textContent = elementsContent;
            
            const matches = smartDom.find( {
                text: elementsContent
            } )
        
            expect(matches[ 0 ]).toEqual( itemFromDOM )
            expect(matches[ 0 ]).not.toEqual( itemCreatedSyntactically )
        } )
    } )
})


function buildWEBPage() {
  const containerDiv = document.createElement('div');

  const heading = document.createElement('h1');
  heading.textContent = 'Welcome to My Website';

  const paragraph = document.createElement('p');
  paragraph.textContent = 'This is a sample paragraph of text on my website.';

  const ul = document.createElement('ul');

  const listItem1 = document.createElement('li');
  listItem1.textContent = 'Item 1';
  listItem1.id = 'first_item_in_list'

  const listItem2 = document.createElement('li');
  listItem2.textContent = 'Item 2';

  const listItem3 = document.createElement('li');
  listItem3.textContent = 'Item 3';

  ul.appendChild(listItem1);
  ul.appendChild(listItem2);
  ul.appendChild(listItem3);

  containerDiv.appendChild(heading);
  containerDiv.appendChild(paragraph);
  containerDiv.appendChild(ul);

  document.body.appendChild(containerDiv);
}
