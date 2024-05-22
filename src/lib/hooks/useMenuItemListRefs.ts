import { useEffect, useRef } from 'react';

export const useMenuItemListRefs = <T>(list: T[]) => {
    const menuListWrapperRef = useRef<HTMLUListElement | null>(null);
    const menuItemListRef = useRef<(HTMLLIElement | null)[]>([]);
    useEffect(() => {
        menuItemListRef.current = menuItemListRef.current.slice(0, list.length);
    }, [list]);
    return [menuListWrapperRef, menuItemListRef] as const;
};
