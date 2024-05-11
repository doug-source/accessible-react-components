import classNames from 'classnames';
import {
    ComponentPropsWithoutRef,
    EventHandler,
    KeyboardEvent,
    MouseEvent,
    MutableRefObject,
} from 'react';
import { MenuItem } from '../MenuItem';
import styles from './Menu.module.scss';
import { makeMenuItemKeydownHandler } from './lib/handlers/makeMenuItemKeydownHandler';
import { useRowFocused } from './lib/hooks/useRowFocused';

type MenuProps = ComponentPropsWithoutRef<'ul'> & {
    items: Array<
        [
            key: string,
            option: string,
            callback: EventHandler<
                MouseEvent<HTMLLIElement> | KeyboardEvent<HTMLLIElement>
            >
        ]
    >;
    listRef: MutableRefObject<(HTMLLIElement | null)[]>;
    expanded: boolean;
    setExpanded: (val: boolean) => void;
    focused: number;
    setFocused: (val: number) => void;
    menuBtnRef: MutableRefObject<HTMLButtonElement | null>;
};

export const Menu = ({
    className,
    items,
    listRef,
    expanded,
    setExpanded,
    focused,
    setFocused,
    menuBtnRef,
    ...remain
}: MenuProps) => {
    useRowFocused(listRef, expanded, focused);

    return (
        <ul
            {...remain}
            role="menu"
            className={classNames(
                className,
                styles.menu,
                expanded ? styles.show : styles.hide
            )}
        >
            {items.map(([key, option, callback], i) => (
                <MenuItem
                    key={key}
                    onClick={(evt) => {
                        callback(evt);
                        setExpanded(false);
                    }}
                    tabIndex={focused === i ? 0 : -1}
                    listRefFn={(el) => {
                        listRef.current[i] = el;
                    }}
                    onMouseOver={(evt) => {
                        listRef.current[i]?.focus();
                        evt.stopPropagation();
                        evt.preventDefault();
                    }}
                    onKeyDown={makeMenuItemKeydownHandler(
                        items,
                        i,
                        listRef,
                        setFocused,
                        callback,
                        setExpanded,
                        menuBtnRef
                    )}
                >
                    {option}
                </MenuItem>
            ))}
        </ul>
    );
};
