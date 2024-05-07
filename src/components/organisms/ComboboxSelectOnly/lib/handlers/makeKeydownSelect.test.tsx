import { renderHook, waitFor } from '@testing-library/react';
import { KeyboardEvent, MutableRefObject, useRef } from 'react';
import { makeKeydownSelect } from './makeKeydownSelect';

const makeKeyboardEvent = (key: string, altKey = false) => {
    return {
        key,
        altKey,
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
    } as unknown as KeyboardEvent<HTMLElement>;
};

const createHTMLDivElement = (
    scrollIntoView = () => {},
    scrollTo = () => {},
    scrollTop = 0,
    offsetHeight = 0,
    offsetTop = 0
) => {
    return {
        scrollIntoView,
        scrollTo,
        scrollTop,
        offsetHeight,
        offsetTop,
    } as unknown as HTMLDivElement;
};

const createRef = <T,>(initialValue: T): MutableRefObject<T> => {
    const hookRef = renderHook(() => useRef<T>(initialValue));
    return hookRef.result.current;
};

const defineWindowMatchMedia = () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
};

describe('makeKeydownSelect function', () => {
    beforeAll(() => {
        defineWindowMatchMedia();
    });
    test('runs with output correctly', () => {
        const output = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            () => {},
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [{ label: 'focused label', value: 'focused value' }],
            () => true,
            () => true,
            false,
            () => {},
            () => {},
            () => {}
        );
        expect(typeof output).toBe('function');
    });
    test('runs with {typing} event correctly', async () => {
        const optScrollIntoView = jest.fn();
        const jestFocusedFn = jest.fn();
        const handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(createHTMLDivElement()),
            createRef<(HTMLDivElement | null)[]>([
                createHTMLDivElement(),
                createHTMLDivElement(optScrollIntoView),
            ]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'second value' },
            ],
            () => true,
            () => true,
            false,
            () => {},
            () => {},
            () => {}
        );
        const event = makeKeyboardEvent('s');
        handler(event);
        expect(jestFocusedFn).toHaveBeenCalledWith('second value');
        await waitFor(() => {
            expect(optScrollIntoView).toHaveBeenCalled();
        });
    });
    test('runs with Space/Enter event correctly', () => {
        const jestOpenCallback = jest.fn();
        const jestChooseFocusedCallback = jest.fn();
        let handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            () => {},
            () => {},
            createRef<HTMLDivElement | null>(createHTMLDivElement()),
            createRef<(HTMLDivElement | null)[]>([]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'second value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => {
                jestChooseFocusedCallback();
                return true;
            },
            false,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent(' '));
        expect(jestOpenCallback).toHaveBeenCalledTimes(1);
        expect(jestChooseFocusedCallback).not.toHaveBeenCalled();
        handler(makeKeyboardEvent('Enter'));
        expect(jestOpenCallback).toHaveBeenCalledTimes(2);
        expect(jestChooseFocusedCallback).not.toHaveBeenCalled();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            () => {},
            () => {},
            createRef<HTMLDivElement | null>(createHTMLDivElement()),
            createRef<(HTMLDivElement | null)[]>([]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'second value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => {
                jestChooseFocusedCallback();
                return true;
            },
            true,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent(' '));
        expect(jestOpenCallback).toHaveBeenCalledTimes(2);
        expect(jestChooseFocusedCallback).toHaveBeenCalledTimes(1);
        handler(makeKeyboardEvent('Enter'));
        expect(jestOpenCallback).toHaveBeenCalledTimes(2);
        expect(jestChooseFocusedCallback).toHaveBeenCalledTimes(2);
    });
    test('runs with Escape event correctly', () => {
        const jestLabelSelectedFn = jest.fn();
        const jestFocusedFn = jest.fn();
        const jestSelectedFn = jest.fn();
        const jestExpandedFn = jest.fn();
        const jestShowActiveOptFn = jest.fn();
        let handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            jestSelectedFn,
            createRef<HTMLDivElement | null>(createHTMLDivElement()),
            createRef<(HTMLDivElement | null)[]>([]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'second value' },
            ],
            () => true,
            () => true,
            true,
            jestExpandedFn,
            jestShowActiveOptFn,
            jestLabelSelectedFn
        );
        handler(makeKeyboardEvent('Escape'));
        expect(jestLabelSelectedFn).not.toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        expect(jestSelectedFn).not.toHaveBeenCalled();
        expect(jestExpandedFn).toHaveBeenCalledTimes(1);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect(jestShowActiveOptFn).toHaveBeenCalledTimes(1);
        expect(jestShowActiveOptFn).toHaveBeenCalledWith(false);
        handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            jestSelectedFn,
            createRef<HTMLDivElement | null>(createHTMLDivElement()),
            createRef<(HTMLDivElement | null)[]>([]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'second value' },
            ],
            () => true,
            () => true,
            false,
            jestExpandedFn,
            jestShowActiveOptFn,
            jestLabelSelectedFn
        );
        handler(makeKeyboardEvent('Escape'));
        expect(jestLabelSelectedFn).toHaveBeenCalled();
        expect(jestFocusedFn).toHaveBeenCalledWith(null);
        expect(jestSelectedFn).toHaveBeenCalledWith(null);
        expect(jestExpandedFn).toHaveBeenCalledTimes(2);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect(jestShowActiveOptFn).toHaveBeenCalledTimes(2);
        expect(jestShowActiveOptFn).toHaveBeenCalledWith(false);
    });
    test('runs with ArrowUp event correctly', () => {
        const jestOpenCallback = jest.fn();
        const jestChooseFocusedCallback = jest.fn();
        const jestFocusedFn = jest.fn();
        let handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'focused value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => {
                jestChooseFocusedCallback();
                return true;
            },
            true,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent('ArrowUp'));
        expect(jestOpenCallback).not.toHaveBeenCalled();
        expect(jestChooseFocusedCallback).not.toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'focused value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => {
                jestChooseFocusedCallback();
                return true;
            },
            false,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent('ArrowUp'));
        expect(jestOpenCallback).toHaveBeenCalled();
        expect(jestChooseFocusedCallback).not.toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'focused value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => {
                jestChooseFocusedCallback();
                return true;
            },
            true,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent('ArrowUp', true));
        expect(jestOpenCallback).toHaveBeenCalledTimes(1);
        expect(jestChooseFocusedCallback).toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        const options = [
            { label: 'first label', value: 'first value' },
            { label: 'any label', value: 'any value' },
            { label: 'second label', value: 'focused value' },
        ];
        handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(createHTMLDivElement()),
            createRef<(HTMLDivElement | null)[]>([]),
            options,
            () => {
                jestOpenCallback();
                return true;
            },
            () => {
                jestChooseFocusedCallback();
                return true;
            },
            true,
            () => {},
            () => {},
            () => {}
        );
        delete options[1];
        let newEvent = makeKeyboardEvent('ArrowUp');
        handler(newEvent);
        expect(newEvent.stopPropagation).not.toHaveBeenCalled();
        expect(newEvent.preventDefault).not.toHaveBeenCalled();
        expect(jestOpenCallback).toHaveBeenCalledTimes(1);
        expect(jestChooseFocusedCallback).toHaveBeenCalledTimes(1);
        expect(jestFocusedFn).not.toHaveBeenCalled();
        const comboMenuScrollTo = jest.fn();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(
                createHTMLDivElement(undefined, comboMenuScrollTo)
            ),
            createRef<(HTMLDivElement | null)[]>([
                createHTMLDivElement(),
                createHTMLDivElement(),
            ]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'focused value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => {
                jestChooseFocusedCallback();
                return true;
            },
            true,
            () => {},
            () => {},
            () => {}
        );
        newEvent = makeKeyboardEvent('ArrowUp');
        handler(newEvent);
        expect(jestOpenCallback).toHaveBeenCalledTimes(1);
        expect(jestChooseFocusedCallback).toHaveBeenCalledTimes(1);
        expect(jestFocusedFn).toHaveBeenCalledWith('first value');
        expect(comboMenuScrollTo).toHaveBeenCalledWith(0, 0);
        expect(newEvent.stopPropagation).toHaveBeenCalled();
        expect(newEvent.preventDefault).toHaveBeenCalled();
    });
    test('runs with ArrowDown event correctly', () => {
        const jestOpenCallback = jest.fn();
        const jestFocusedFn = jest.fn();
        let handler = makeKeydownSelect<string>(
            'itemName value',
            'first value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'focused value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            true,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent('ArrowDown'));
        expect(jestOpenCallback).not.toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'first value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'focused value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            false,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent('ArrowDown'));
        expect(jestOpenCallback).toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        const options = [
            { label: 'first label', value: 'first value' },
            { label: 'any label', value: 'any value' },
            { label: 'second label', value: 'focused value' },
        ];
        handler = makeKeydownSelect<string>(
            'itemName value',
            'first value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(createHTMLDivElement()),
            createRef<(HTMLDivElement | null)[]>([]),
            options,
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            true,
            () => {},
            () => {},
            () => {}
        );
        delete options[1];
        let newEvent = makeKeyboardEvent('ArrowDown');
        handler(newEvent);
        expect(newEvent.stopPropagation).not.toHaveBeenCalled();
        expect(newEvent.preventDefault).not.toHaveBeenCalled();
        expect(jestOpenCallback).toHaveBeenCalledTimes(1);
        expect(jestFocusedFn).not.toHaveBeenCalled();
        const comboMenuScrollTo = jest.fn();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'first value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(
                createHTMLDivElement(undefined, comboMenuScrollTo)
            ),
            createRef<(HTMLDivElement | null)[]>([
                createHTMLDivElement(),
                createHTMLDivElement(),
            ]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'focused value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            true,
            () => {},
            () => {},
            () => {}
        );
        newEvent = makeKeyboardEvent('ArrowDown');
        handler(newEvent);
        expect(jestOpenCallback).toHaveBeenCalledTimes(1);
        expect(jestFocusedFn).toHaveBeenCalledWith('focused value');
        expect(comboMenuScrollTo).toHaveBeenCalledWith(0, 0);
        expect(newEvent.stopPropagation).toHaveBeenCalled();
        expect(newEvent.preventDefault).toHaveBeenCalled();
    });
    test('runs with Home event correctly', async () => {
        const jestFocusedFn = jest.fn();
        const jestOpenCallback = jest.fn();
        let handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [],
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            true,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent('Home'));
        expect(jestFocusedFn).not.toHaveBeenCalled();
        expect(jestOpenCallback).not.toHaveBeenCalled();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [],
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            false,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent('Home'));
        expect(jestOpenCallback).toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'focused value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            true,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent('Home'));
        expect(jestOpenCallback).toHaveBeenCalledTimes(1);
        expect(jestFocusedFn).toHaveBeenCalledWith('first value');

        const optScrollIntoView = jest.fn();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'focused value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(createHTMLDivElement()),
            createRef<(HTMLDivElement | null)[]>([
                createHTMLDivElement(optScrollIntoView),
                createHTMLDivElement(),
            ]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'focused value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            true,
            () => {},
            () => {},
            () => {}
        );
        const newEvent = makeKeyboardEvent('Home');
        handler(newEvent);
        expect(jestOpenCallback).toHaveBeenCalledTimes(1);
        expect(jestFocusedFn).toHaveBeenCalledTimes(2);
        await waitFor(() => {
            expect(optScrollIntoView).toHaveBeenCalled();
            expect(newEvent.stopPropagation).toHaveBeenCalled();
            expect(newEvent.preventDefault).toHaveBeenCalled();
        });
    });
    test('runs with End event correctly', async () => {
        const jestFocusedFn = jest.fn();
        const jestOpenCallback = jest.fn();
        let handler = makeKeydownSelect<string>(
            'itemName value',
            'first value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [],
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            true,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent('End'));
        expect(jestFocusedFn).not.toHaveBeenCalled();
        expect(jestOpenCallback).not.toHaveBeenCalled();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'first value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [],
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            false,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent('End'));
        expect(jestOpenCallback).toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'first value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'focused value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            true,
            () => {},
            () => {},
            () => {}
        );
        handler(makeKeyboardEvent('End'));
        expect(jestOpenCallback).toHaveBeenCalledTimes(1);
        expect(jestFocusedFn).toHaveBeenCalledWith('focused value');

        const optScrollIntoView = jest.fn();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'first value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(createHTMLDivElement()),
            createRef<(HTMLDivElement | null)[]>([
                createHTMLDivElement(),
                createHTMLDivElement(optScrollIntoView),
            ]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'focused value' },
            ],
            () => {
                jestOpenCallback();
                return true;
            },
            () => true,
            true,
            () => {},
            () => {},
            () => {}
        );
        const newEvent = makeKeyboardEvent('End');
        handler(newEvent);
        expect(jestOpenCallback).toHaveBeenCalledTimes(1);
        expect(jestFocusedFn).toHaveBeenCalledTimes(2);
        await waitFor(() => {
            expect(optScrollIntoView).toHaveBeenCalled();
            expect(newEvent.stopPropagation).toHaveBeenCalled();
            expect(newEvent.preventDefault).toHaveBeenCalled();
        });
    });
    test('runs with PageUp event correctly', async () => {
        const jestFocusedFn = jest.fn();
        let handler = makeKeydownSelect<string>(
            'itemName value',
            'seventh value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [],
            () => true,
            () => true,
            false,
            () => {},
            () => {},
            () => {}
        );
        let newEvent = makeKeyboardEvent('PageUp');
        handler(newEvent);
        expect(newEvent.stopPropagation).not.toHaveBeenCalled();
        expect(newEvent.preventDefault).not.toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        const optScrollIntoView = jest.fn();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'seventh value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(createHTMLDivElement()),
            createRef<(HTMLDivElement | null)[]>([
                createHTMLDivElement(optScrollIntoView),
                createHTMLDivElement(),
                createHTMLDivElement(),
                createHTMLDivElement(),
                createHTMLDivElement(),
                createHTMLDivElement(),
                createHTMLDivElement(),
            ]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'second value' },
                { label: 'third label', value: 'third value' },
                { label: 'forth label', value: 'forth value' },
                { label: 'fifth label', value: 'fifth value' },
                { label: 'sixth label', value: 'sixth value' },
                { label: 'seventh label', value: 'seventh value' },
            ],
            () => true,
            () => true,
            true,
            () => {},
            () => {},
            () => {}
        );
        newEvent = makeKeyboardEvent('PageUp');
        handler(newEvent);
        expect(jestFocusedFn).toHaveBeenCalledWith('first value');
        await waitFor(() => {
            expect(optScrollIntoView).toHaveBeenCalled();
            expect(newEvent.stopPropagation).toHaveBeenCalled();
            expect(newEvent.preventDefault).toHaveBeenCalled();
        });
    });
    test('runs with PageDown event correctly', async () => {
        const jestFocusedFn = jest.fn();
        let handler = makeKeydownSelect<string>(
            'itemName value',
            'first value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(null),
            createRef<(HTMLDivElement | null)[]>([]),
            [],
            () => true,
            () => true,
            false,
            () => {},
            () => {},
            () => {}
        );
        let newEvent = makeKeyboardEvent('PageDown');
        handler(newEvent);
        expect(newEvent.stopPropagation).not.toHaveBeenCalled();
        expect(newEvent.preventDefault).not.toHaveBeenCalled();
        expect(jestFocusedFn).not.toHaveBeenCalled();
        const optScrollIntoView = jest.fn();
        handler = makeKeydownSelect<string>(
            'itemName value',
            'first value',
            jestFocusedFn,
            () => {},
            createRef<HTMLDivElement | null>(createHTMLDivElement()),
            createRef<(HTMLDivElement | null)[]>([
                createHTMLDivElement(),
                createHTMLDivElement(),
                createHTMLDivElement(),
                createHTMLDivElement(),
                createHTMLDivElement(),
                createHTMLDivElement(),
                createHTMLDivElement(optScrollIntoView),
            ]),
            [
                { label: 'first label', value: 'first value' },
                { label: 'second label', value: 'second value' },
                { label: 'third label', value: 'third value' },
                { label: 'forth label', value: 'forth value' },
                { label: 'fifth label', value: 'fifth value' },
                { label: 'sixth label', value: 'sixth value' },
                { label: 'seventh label', value: 'seventh value' },
            ],
            () => true,
            () => true,
            true,
            () => {},
            () => {},
            () => {}
        );
        newEvent = makeKeyboardEvent('PageDown');
        handler(newEvent);
        expect(jestFocusedFn).toHaveBeenCalledWith('seventh value');
        await waitFor(() => {
            expect(optScrollIntoView).toHaveBeenCalled();
            expect(newEvent.stopPropagation).toHaveBeenCalled();
            expect(newEvent.preventDefault).toHaveBeenCalled();
        });
    });
});
