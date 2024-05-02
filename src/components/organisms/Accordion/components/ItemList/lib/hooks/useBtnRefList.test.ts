import { renderHook } from '@testing-library/react';
import { useBtnRefList } from './useBtnRefList';

const createBtn = () => {
    return document.createElement('button');
};

const runHook = () => {
    const initialProps: { list: string[] } = { list: [] };
    return renderHook(
        ({ list }) => {
            return useBtnRefList(list);
        },
        { initialProps }
    );
};

describe('useBtnRefList hook', () => {
    test('runs initially and correctly', () => {
        const hookRef = runHook();
        expect(hookRef.result.current.current).toHaveLength(0);
        const btnOne = createBtn();
        const btnTwo = createBtn();
        const btnThree = createBtn();

        hookRef.result.current.current = [btnOne, btnTwo, btnThree];

        hookRef.rerender({ list: ['one', 'two'] });
        expect(hookRef.result.current.current).toHaveLength(2);
        expect(hookRef.result.current.current.at(0)).toBe(btnOne);
        expect(hookRef.result.current.current.at(-1)).toBe(btnTwo);

        hookRef.result.current.current = [btnOne, btnTwo, btnThree];

        hookRef.rerender({ list: [] });
        expect(hookRef.result.current.current).toHaveLength(0);
    });
});
