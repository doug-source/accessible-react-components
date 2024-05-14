import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { MutableRefObject, useRef } from 'react';
import { useBoxFocused } from './useBoxFocused';

const createUlElement = () => {
    return { focus: jest.fn() } as unknown as HTMLUListElement;
};

const runRefHook = (el: HTMLUListElement | null = null) => {
    return renderHook(() => useRef<HTMLUListElement | null>(el));
};

const runBoxFocused = (
    ref: MutableRefObject<HTMLUListElement | null>,
    expanded: boolean,
    allow: boolean
) => {
    const initialProps = { boxRef: ref, expanded, allow };
    return renderHook(
        ({ boxRef, expanded, allow }) => {
            return useBoxFocused(boxRef, expanded, allow);
        },
        { initialProps }
    );
};

describe('useBoxFocused hook', () => {
    test('runs correctly', () => {
        const ref = runRefHook();
        const hookRef = runBoxFocused(ref.result.current, false, false);
        expect(ref.result.current.current).toBeNull();
        hookRef.rerender({
            boxRef: ref.result.current,
            allow: true,
            expanded: true,
        });
        expect(ref.result.current.current).toBeNull();
    });
    test('runs with HTMLUListElement correctly', () => {
        const ulElement = createUlElement();
        const ref = runRefHook(ulElement);
        const hookRef = runBoxFocused(ref.result.current, false, false);
        expect(ref.result.current.current?.focus).not.toHaveBeenCalled();
        hookRef.rerender({
            boxRef: ref.result.current,
            allow: true,
            expanded: true,
        });
        expect(ref.result.current.current?.focus).toHaveBeenCalled();
    });
});
