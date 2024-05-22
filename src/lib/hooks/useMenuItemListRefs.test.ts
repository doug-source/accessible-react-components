import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { MutableRefObject } from 'react';
import { useMenuItemListRefs } from './useMenuItemListRefs';

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
        const hookRef = renderHook(({ list }) => useMenuItemListRefs(list), {
            initialProps,
        });
        const [ulRef, liListRef] = hookRef.result.current;
        expect(ulRef.current).toBeNull();
        expect(liListRef.current).toHaveLength(0);
        let dataList = ['aa', 'bb', 'cc'];
        liListRef.current = [
            makeLiElement(liListRef, dataList[0]),
            makeLiElement(liListRef, dataList[1]),
            makeLiElement(liListRef, dataList[2]),
        ];
        hookRef.rerender({ list: dataList });
        await waitFor(() => {
            expect(liListRef.current).toHaveLength(3);
            expect(dataList).toMatchObject(
                liListRef.current.map((li) => li?.id ?? '')
            );
        });
        dataList = ['dd'];
        if (liListRef.current[0]) {
            liListRef.current[0].id = dataList[0];
        }
        hookRef.rerender({ list: dataList });
        await waitFor(() => {
            expect(liListRef.current).toHaveLength(1);
            expect(dataList).toMatchObject(
                liListRef.current.map((li) => li?.id ?? '')
            );
        });
    });
});
