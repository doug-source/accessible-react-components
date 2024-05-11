import { renderHook, waitFor } from '@testing-library/react';
import { MutableRefObject, useRef } from 'react';
import { useRowFocused } from './useRowFocused';

const makeLiElement = (
    ref: MutableRefObject<(HTMLLIElement | null)[]>,
    id = Date.now().toString()
) => {
    return {
        id,
        focus: jest.fn(),
        replaceWith(el: HTMLLIElement) {
            const index = ref.current.findIndex((item) => item === this);
            ref.current[index] = el;
        },
    } as unknown as HTMLLIElement;
};

const createMutableRefObjectList = <T>() => {
    return renderHook(() => useRef<T[]>([])).result.current;
};

const runUseRowFocusedHook = (
    menuItemListRef: MutableRefObject<(HTMLLIElement | null)[]>
) => {
    const initialProps = {
        menuItemListRef,
        expanded: false,
        focused: -1,
    };
    return renderHook(
        ({ menuItemListRef, expanded, focused }) => {
            useRowFocused(menuItemListRef, expanded, focused);
        },
        { initialProps }
    );
};

describe('useRowFocused hook', () => {
    test('runs correctly', async () => {
        const ref = createMutableRefObjectList<HTMLLIElement | null>();
        const { rerender } = runUseRowFocusedHook(ref);
        expect(ref.current).toHaveLength(0);
        ref.current = [
            makeLiElement(ref),
            makeLiElement(ref),
            makeLiElement(ref),
        ];
        rerender({ menuItemListRef: ref, expanded: true, focused: -1 });
        ref.current.forEach((li) => expect(li?.focus).not.toHaveBeenCalled());
        rerender({ menuItemListRef: ref, expanded: true, focused: 0 });
        await waitFor(() => {
            expect(ref.current[0]?.focus).toHaveBeenCalled();
            expect(ref.current[1]?.focus).not.toHaveBeenCalled();
            expect(ref.current[2]?.focus).not.toHaveBeenCalled();
        });
        ref.current[0]?.replaceWith(makeLiElement(ref));
        rerender({ menuItemListRef: ref, expanded: true, focused: 1 });
        await waitFor(() => {
            expect(ref.current[0]?.focus).not.toHaveBeenCalled();
            expect(ref.current[1]?.focus).toHaveBeenCalled();
            expect(ref.current[2]?.focus).not.toHaveBeenCalled();
        });
        ref.current[1]?.replaceWith(makeLiElement(ref));
        rerender({ menuItemListRef: ref, expanded: true, focused: 2 });
        await waitFor(() => {
            expect(ref.current[0]?.focus).not.toHaveBeenCalled();
            expect(ref.current[1]?.focus).not.toHaveBeenCalled();
            expect(ref.current[2]?.focus).toHaveBeenCalled();
        });
    });
});
