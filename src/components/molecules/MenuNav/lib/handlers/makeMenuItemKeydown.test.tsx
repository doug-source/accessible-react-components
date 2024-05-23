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

const makeHTMLAnchorElement = () => {
    return { click: jest.fn() } as unknown as HTMLAnchorElement;
};

const makeHTMLAnchorElementList = () => {
    return [
        makeHTMLAnchorElement(),
        makeHTMLAnchorElement(),
        makeHTMLAnchorElement(),
    ];
};

const makeHTMLAnchorElementsRef = (
    items: (HTMLAnchorElement | null)[] = []
) => {
    return renderHook(() => useRef<(HTMLAnchorElement | null)[]>(items));
};

const makeItemList = (): Parameters<typeof makeMenuItemKeydownHandler>[0] => {
    return [
        { href: 'one', content: 'kwerty' },
        { href: 'two', content: 'wonder' },
        { href: 'three', content: 'yellow' },
    ];
};

describe('makeMenuItemKeydownHandler function', () => {
    test('runs with output correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const output = makeMenuItemKeydownHandler(
            makeItemList(),
            0,
            () => {}, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        expect(typeof output).toBe('function');
    });
    test('runs no ArrowDown/ArrowUp event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            0,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        const evt = makeEvent('a');
        handler(evt);
        expect(jestFocusedFn).not.toHaveBeenCalled();
    });
    test('runs with ArrowDown event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            0,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        const evt = makeEvent('ArrowDown');
        handler(evt);
        const newFocused = 1;
        expect(jestFocusedFn).toHaveBeenCalledWith(newFocused);
    });
    test('runs with ArrowUp event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        const evt = makeEvent('ArrowUp');
        handler(evt);
        const newFocused = 0;
        expect(jestFocusedFn).toHaveBeenCalledWith(newFocused);
    });
    test('runs no Space event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestExpandedFn = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            0,
            () => {}, // setFocused
            jestExpandedFn, // setExpanded
            makeMutableRefObjectBtn($button),
            hookRef.result.current
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(jestExpandedFn).not.toHaveBeenCalled();
        expect($button.focus).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs with Space event correctly', () => {
        const anchorList = makeHTMLAnchorElementList();
        const hookRef = makeHTMLAnchorElementsRef(anchorList);
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            0,
            () => {}, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        const evt = makeEvent(' ');
        handler(evt);
        expect(anchorList[0].click).toHaveBeenCalled();
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs no Escape event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestExpandedFn = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            0,
            () => {}, // setFocused
            jestExpandedFn, // setExpanded
            makeMutableRefObjectBtn($button),
            hookRef.result.current
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(jestExpandedFn).not.toHaveBeenCalled();
        expect($button.focus).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs Escape event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestExpandedFn = jest.fn();
        const $button = makeButtonElement();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            0,
            () => {}, // setFocused
            jestExpandedFn, // setExpanded
            makeMutableRefObjectBtn($button),
            hookRef.result.current
        );
        const evt = makeEvent('Escape');
        handler(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect($button.focus).toHaveBeenCalled();
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs no Home/PageUp event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(jestFocusedFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs Home event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        const evt = makeEvent('Home');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(0);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs PageUp event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        const evt = makeEvent('PageUp');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(0);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs no End/PageDown event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(jestFocusedFn).not.toHaveBeenCalled();
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
    });
    test('runs End event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        const evt = makeEvent('End');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(2);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs PageDown event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const jestFocusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            1,
            jestFocusedFn, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        const evt = makeEvent('PageDown');
        handler(evt);
        expect(jestFocusedFn).toHaveBeenCalledWith(2);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs no {typing} event correctly', () => {
        const hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const focusedFn = jest.fn();
        const handler = makeMenuItemKeydownHandler(
            makeItemList(),
            0,
            focusedFn, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        const evt = makeEvent('Tab');
        handler(evt);
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        expect(focusedFn).not.toHaveBeenCalled();
    });
    test('runs {typing} event correctly', async () => {
        let hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        const focusedFn = jest.fn();
        let handler = makeMenuItemKeydownHandler(
            makeItemList(),
            0,
            focusedFn, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
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
        hookRef = makeHTMLAnchorElementsRef(makeHTMLAnchorElementList());
        handler = makeMenuItemKeydownHandler(
            makeItemList(),
            2,
            () => {}, // setFocused
            () => {}, // setExpanded
            makeMutableRefObjectBtn(),
            hookRef.result.current
        );
        handler(evt);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
        expect(focusedFn).toHaveBeenCalledWith(0);
    });
});
