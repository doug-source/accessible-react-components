import { MutableRefObject, useEffect } from 'react';

export const useBoxFocused = (
    boxRef: MutableRefObject<HTMLUListElement | null>,
    expanded: boolean,
    allow: boolean
) => {
    useEffect(() => {
        if (!allow || !boxRef.current || !expanded) {
            return;
        }
        boxRef.current.focus();
    }, [boxRef, expanded, allow]);
};
