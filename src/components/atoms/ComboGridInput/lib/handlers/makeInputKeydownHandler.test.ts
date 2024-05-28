import '@testing-library/jest-dom';
import { KeyboardEvent } from 'react';
import { makeInputKeyDownHandler } from './makeInputKeydownHandler';

const makeEvent = (key: string) => {
    return {
        key,
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
    } as unknown as KeyboardEvent<HTMLElement>;
};

describe('makeInputKeyDownHandler function', () => {
    test('runs correctly', () => {
        const outputFn = makeInputKeyDownHandler(
            false, //----- expanded
            -1, //-------- focused
            () => {}, // - setFocused
            false, // ---- cellBoolean
            () => {}, // - setCellBoolean
            [], // ------- items
            '', // ------- text
            () => {}, // - onSelection
            () => {} //--- setShowItems
        );
        expect(typeof outputFn).toBe('function');
    });
    test('runs with {typing}/Backspace correctly', () => {
        const setShowItemsFn = jest.fn();
        const handler = makeInputKeyDownHandler(
            false, //--------- expanded
            -1, //------------ focused
            () => {}, // ----- setFocused
            false, // -------- cellBoolean
            () => {}, // ----- setCellBoolean
            [], // ----------- items
            '', // ----------- text
            () => {}, // ----- onSelection
            setShowItemsFn //- setShowItems
        );
        // no {typing}/Backspace
        let evt = makeEvent('Tab');
        handler(evt);
        expect(setShowItemsFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        // {typing}
        evt = makeEvent('a');
        handler(evt);
        expect(setShowItemsFn).toHaveBeenNthCalledWith(1, true);
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        // Backspace
        evt = makeEvent('Backspace');
        handler(evt);
        expect(setShowItemsFn).toHaveBeenNthCalledWith(2, true);
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs with Home|End correctly', () => {
        const setFocusedFn = jest.fn();
        const handler = makeInputKeyDownHandler(
            false, //--------- expanded
            -1, //------------ focused
            setFocusedFn, // - setFocused
            false, // -------- cellBoolean
            () => {}, // ----- setCellBoolean
            [], // ----------- items
            '', // ----------- text
            () => {}, // ----- onSelection
            () => {} //------- setShowItems
        );
        // no Home|End
        let evt = makeEvent('Tab');
        handler(evt);
        expect(setFocusedFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        // Home
        evt = makeEvent('Home');
        handler(evt);
        expect(setFocusedFn).toHaveBeenNthCalledWith(1, -1);
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        // End
        evt = makeEvent('End');
        handler(evt);
        expect(setFocusedFn).toHaveBeenNthCalledWith(2, -1);
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs with Enter correctly', () => {
        const onSelectionFn = jest.fn();
        const setFocusedFn = jest.fn();
        const setShowItemsFn = jest.fn();
        const handler = makeInputKeyDownHandler(
            false, //----------- expanded
            0, //--------------- focused
            setFocusedFn, // --- setFocused
            false, // ---------- cellBoolean
            () => {}, // ------- setCellBoolean
            ['one'], // ------------- items
            '', // ------------- text
            onSelectionFn, // -- onSelection
            setShowItemsFn //--- setShowItems
        );
        // no Enter
        let evt = makeEvent('Tab');
        handler(evt);
        expect(onSelectionFn).not.toHaveBeenCalled();
        expect(setFocusedFn).not.toHaveBeenCalled();
        expect(setShowItemsFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        // Enter
        evt = makeEvent('Enter');
        handler(evt);
        expect(onSelectionFn).toHaveBeenCalledWith('one');
        expect(setFocusedFn).toHaveBeenCalledWith(-1);
        expect(setShowItemsFn).toHaveBeenCalledWith(false);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs with Escape correctly', () => {
        const onSelectionFn = jest.fn();
        const setFocusedFn = jest.fn();
        const setShowItemsFn = jest.fn();
        const setCellBooleanFn = jest.fn();
        let handler = makeInputKeyDownHandler(
            true, //----- expanded
            -1, //-------- focused
            setFocusedFn, // - setFocused
            false, // ---- cellBoolean
            setCellBooleanFn, // - setCellBoolean
            [], // ------- items
            '', // ------- text
            onSelectionFn, // - onSelection
            setShowItemsFn //--- setShowItems
        );
        // no Escape
        let evt = makeEvent('Tab');
        handler(evt);
        expect(onSelectionFn).not.toHaveBeenCalled();
        expect(setFocusedFn).not.toHaveBeenCalled();
        expect(setShowItemsFn).not.toHaveBeenCalled();
        expect(setCellBooleanFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        // Escape + expanded + no text
        evt = makeEvent('Escape');
        handler(evt);
        expect(onSelectionFn).not.toHaveBeenCalled();
        expect(setFocusedFn).toHaveBeenNthCalledWith(1, -1);
        expect(setShowItemsFn).toHaveBeenNthCalledWith(1, false);
        expect(setCellBooleanFn).toHaveBeenNthCalledWith(1, false);
        // Escape + no expanded + text
        evt = makeEvent('Escape');
        handler = makeInputKeyDownHandler(
            false, //----- expanded
            -1, //-------- focused
            setFocusedFn, // - setFocused
            false, // ---- cellBoolean
            setCellBooleanFn, // - setCellBoolean
            [], // ------- items
            'foo', // ------- text
            onSelectionFn, // - onSelection
            setShowItemsFn //--- setShowItems
        );
        handler(evt);
        expect(onSelectionFn).toHaveBeenCalledWith(null);
        expect(setFocusedFn).toHaveBeenNthCalledWith(2, -1);
        expect(setShowItemsFn).toHaveBeenNthCalledWith(2, false);
        expect(setCellBooleanFn).toHaveBeenNthCalledWith(2, false);
    });
    test('runs with ArrowDown/ArrowUp correctly', () => {
        const setCellBooleanFn = jest.fn();
        const setFocusedFn = jest.fn();
        let handler = makeInputKeyDownHandler(
            false, //----- expanded
            -1, //-------- focused
            setFocusedFn, // - setFocused
            false, // ---- cellBoolean
            setCellBooleanFn, // - setCellBoolean
            [], // ------- items
            '', // ------- text
            () => {}, // - onSelection
            () => {} //--- setShowItems
        );
        // no ArrowDown/ArrowUp
        let evt = makeEvent('Tab');
        handler(evt);
        expect(setCellBooleanFn).not.toHaveBeenCalled();
        expect(setFocusedFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        // ArrowDown + no expanded
        evt = makeEvent('ArrowDown');
        handler(evt);
        expect(setCellBooleanFn).not.toHaveBeenCalled();
        expect(setFocusedFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        // ArrowUp + no expanded
        evt = makeEvent('ArrowUp');
        handler(evt);
        expect(setCellBooleanFn).not.toHaveBeenCalled();
        expect(setFocusedFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        // ArrowDown + expanded + focused not equal -1
        handler = makeInputKeyDownHandler(
            true, //----- expanded
            0, //-------- focused
            setFocusedFn, // - setFocused
            false, // ---- cellBoolean
            setCellBooleanFn, // - setCellBoolean
            ['one', 'two', 'three', 'four'], // ------- items
            '', // ------- text
            () => {}, // - onSelection
            () => {} //--- setShowItems
        );
        evt = makeEvent('ArrowDown');
        handler(evt);
        expect(setCellBooleanFn).not.toHaveBeenCalled();
        expect(setFocusedFn).toHaveBeenNthCalledWith(1, 1);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        // ArrowDown + expanded + focused equal -1
        handler = makeInputKeyDownHandler(
            true, //----- expanded
            -1, //-------- focused
            setFocusedFn, // - setFocused
            false, // ---- cellBoolean
            setCellBooleanFn, // - setCellBoolean
            ['one', 'two', 'three', 'four'], // ------- items
            '', // ------- text
            () => {}, // - onSelection
            () => {} //--- setShowItems
        );
        handler(evt);
        expect(setCellBooleanFn).toHaveBeenNthCalledWith(1, false);
        expect(setFocusedFn).toHaveBeenNthCalledWith(2, 0);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        // ArrowUp + expanded + focused not equal -1
        handler = makeInputKeyDownHandler(
            true, //----- expanded
            1, //-------- focused
            setFocusedFn, // - setFocused
            false, // ---- cellBoolean
            setCellBooleanFn, // - setCellBoolean
            ['one', 'two', 'three', 'four'], // ------- items
            '', // ------- text
            () => {}, // - onSelection
            () => {} //--- setShowItems
        );
        evt = makeEvent('ArrowUp');
        handler(evt);
        expect(setCellBooleanFn).toHaveBeenNthCalledWith(1, false);
        expect(setFocusedFn).toHaveBeenNthCalledWith(3, 0);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        // ArrowUp + expanded + focused equal -1
        handler = makeInputKeyDownHandler(
            true, //----- expanded
            -1, //-------- focused
            setFocusedFn, // - setFocused
            false, // ---- cellBoolean
            setCellBooleanFn, // - setCellBoolean
            ['one', 'two', 'three', 'four'], // ------- items
            '', // ------- text
            () => {}, // - onSelection
            () => {} //--- setShowItems
        );
        handler(evt);
        expect(setCellBooleanFn).toHaveBeenNthCalledWith(2, false);
        expect(setFocusedFn).toHaveBeenNthCalledWith(4, 2);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs with ArrowRight/ArrowLeft correctly', () => {
        const setFocusedFn = jest.fn();
        const setCellBooleanFn = jest.fn();
        let handler = makeInputKeyDownHandler(
            false, //----- expanded
            -1, //-------- focused
            setFocusedFn, // - setFocused
            false, // ---- cellBoolean
            setCellBooleanFn, // - setCellBoolean
            [], // ------- items
            '', // ------- text
            () => {}, // - onSelection
            () => {} //--- setShowItems
        );
        // no ArrowRight/ArrowLeft
        let evt = makeEvent('Tab');
        handler(evt);
        expect(setFocusedFn).not.toHaveBeenCalled();
        expect(setCellBooleanFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        // ArrowRight + focused equal -1
        evt = makeEvent('ArrowRight');
        handler(evt);
        expect(setCellBooleanFn).not.toHaveBeenCalled();
        expect(setFocusedFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        // ArrowRight + focused not equal -1 + cellBoolean equal true
        evt = makeEvent('ArrowRight');
        handler = makeInputKeyDownHandler(
            false, //----- expanded
            0, //-------- focused
            setFocusedFn, // - setFocused
            true, // ---- cellBoolean
            setCellBooleanFn, // - setCellBoolean
            ['one', 'two', 'three', 'four'], // ------- items
            '', // ------- text
            () => {}, // - onSelection
            () => {} //--- setShowItems
        );
        handler(evt);
        expect(setCellBooleanFn).toHaveBeenNthCalledWith(1, false);
        expect(setFocusedFn).toHaveBeenNthCalledWith(1, 1);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        // ArrowLeft + focused not equal -1 + cellBoolean equal false
        evt = makeEvent('ArrowLeft');
        handler = makeInputKeyDownHandler(
            false, //----- expanded
            1, //-------- focused
            setFocusedFn, // - setFocused
            false, // ---- cellBoolean
            setCellBooleanFn, // - setCellBoolean
            ['one', 'two', 'three', 'four'], // ------- items
            '', // ------- text
            () => {}, // - onSelection
            () => {} //--- setShowItems
        );
        handler(evt);
        expect(setCellBooleanFn).toHaveBeenNthCalledWith(2, true);
        expect(setFocusedFn).toHaveBeenNthCalledWith(2, 0);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
});
