import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { MutableRefObject, useRef } from 'react';
import { useRowFocused } from './useRowFocused';

const createLiElement = (id = Date.now().toString()) => {
    return { id } as unknown as HTMLLIElement;
};

const createRef = (menuItemList: (HTMLLIElement | null)[] = []) => {
    return renderHook(() => useRef<(HTMLLIElement | null)[]>(menuItemList));
};

const runHook = (
    menuItemListRef = createRef([]).result.current,
    setActiveOpt = () => {},
    expanded = false,
    focused = -1,
    allow = false
) => {
    const initialProps: {
        menuItemListRef: MutableRefObject<(HTMLLIElement | null)[]>;
        setActiveOpt: (value: string | null) => void;
        expanded: boolean;
        focused: number;
        allow: boolean;
    } = {
        menuItemListRef,
        setActiveOpt,
        expanded,
        focused,
        allow,
    };
    return renderHook(
        ({ menuItemListRef, setActiveOpt, expanded, focused, allow }) => {
            return useRowFocused(
                menuItemListRef,
                setActiveOpt,
                expanded,
                focused,
                allow
            );
        },
        { initialProps }
    );
};

describe('useRowFocused hook', () => {
    test('runs correctly', () => {
        const menuItemListRef = createRef([]).result.current;
        const jestActiveOptFn = jest.fn();
        const hookRef = runHook(
            menuItemListRef,
            jestActiveOptFn,
            false,
            -1,
            false
        );
        expect(jestActiveOptFn).not.toHaveBeenCalled();
        hookRef.rerender({
            menuItemListRef,
            setActiveOpt: jestActiveOptFn,
            expanded: true,
            focused: -1,
            allow: true,
        });
        expect(jestActiveOptFn).toHaveBeenCalledWith(null);
        menuItemListRef.current[0] = createLiElement();
        hookRef.rerender({
            menuItemListRef,
            setActiveOpt: jestActiveOptFn,
            expanded: true,
            focused: 0,
            allow: true,
        });
        expect(jestActiveOptFn).toHaveBeenCalledWith(
            menuItemListRef.current[0].id
        );
    });
});
