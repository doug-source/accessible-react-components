import { MutableRefObject } from 'react';
import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';

export const makeMenuBtnKeydownHandler = <T>(
    expanded: boolean,
    setExpanded: (value: boolean) => void,
    setFocused: (value: number) => void,
    menuItemListRef: MutableRefObject<(T | null)[]>
) => {
    return makeKeydownHandler([
        [
            /ArrowDown|Down/,
            () => {
                const newExpanded = !expanded;
                setExpanded(newExpanded);
                newExpanded && setFocused(0);
                return true;
            },
        ],
        [
            /ArrowUp|Up/,
            () => {
                const newExpanded = !expanded;
                setExpanded(newExpanded);
                if (newExpanded) {
                    setFocused(menuItemListRef.current.length - 1);
                }
                return true;
            },
        ],
        [
            /Escape|Esc/,
            () => {
                setExpanded(false);
                return true;
            },
        ],
    ]);
};
