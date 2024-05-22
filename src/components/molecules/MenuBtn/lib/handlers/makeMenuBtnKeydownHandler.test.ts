import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { KeyboardEvent, useRef } from 'react';
import { makeMenuBtnKeydownHandler } from './makeMenuBtnKeydownHandler';

const makeListRef = (list: Array<HTMLElement | null> = []) => {
    return renderHook(() => useRef<typeof list>(list)).result.current;
};

const makeEvent = (key: string) => {
    return {
        key,
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
    } as unknown as KeyboardEvent<HTMLElement>;
};

describe('makeMenuBtnKeydownHandler function', () => {
    test('runs with output correctly', () => {
        const output = makeMenuBtnKeydownHandler(
            false,
            () => {},
            () => {},
            makeListRef()
        );
        expect(typeof output).toBe('function');
    });
    test('runs with ArrowDown/Down event correctly', () => {
        const jestExpandedFn = jest.fn();
        const jestFocusedFn = jest.fn();
        const handler = makeMenuBtnKeydownHandler(
            false,
            jestExpandedFn,
            jestFocusedFn,
            makeListRef()
        );
        let evt = makeEvent('a');
        handler(evt);
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        evt = makeEvent('ArrowDown');
        handler(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(true);
        expect(jestFocusedFn).toHaveBeenCalledWith(0);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs with ArrowUp/Up event correctly', () => {
        const jestExpandedFn = jest.fn();
        const jestFocusedFn = jest.fn();
        const handler = makeMenuBtnKeydownHandler(
            false,
            jestExpandedFn,
            jestFocusedFn,
            makeListRef([
                document.createElement('div'),
                document.createElement('div'),
                document.createElement('div'),
            ])
        );
        let evt = makeEvent('a');
        handler(evt);
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        evt = makeEvent('ArrowUp');
        handler(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(true);
        expect(jestFocusedFn).toHaveBeenCalledWith(2);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
    test('runs with Escape event correctly', () => {
        const jestExpandedFn = jest.fn();
        const handler = makeMenuBtnKeydownHandler(
            false,
            jestExpandedFn,
            () => {},
            makeListRef()
        );
        let evt = makeEvent('a');
        handler(evt);
        expect(evt.stopPropagation).not.toHaveBeenCalled();
        expect(evt.preventDefault).not.toHaveBeenCalled();
        evt = makeEvent('Escape');
        handler(evt);
        expect(jestExpandedFn).toHaveBeenCalledWith(false);
        expect(evt.stopPropagation).toHaveBeenCalled();
        expect(evt.preventDefault).toHaveBeenCalled();
    });
});
