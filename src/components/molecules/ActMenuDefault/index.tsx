import {
    ComponentPropsWithoutRef,
    EventHandler,
    KeyboardEvent,
    MouseEvent,
    MutableRefObject,
} from 'react';
import { MenuBox } from '../../atoms/MenuBox';
import { ActMenuItem } from '../../atoms/MenuItem';
import { makeMenuItemKeydownHandler } from './lib/handlers/makeMenuItemKeydown';
import { useRowFocused } from './lib/hooks/useRowFocused';

type ActMenuDefaultProps = ComponentPropsWithoutRef<'ul'> & {
    show: boolean;
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

export const ActMenuDefault = ({
    show,
    items,
    listRef,
    expanded,
    setExpanded,
    focused,
    setFocused,
    menuBtnRef,
    ...remain
}: ActMenuDefaultProps) => {
    useRowFocused(listRef, expanded, focused, show);
    if (!show) {
        return null;
    }
    return (
        <MenuBox {...remain} expanded={expanded}>
            {items.map(([key, option, callback], i) => (
                <ActMenuItem
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
                </ActMenuItem>
            ))}
        </MenuBox>
    );
};
