import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { MutableRefObject, useRef } from 'react';
import { useMenuItemListRef, useRowFocused } from './useMenuItemListRef';

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
describe('useMenuItemListRef hook', () => {
    test('runs correctly', async () => {
        const originList: string[] = [];
        const initialProps = { list: originList, expanded: false, focused: -1 };
        const hookRef = renderHook(
            ({ list, expanded, focused }) =>
                useMenuItemListRef(list, expanded, focused),
            {
                initialProps,
            }
        );
        expect(hookRef.result.current.current).toHaveLength(0);
        let dataList = ['aa', 'bb', 'cc'];
        hookRef.result.current.current = [
            makeLiElement(hookRef.result.current, dataList[0]),
            makeLiElement(hookRef.result.current, dataList[1]),
            makeLiElement(hookRef.result.current, dataList[2]),
        ];
        hookRef.rerender({ list: dataList, expanded: false, focused: -1 });
        await waitFor(() => {
            expect(hookRef.result.current.current).toHaveLength(3);
            expect(dataList).toMatchObject(
                hookRef.result.current.current.map((li) => li?.id ?? '')
            );
        });
        dataList = ['dd'];
        if (hookRef.result.current.current[0]) {
            hookRef.result.current.current[0].id = dataList[0];
        }
        hookRef.rerender({ list: dataList, expanded: false, focused: -1 });
        await waitFor(() => {
            expect(hookRef.result.current.current).toHaveLength(1);
            expect(dataList).toMatchObject(
                hookRef.result.current.current.map((li) => li?.id ?? '')
            );
        });
    });
});
