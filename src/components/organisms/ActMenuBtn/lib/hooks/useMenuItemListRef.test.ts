import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { MutableRefObject } from 'react';
import { useMenuItemListRef } from './useMenuItemListRef';

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

describe('useMenuItemListRef hook', () => {
    test('runs correctly', async () => {
        const originList: string[] = [];
        const initialProps = { list: originList };
        const hookRef = renderHook(({ list }) => useMenuItemListRef(list), {
            initialProps,
        });
        expect(hookRef.result.current.current).toHaveLength(0);
        let dataList = ['aa', 'bb', 'cc'];
        hookRef.result.current.current = [
            makeLiElement(hookRef.result.current, dataList[0]),
            makeLiElement(hookRef.result.current, dataList[1]),
            makeLiElement(hookRef.result.current, dataList[2]),
        ];
        hookRef.rerender({ list: dataList });
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
        hookRef.rerender({ list: dataList });
        await waitFor(() => {
            expect(hookRef.result.current.current).toHaveLength(1);
            expect(dataList).toMatchObject(
                hookRef.result.current.current.map((li) => li?.id ?? '')
            );
        });
    });
});
