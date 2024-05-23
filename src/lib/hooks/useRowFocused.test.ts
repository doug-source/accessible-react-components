import { renderHook, waitFor } from '@testing-library/react';
import { MutableRefObject, useRef } from 'react';
import { useRowFocused } from './useRowFocused';

const makeElement = (
    ref: MutableRefObject<(HTMLElement | null)[]>,
    id = Date.now().toString()
) => {
    return {
        id,
        focus: jest.fn(),
        replaceWith(el: HTMLElement) {
            const index = ref.current.findIndex((item) => item === this);
            ref.current[index] = el;
        },
    } as unknown as HTMLElement;
};

const createMutableRefObjectList = <T>() => {
    return renderHook(() => useRef<T[]>([])).result.current;
};

const runUseRowFocusedHook = (
    itemListRef: MutableRefObject<(HTMLElement | null)[]>
) => {
    const initialProps = {
        itemListRef,
        expanded: false,
        focused: -1,
        allow: false,
    };
    return renderHook(
        ({ itemListRef, expanded, focused, allow }) => {
            useRowFocused(itemListRef, expanded, focused, allow);
        },
        { initialProps }
    );
};

describe('useRowFocused hook', () => {
    test('runs correctly', async () => {
        const ref = createMutableRefObjectList<HTMLElement | null>();
        const { rerender } = runUseRowFocusedHook(ref);
        expect(ref.current).toHaveLength(0);
        ref.current = [makeElement(ref), makeElement(ref), makeElement(ref)];
        rerender({
            itemListRef: ref,
            expanded: true,
            focused: -1,
            allow: false,
        });
        ref.current.forEach((li) => expect(li?.focus).not.toHaveBeenCalled());
        rerender({
            itemListRef: ref,
            expanded: true,
            focused: 0,
            allow: true,
        });
        await waitFor(() => {
            expect(ref.current[0]?.focus).toHaveBeenCalled();
            expect(ref.current[1]?.focus).not.toHaveBeenCalled();
            expect(ref.current[2]?.focus).not.toHaveBeenCalled();
        });
        ref.current[0]?.replaceWith(makeElement(ref));
        rerender({
            itemListRef: ref,
            expanded: true,
            focused: 1,
            allow: true,
        });
        await waitFor(() => {
            expect(ref.current[0]?.focus).not.toHaveBeenCalled();
            expect(ref.current[1]?.focus).toHaveBeenCalled();
            expect(ref.current[2]?.focus).not.toHaveBeenCalled();
        });
        ref.current[1]?.replaceWith(makeElement(ref));
        rerender({
            itemListRef: ref,
            expanded: true,
            focused: 2,
            allow: true,
        });
        await waitFor(() => {
            expect(ref.current[0]?.focus).not.toHaveBeenCalled();
            expect(ref.current[1]?.focus).not.toHaveBeenCalled();
            expect(ref.current[2]?.focus).toHaveBeenCalled();
        });
    });
});
