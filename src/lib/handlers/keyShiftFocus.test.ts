// import { MutableRefObject } from 'react';
import { renderHook } from '@testing-library/react';
import { KeyboardEvent, useRef } from 'react';
import { makeKeyShiftFocusHandler } from './keyShiftFocus';

const createHTMLElement = () => {
    return {
        focus: jest.fn(),
    } as unknown as HTMLElement;
};

const createEvent = (shiftKey: boolean) => {
    return {
        shiftKey,
    } as unknown as KeyboardEvent<HTMLElement>;
};

const runHook = () => {
    return renderHook(() => {
        return useRef<HTMLElement | null>(null);
    });
};

describe('makeKeyShiftFocusHandler function', () => {
    test('runs returning a function correctly', () => {
        const hookRef = runHook();
        const handler = makeKeyShiftFocusHandler(hookRef.result.current);
        expect(typeof handler).toBe('function');
    });
    test("runs with handler's output correct", () => {
        const hookRef = runHook();
        const elRef = hookRef.result.current;
        const handler = makeKeyShiftFocusHandler(elRef);
        expect(handler(createEvent(false))).toBe(false);
        const $element = createHTMLElement();
        elRef.current = $element;
        expect(handler(createEvent(false))).toBe(true);
    });
    test('runs with HTMLElement triggering focus correct', () => {
        const hookRef = runHook();
        const elRef = hookRef.result.current;
        elRef.current = createHTMLElement();
        const handlerOne = makeKeyShiftFocusHandler(elRef);
        handlerOne(createEvent(true));
        expect(elRef.current.focus).not.toHaveBeenCalled();
        handlerOne(createEvent(false));
        expect(elRef.current.focus).toHaveBeenCalledTimes(1);
        elRef.current.focus = jest.fn();
        const handlerTwo = makeKeyShiftFocusHandler(elRef, true);
        handlerTwo(createEvent(false));
        expect(elRef.current.focus).not.toHaveBeenCalled();
        handlerTwo(createEvent(true));
        expect(elRef.current.focus).toHaveBeenCalledTimes(1);
    });
});
