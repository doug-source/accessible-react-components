import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { defineScrollTop, makeCallbacks, scrollTo, triggerScrollTo } from '.';

const makeHTMLDivElement = (
    offsetTop: number,
    scrollTop: number,
    offsetHeight: number,
    scrollTo = () => {},
    scrollIntoView = () => {}
) => {
    return {
        offsetTop,
        scrollTop,
        offsetHeight,
        scrollTo,
        scrollIntoView,
    } as unknown as HTMLDivElement;
};

const makeWindowObject = (withMatches = false) => {
    return {
        matchMedia(): { matches: boolean } | boolean {
            if (withMatches) {
                return { matches: true };
            }
            return true;
        },
    } as unknown as Window & typeof globalThis;
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

const runHook = () => renderHook(() => useRef<(HTMLDivElement | null)[]>([]));

describe('defineScrollTop function', () => {
    test('runs correctly', () => {
        let comboMenu = makeHTMLDivElement(0, 3, 0);
        let opt = makeHTMLDivElement(2, 0, 0);
        expect(defineScrollTop(comboMenu, opt)).toBe(2);
        comboMenu = makeHTMLDivElement(0, 2, 3);
        opt = makeHTMLDivElement(4, 0, 5);
        expect(defineScrollTop(comboMenu, opt)).toBe(4 - 3 + 5);
        comboMenu = makeHTMLDivElement(0, 2, 2);
        opt = makeHTMLDivElement(3, 0, 0);
        expect(defineScrollTop(comboMenu, opt)).toBe(2);
    });
});

describe('scrollTo function', () => {
    test('runs correctly', () => {
        const hookRef = runHook();
        let output = scrollTo(
            hookRef.result.current,
            makeHTMLDivElement(0, 0, 0),
            0
        );
        expect(typeof output).toBe('undefined');
        hookRef.result.current.current[0] = makeHTMLDivElement(0, 0, 0);
        const jestFn = jest.fn();
        const comboMenu = makeHTMLDivElement(0, 0, 0, jestFn);
        output = scrollTo(hookRef.result.current, comboMenu, 0);
        expect(jestFn).toHaveBeenCalledWith(0, 0);
        expect(output).toBe(true);
    });
});

describe('triggerScrollTo function', () => {
    test('runs correctly', () => {
        defineWindowMatchMedia();
        const hookRef = runHook();
        const comboMenu = makeHTMLDivElement(0, 0, 0);
        let output = triggerScrollTo(hookRef.result.current, comboMenu, 0);
        expect(typeof output).toBe('undefined');
        output = triggerScrollTo(
            hookRef.result.current,
            comboMenu,
            0,
            makeWindowObject()
        );
        expect(typeof output).toBe('undefined');
        hookRef.result.current.current[0] = makeHTMLDivElement(0, 0, 0);
        output = triggerScrollTo(hookRef.result.current, comboMenu, 0);
        expect(output).toBe(true);
        const jestFn = jest.fn();
        hookRef.result.current.current[1] = makeHTMLDivElement(
            0,
            0,
            0,
            undefined,
            jestFn
        );
        output = triggerScrollTo(hookRef.result.current, comboMenu, 1);
        expect(jestFn).toHaveBeenCalled();
        expect(output).toBe(true);
    });
});

describe('makeCallbacks function', () => {
    test('runs with output correctly', () => {
        const jestFocusedFn = jest.fn();
        const jestSelectedFn = jest.fn();
        const jestExpandedFn = jest.fn();
        const jestShowActiveOptFn = jest.fn();
        const jestLabelSelectedFn = jest.fn();
        const output = makeCallbacks(
            'Chosen item one',
            'Chosen item two',
            [
                { label: 'Other Label', value: 'Other Value' },
                { label: 'Chosen item label', value: 'Chosen item two' },
            ],
            jestFocusedFn,
            jestSelectedFn,
            jestExpandedFn,
            jestShowActiveOptFn,
            jestLabelSelectedFn
        );
        expect(Array.isArray(output)).toBe(true);
        const [openCallback, chooseFocusedCallback] = output;
        expect(typeof openCallback).toBe('function');
        expect(typeof chooseFocusedCallback).toBe('function');
        let outputCallback = openCallback();
        expect(jestFocusedFn).toHaveBeenCalledTimes(1);
        expect(jestFocusedFn).toHaveBeenCalledWith('Chosen item one');
        expect(jestExpandedFn).toHaveBeenCalledTimes(1);
        expect(jestExpandedFn).toHaveBeenCalledWith(true);
        expect(jestShowActiveOptFn).toHaveBeenCalledTimes(1);
        expect(jestShowActiveOptFn).toHaveBeenCalledWith(true);
        expect(outputCallback).toBe(true);
        outputCallback = chooseFocusedCallback();
        expect(jestSelectedFn).toHaveBeenCalledTimes(1);
        expect(jestSelectedFn).toHaveBeenCalledWith('Chosen item two');
        expect(jestLabelSelectedFn).toHaveBeenCalledTimes(1);
        expect(jestLabelSelectedFn).toHaveBeenCalledWith('Chosen item label');
        expect(jestExpandedFn).toHaveBeenCalledTimes(2);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect(jestShowActiveOptFn).toHaveBeenCalledTimes(2);
        expect(jestShowActiveOptFn).toHaveBeenCalledWith(false);
        expect(outputCallback).toBe(true);
    });
});
