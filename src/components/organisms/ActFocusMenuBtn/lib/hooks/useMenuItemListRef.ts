import { useEffect, useRef } from 'react';

export const useMenuItemListRef = <T>(
    list: T[],
) => {
    const menuItemListRef = useRef<(HTMLLIElement | null)[]>([]);
    useEffect(() => {
        menuItemListRef.current = menuItemListRef.current.slice(0, list.length);
    }, [list]);
    return menuItemListRef;
};
