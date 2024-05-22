import {
    ComponentPropsWithRef,
    EventHandler,
    KeyboardEvent,
    MouseEvent,
    MutableRefObject,
    useState,
} from 'react';
import { MenuBox } from '../../atoms/MenuBox';
import { MenuItem } from '../../atoms/MenuItem';
import { makeMenuKeydownHandler } from './lib/handlers/makeMenuItemKeydown';
import { useBoxFocused } from './lib/hooks/useBoxFocused';
import { useRowFocused } from './lib/hooks/useRowFocused';

type ActMenuCompositeProps = ComponentPropsWithRef<'ul'> & {
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
    menuBoxRef: MutableRefObject<HTMLUListElement | null>;
    menuBtnRef: MutableRefObject<HTMLButtonElement | null>;
};

export const ActMenuComposite = ({
    show,
    items,
    listRef,
    expanded,
    setExpanded,
    focused,
    setFocused,
    menuBoxRef,
    menuBtnRef,
    ...remain
}: ActMenuCompositeProps) => {
    const [activeOpt, setActiveOpt] = useState<string | null>(null);
    useRowFocused(listRef, setActiveOpt, expanded, focused, show);
    useBoxFocused(menuBoxRef, expanded, show);
    if (!show) {
        return null;
    }
    return (
        <MenuBox
            {...remain}
            ref={menuBoxRef}
            expanded={expanded}
            aria-activedescendant={activeOpt ?? ''}
            onKeyDown={makeMenuKeydownHandler(
                items,
                focused,
                listRef,
                setFocused,
                setExpanded,
                setActiveOpt,
                menuBtnRef
            )}
        >
            {items.map(([key, option, callback], i) => (
                <MenuItem
                    key={key}
                    identified
                    tabIndex={-1}
                    className={
                        focused === i ? MenuItem.styles.focused : undefined
                    }
                    listRefFn={(el) => {
                        listRef.current[i] = el;
                    }}
                    onClick={(evt) => {
                        callback(evt);
                        setActiveOpt(null);
                        setExpanded(false);
                    }}
                    onMouseOver={(evt) => {
                        const id = listRef.current[i]?.id ?? '';
                        setActiveOpt(id);
                        setFocused(i);
                        evt.stopPropagation();
                        evt.preventDefault();
                    }}
                >
                    {option}
                </MenuItem>
            ))}
        </MenuBox>
    );
};
