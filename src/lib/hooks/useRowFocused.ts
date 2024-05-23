import { MutableRefObject, useEffect } from 'react';

export const useRowFocused = <T extends HTMLElement>(
    itemListRef: MutableRefObject<(T | null)[]>,
    expanded: boolean,
    focused: number,
    allow: boolean
) => {
    useEffect(() => {
        if (allow && expanded) {
            itemListRef.current[focused]?.focus();
        }
    }, [itemListRef, expanded, focused, allow]);
};
