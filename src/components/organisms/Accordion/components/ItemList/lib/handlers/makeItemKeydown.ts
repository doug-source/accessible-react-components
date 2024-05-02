import { MutableRefObject } from 'react';
import { makeKeydownHandler } from '../../../../../../../lib/handlers/keyDown';

type Item = HTMLButtonElement | null;
type ListRef = MutableRefObject<Item[]>;
type Position = 'first' | 'last';

export const accessItem = (
    listRef: ListRef,
    position: Position
): Item | undefined => {
    if (position === 'first') {
        return listRef.current?.[0];
    }
    const lastIndex = listRef.current.length - 1;
    return listRef.current[lastIndex];
};

export const turnItemActive = (
    listRef: ListRef,
    position: Position
): boolean => {
    const element = accessItem(listRef, position);
    if (!element || element.getAttribute('aria-expanded') === 'true') {
        return true;
    }
    element.focus();
    element.click();
    return true;
};

export const makeItemKeyDown = (listRef: ListRef) => {
    return makeKeydownHandler([
        ['Home', () => turnItemActive(listRef, 'first')],
        ['End', () => turnItemActive(listRef, 'last')],
    ]);
};
