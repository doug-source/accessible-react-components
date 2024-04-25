import { useEffect, useRef } from 'react';

export const useTableRowRef = (list: Date[][]) => {
    const listRef = useRef<Array<HTMLTableCellElement | null>[]>([]);
    useEffect(() => {
        listRef.current = listRef.current.slice(0, list.length);
        for (let index = 0; index < list.length; index++) {
            const subList = listRef.current[index] ?? [];
            listRef.current[index] = subList.slice(0, list[index].length);
        }
    }, [list]);
    return listRef;
};
