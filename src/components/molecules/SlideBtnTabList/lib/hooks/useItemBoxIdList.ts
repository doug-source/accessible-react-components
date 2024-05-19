import { MutableRefObject, useEffect, useState } from 'react';

export const useItemBoxIdList = (
    itemBoxListRef: MutableRefObject<(HTMLDivElement | null)[]>
) => {
    const [idList, setIdList] = useState<Array<string | undefined>>([]);
    useEffect(() => {
        if (itemBoxListRef.current.length) {
            setIdList(itemBoxListRef.current.map((item) => item?.id));
        }
    }, [itemBoxListRef, setIdList]);
    return [idList] as const;
};
