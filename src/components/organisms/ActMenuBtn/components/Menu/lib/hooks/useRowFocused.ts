import { MutableRefObject, useEffect } from 'react';

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
