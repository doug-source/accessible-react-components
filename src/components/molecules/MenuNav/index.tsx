import classNames from 'classnames';
import { ComponentPropsWithoutRef, MutableRefObject } from 'react';
import { useRowFocused } from '../../../lib/hooks/useRowFocused';
import { MenuBox } from '../../atoms/MenuBox';
import styles from './MenuNav.module.scss';
import { makeMenuItemKeydownHandler } from './lib/handlers/makeMenuItemKeydown';

type Item = {
    href: string;
    content: string;
};

type MenuNavProps = ComponentPropsWithoutRef<'ul'> & {
    items: Item[];
    expanded: boolean;
    setExpanded: (value: boolean) => void;
    focused: number;
    setFocused: (value: number) => void;
    menuBtnRef: MutableRefObject<HTMLButtonElement | null>;
    listRef: MutableRefObject<(HTMLAnchorElement | null)[]>;
    show: boolean;
};

export const MenuNav = ({
    className,
    items,
    expanded,
    setExpanded,
    focused,
    setFocused,
    menuBtnRef,
    listRef,
    show,
    ...remain
}: MenuNavProps) => {
    useRowFocused(listRef, expanded, focused, show);
    if (!show) {
        return null;
    }
    return (
        <MenuBox
            {...remain}
            className={classNames(className, styles.box)}
            expanded={expanded}
        >
            {items.map(({ href, content }, i) => (
                <li key={content} role="none">
                    <a
                        href={href}
                        role="menuitem"
                        tabIndex={focused === i ? 0 : -1}
                        ref={($link) => {
                            listRef.current[i] = $link;
                        }}
                        onMouseOver={(evt) => {
                            setFocused(i);
                            evt.stopPropagation();
                            evt.preventDefault();
                        }}
                        onKeyDown={makeMenuItemKeydownHandler(
                            items,
                            i,
                            setFocused,
                            setExpanded,
                            menuBtnRef,
                            listRef
                        )}
                    >
                        {content}
                    </a>
                </li>
            ))}
        </MenuBox>
    );
};
