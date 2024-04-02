import { RefObject, useCallback, useEffect } from 'react';
import { actArrow, pickEndId, pickHomeId, pickNextId, pickPreviousId } from '.';

export type KeydownHandler = Parameters<
    typeof document.addEventListener<'keydown'>
>[1];

export const useKeydown = (ref: RefObject<HTMLDivElement>, manual: boolean) => {
    const keydownHandler: KeydownHandler = useCallback(
        (evt) => {
            const { current: $tablist } = ref;
            if ($tablist === null) {
                return;
            }
            const { activeElement } = document;
            const parentElement = activeElement?.parentElement;
            if (parentElement !== $tablist) {
                return;
            }
            let flag = false;
            switch (evt.key) {
                case 'ArrowLeft': {
                    flag = true;
                    actArrow(
                        manual,
                        pickPreviousId,
                        parentElement,
                        activeElement
                    );
                    break;
                }
                case 'ArrowRight': {
                    flag = true;
                    actArrow(manual, pickNextId, parentElement, activeElement);
                    break;
                }
                case 'Home': {
                    flag = true;
                    actArrow(manual, pickHomeId, parentElement);
                    break;
                }
                case 'End': {
                    flag = true;
                    actArrow(manual, pickEndId, parentElement);
                    break;
                }
            }
            if (flag) {
                evt.preventDefault();
            }
        },
        [ref, manual]
    );

    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        };
    }, [keydownHandler]);
};
