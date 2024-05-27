import { MutableRefObject, useEffect, useState } from 'react';

export const useActiveDescendant = (
    focused: number,
    cellBoolean: boolean,
    cellListRef: MutableRefObject<(HTMLDivElement | null)[]>
) => {
    const [activeDescendant, setActiveDescendant] = useState('');
    useEffect(() => {
        if (focused === -1) {
            setActiveDescendant('');
        }
        const { current: list } = cellListRef;
        const cellSelected = focused * 2 + Number(cellBoolean);
        const id = list[cellSelected]?.id ?? '';
        setActiveDescendant(id);
    }, [cellBoolean, cellListRef, focused]);
    return [activeDescendant] as const;
};
