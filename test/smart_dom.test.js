import { expect, test, describe } from 'vitest'
import SmartDOM from '../src/smart_dom';
import { JSDOM } from 'jsdom';

// Mock the DOM environment
const dom = new JSDOM();

const smartDom = new SmartDOM( dom.window );

describe('SmartDom', () => {
    test( 'should return null if there is no options', () => {
        expect(smartDom.find()).toBe( null )
    } )
})
