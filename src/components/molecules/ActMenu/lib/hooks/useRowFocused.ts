import { MutableRefObject, useEffect } from 'react';

export const useRowFocused = (
    menuItemListRef: MutableRefObject<(HTMLLIElement | null)[]>,
    expanded: boolean,
    focused: number,
    allow: boolean
) => {
    useEffect(() => {
        if (allow && expanded) {
            menuItemListRef.current[focused]?.focus();
        }
    }, [menuItemListRef, expanded, focused, allow]);
};
