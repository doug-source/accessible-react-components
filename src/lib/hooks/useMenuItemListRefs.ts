import { useEffect, useRef } from 'react';

/**
 * Build the refs to wrapper and HTMLElements list items
 * Used usually with HTMLUListElement e HTMLLIElement types
 *
 * @param list
 * @returns
 */
export const useMenuItemListRefs = <T, W>(list: unknown[]) => {
    const menuListWrapperRef = useRef<T | null>(null);
    const menuItemListRef = useRef<(W | null)[]>([]);
    useEffect(() => {
        menuItemListRef.current = menuItemListRef.current.slice(0, list.length);
    }, [list]);
    return [menuListWrapperRef, menuItemListRef] as const;
};
