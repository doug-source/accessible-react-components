import { useEffect, useRef } from 'react';

export const useBtnRefList = <T>(itemList: T[]) => {
    const listRef = useRef<Array<HTMLButtonElement | null>>([]);
    useEffect(() => {
        listRef.current = listRef.current.slice(0, itemList.length);
    }, [itemList]);
    return listRef;
};
