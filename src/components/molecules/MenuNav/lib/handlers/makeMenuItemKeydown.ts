import { MutableRefObject } from 'react';
import { swapIndex } from '../../../../../lib';
import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';
import runtimeSearch from '../../../../../utils/RuntimeSearch';

type MenuItemList = Array<{ content: string; href: string }>;

export const makeMenuItemKeydownHandler = (
    items: MenuItemList,
    i: number,
    setFocused: (val: number) => void,
    setExpanded: (val: boolean) => void,
    menuBtnRef: MutableRefObject<HTMLButtonElement | null>,
    listRef: MutableRefObject<(HTMLAnchorElement | null)[]>
) => {
    return makeKeydownHandler([
        [
            /ArrowDown|ArrowUp/,
            (evt) => {
                const newFocused = swapIndex(
                    items,
                    evt.key === 'ArrowDown' ? i + 1 : i - 1
                );
                setFocused(newFocused);
                return true;
            },
        ],
        [
            ' ',
            () => {
                listRef.current[i]?.click();
                return true;
            },
        ],
        [
            'Escape',
            () => {
                setExpanded(false);
                menuBtnRef.current?.focus();
                return true;
            },
        ],
        [
            /Home|PageUp/,
            () => {
                const newFocused = 0;
                setFocused(newFocused);
                return true;
            },
        ],
        [
            /End|PageDown/,
            () => {
                const newFocused = items.length - 1;
                setFocused(newFocused);
                return true;
            },
        ],
        [
            '{typing}',
            (evt) => {
                const searchIndex = runtimeSearch.searchIndex(
                    items.map(({ content }) => content),
                    evt.key,
                    i + 1 === items.length ? 0 : i + 1
                );
                if (searchIndex > -1) {
                    setFocused(searchIndex);
                }
                return true;
            },
        ],
    ]);
};
