import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { KeyboardEvent, useRef } from 'react';
import { makeMenuItemKeydownHandler } from './makeMenuItemKeydown';

const makeEvent = (key: string, shiftKey = false) => {
    return {
        key,
        shiftKey,
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
    } as unknown as KeyboardEvent<HTMLLIElement>;
};

const makeButtonElement = (id = Date.now().toString()) => {
    return { id, focus: jest.fn() } as unknown as HTMLButtonElement;
};

const makeMutableRefObjectBtn = ($button: HTMLButtonElement | null = null) => {
    return renderHook(() => useRef<typeof $button>($button)).result.current;
};

const makeitemList = (): Parameters<typeof makeMenuItemKeydownHandler>[0] => {
    return [
        ['one', 'kwerty', () => {}],
        ['two', 'wonder', () => {}],
        ['three', 'yellow', () => {}],
    ];
};

describe('makeMenuItemKeydownHandler function', () => {
    test('runs with output correctly', () => {
        const output = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            () => {}, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        expect(typeof output).toBe('function');
    });
    test('runs using key and with output correctly', () => {
        const output = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            () => {}, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        expect(typeof output).toBe('function');
    });
    test('runs no ArrowDown/ArrowUp event correctly', () => {
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            jestFocusedFn, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('a');
        handler(evt);
        expect(jestFocusedFn).not.toHaveBeenCalled();
    });
    test('runs with ArrowDown event correctly', () => {
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            jestFocusedFn, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('ArrowDown');
        handler(evt);
        const newFocused = 1;
        expect(jestFocusedFn).toHaveBeenCalledWith(newFocused);
    });
    test('runs with ArrowUp event correctly', () => {
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('ArrowUp');
        handler(evt);
        const newFocused = 0;
        expect(jestFocusedFn).toHaveBeenCalledWith(newFocused);
    });
    test('runs no Enter/Space event correctly', () => {
        const jestExpandedFn = jest.fn();
        const jestCallbackFn = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            () => {}, // setFocused
            jestCallbackFn, // callback
            jestExpandedFn, // setExpanded
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(jestCallbackFn).not.toHaveBeenCalled();
        expect(jestExpandedFn).not.toHaveBeenCalled();
        expect($button.focus).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs with Enter event correctly', () => {
        const jestExpandedFn = jest.fn();
        const jestCallbackFn = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            () => {}, // setFocused
            jestCallbackFn, // callback
            jestExpandedFn, // setExpanded
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent('Enter');
        handler(evt);
        expect(jestCallbackFn).toHaveBeenCalledWith(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect($button.focus).toHaveBeenCalled();
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs with Space event correctly', () => {
        const jestExpandedFn = jest.fn();
        const jestCallbackFn = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            () => {}, // setFocused
            jestCallbackFn, // callback
            jestExpandedFn, // setExpanded
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent(' ');
        handler(evt);
        expect(jestCallbackFn).toHaveBeenCalledWith(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect($button.focus).toHaveBeenCalled();
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs no Escape/Shift+Tab event correctly', () => {
        const jestExpandedFn = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            () => {}, // setFocused
            () => {}, // callback
            jestExpandedFn, // setExpanded
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(jestExpandedFn).not.toHaveBeenCalled();
        expect($button.focus).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs Escape event correctly', () => {
        const jestExpandedFn = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            () => {}, // setFocused
            () => {}, // callback
            jestExpandedFn, // setExpanded
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent('Escape');
        handler(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect($button.focus).toHaveBeenCalled();
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs Shift+Tab event correctly', () => {
        const jestExpandedFn = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            () => {}, // setFocused
            () => {}, // callback
            jestExpandedFn, // setExpanded
            makeMutableRefObjectBtn($button)
        );
        const evt = makeEvent('Tab', true);
        handler(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect($button.focus).toHaveBeenCalled();
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs no Home/PageUp event correctly', () => {
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(jestFocusedFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs Home event correctly', () => {
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('Home');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(0);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs PageUp event correctly', () => {
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('PageUp');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(0);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs no End/PageDown event correctly', () => {
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(jestFocusedFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs End event correctly', () => {
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('End');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(2);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs PageDown event correctly', () => {
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('PageDown');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(2);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs no {typing} event correctly', () => {
        const focusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            focusedFn, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        expect(focusedFn).not.toHaveBeenCalled();
    });
    test('runs {typing} event correctly', async () => {
        const focusedFn = jest.fn();
        let handler = makeMenuItemKeydownHandler(
            makeitemList(),
            0,
            focusedFn, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        let evt = makeEvent('k');
        handler(evt);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        expect(focusedFn).toHaveBeenCalledWith(0);
        await new Promise((r) => setTimeout(r, 505));
        evt = makeEvent('w');
        handler(evt);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        expect(focusedFn).toHaveBeenCalledWith(1);
        await new Promise((r) => setTimeout(r, 505));
        evt = makeEvent('y');
        handler(evt);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        expect(focusedFn).toHaveBeenCalledWith(2);
        handler = makeMenuItemKeydownHandler(
            makeitemList(),
            2,
            () => {}, // setFocused
            () => {}, // callback
            () => {}, // setExpanded
            makeMutableRefObjectBtn()
        );
        handler(evt);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        expect(focusedFn).toHaveBeenCalledWith(0);
    });
});
