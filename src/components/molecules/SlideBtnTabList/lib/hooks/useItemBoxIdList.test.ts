import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useItemBoxIdList } from './useItemBoxIdList';

const makeDivElement = (id = Date.now().toString()) => {
    return { id } as unknown as HTMLDivElement;
};

const createRef = (itemBoxList: (HTMLDivElement | null)[] = []) => {
    return renderHook(() => useRef<(HTMLDivElement | null)[]>(itemBoxList));
};

const runHook = (...args: Parameters<typeof useItemBoxIdList>) => {
    return renderHook(() => {
        return useItemBoxIdList(...args);
    });
};

describe('useItemBoxIdList hook', () => {
    test('runs correctly', () => {
        const hookRef = runHook(createRef().result.current);
        const [idList] = hookRef.result.current;
        expect(Array.isArray(idList)).toBe(true);
        expect(idList).toHaveLength(0);
    });
    test("runs with HTMLDivElement as itemBoxListRef's item correctly", () => {
        const divList = [makeDivElement(), makeDivElement()];
        const hookRef = runHook(createRef(divList).result.current);
        const [idList] = hookRef.result.current;
        expect(idList).toHaveLength(2);
        divList.forEach((div, i) => expect(idList[i]).toBe(div.id));
    });
    test("runs with null as itemBoxListRef's item correctly", () => {
        const divList = [null, null];
        const hookRef = runHook(createRef(divList).result.current);
        const [idList] = hookRef.result.current;
        expect(idList).toHaveLength(2);
        divList.forEach((_, i) => expect(idList[i]).toBe(undefined));
    });
});
