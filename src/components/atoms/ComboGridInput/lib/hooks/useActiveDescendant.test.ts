import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useActiveDescendant } from './useActiveDescendant';

const makeCellListRef = (list: (HTMLDivElement | null)[] = []) => {
    return renderHook(() => useRef<(HTMLDivElement | null)[]>(list));
};

const runHook = () => {
    const initialProps = {
        focused: -1,
        cellBoolean: false,
        cellListRef: makeCellListRef().result.current,
    };
    return renderHook(
        ({ focused, cellBoolean, cellListRef }) => {
            return useActiveDescendant(focused, cellBoolean, cellListRef);
        },
        { initialProps }
    );
};

describe('<useActiveDescendant /> component', () => {
    test('renders correctly', () => {
        const hookRef = runHook();
        expect(hookRef.result.current.at(0)).toBe('');
    });
});
