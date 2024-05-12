import { MutableRefObject, useEffect } from 'react';

export const useRowFocused = (
    menuItemListRef: MutableRefObject<(HTMLLIElement | null)[]>,
    setActiveOpt: (value: string | null) => void,
    expanded: boolean,
    focused: number,
    allow: boolean
) => {
    useEffect(() => {
        if (allow && expanded) {
            const id = menuItemListRef.current[focused]?.id ?? '';
            setActiveOpt(id);
        }
    }, [menuItemListRef, setActiveOpt, expanded, focused, allow]);
};
