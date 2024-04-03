import { RefObject, useCallback, useEffect } from 'react';
import { actArrow, pickEndId, pickHomeId, pickNextId, pickPreviousId } from '.';
import { orientationAxis } from '../../../../types/css-props';

export type KeydownHandler = Parameters<
    typeof document.addEventListener<'keydown'>
>[1];

export const useKeydown = (
    ref: RefObject<HTMLDivElement>,
    orientation: orientationAxis,
    manual: boolean
) => {
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
                case 'ArrowUp': {
                    if (orientation === 'vertical') {
                        flag = true;
                        actArrow(
                            manual,
                            pickPreviousId,
                            parentElement,
                            activeElement
                        );
                    }
                    break;
                }
                case 'ArrowLeft': {
                    if (orientation === 'horizontal') {
                        flag = true;
                        actArrow(
                            manual,
                            pickPreviousId,
                            parentElement,
                            activeElement
                        );
                    }
                    break;
                }
                case 'ArrowRight': {
                    if (orientation === 'horizontal') {
                        flag = true;
                        actArrow(
                            manual,
                            pickNextId,
                            parentElement,
                            activeElement
                        );
                    }
                    break;
                }
                case 'ArrowDown': {
                    if (orientation === 'vertical') {
                        flag = true;
                        actArrow(
                            manual,
                            pickNextId,
                            parentElement,
                            activeElement
                        );
                    }
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
        [ref, orientation, manual]
    );

    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        };
    }, [keydownHandler]);
};
