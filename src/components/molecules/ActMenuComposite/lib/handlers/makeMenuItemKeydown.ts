import {
    EventHandler,
    KeyboardEvent,
    MouseEvent,
    MutableRefObject,
} from 'react';
import { swapIndex } from '../../../../../lib';
import { makeKeydownHandler } from '../../../../../lib/handlers/keyDown';
import runtimeSearch from '../../../../../utils/RuntimeSearch';

type MenuItemList = Array<
    [
        key: string,
        option: string,
        callback: EventHandler<
            MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
        >
    ]
>;

export const makeMenuKeydownHandler = (
    items: MenuItemList,
    i: number,
    listRef: MutableRefObject<(HTMLLIElement | null)[]>,
    setFocused: (val: number) => void,
    setExpanded: (val: boolean) => void,
    setActiveOpt: (value: string | null) => void,
    menuBtnRef: MutableRefObject<HTMLButtonElement | null>
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
                const id = listRef.current[newFocused]?.id ?? '';
                setActiveOpt(id);
                return true;
            },
        ],
        [
            /^Enter|\s$/,
            (evt) => {
                const [, , callback] = items[i];
                callback(evt);
                setExpanded(false);
                setActiveOpt(null);
                menuBtnRef.current?.focus();
                return true;
            },
        ],
        [
            /Escape|Tab/,
            (evt) => {
                if (evt.key === 'Tab' && !evt.shiftKey) {
                    return false;
                }
                setExpanded(false);
                setActiveOpt(null);
                menuBtnRef.current?.focus();
                return true;
            },
        ],
        [
            /Home|PageUp/,
            () => {
                const newFocused = 0;
                setFocused(newFocused);
                const id = listRef.current[newFocused]?.id ?? '';
                setActiveOpt(id);
                return true;
            },
        ],
        [
            /End|PageDown/,
            () => {
                const newFocused = items.length - 1;
                setFocused(newFocused);
                const id = listRef.current[newFocused]?.id ?? '';
                setActiveOpt(id);
                return true;
            },
        ],
        [
            '{typing}',
            (evt) => {
                const searchIndex = runtimeSearch.searchIndex(
                    items.map(([, label]) => label),
                    evt.key,
                    i + 1 === items.length ? 0 : i + 1
                );
                if (searchIndex > -1) {
                    const id = listRef.current[searchIndex]?.id ?? '';
                    setActiveOpt(id);
                    setFocused(searchIndex);
                }
                return true;
            },
        ],
    ]);
};
