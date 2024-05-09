import { MutableRefObject, useEffect, useRef } from 'react';

export const useRowFocused = (
    menuItemListRef: MutableRefObject<(HTMLLIElement | null)[]>,
    expanded: boolean,
    focused: number
) => {
    useEffect(() => {
        if (expanded) {
            menuItemListRef.current[focused]?.focus();
        }
    }, [menuItemListRef, expanded, focused]);
};

export const useMenuItemListRef = <T>(
    list: T[],
    expanded: boolean,
    focused: number
) => {
    const menuItemListRef = useRef<(HTMLLIElement | null)[]>([]);
    useEffect(() => {
        menuItemListRef.current = menuItemListRef.current.slice(0, list.length);
    }, [list]);
    useRowFocused(menuItemListRef, expanded, focused);
    return menuItemListRef;
};
