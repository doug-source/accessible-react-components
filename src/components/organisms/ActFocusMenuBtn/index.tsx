import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId, useRef, useState } from 'react';
import styles from './ActFocusMenuBtn.module.scss';
import { Menu } from './components/Menu';
import { MenuBtn } from './components/MenuBtn';
import { makeMenuBtnKeydownHandler } from './lib/handlers/makeMenuBtnKeydownHandler';
import { useMenuItemListRef } from './lib/hooks/useMenuItemListRef';

type MenuProps = ComponentPropsWithoutRef<typeof Menu>;

type ActFocusMenuBtnProps = ComponentPropsWithoutRef<'div'> & {
    btnLabel: string;
    items: MenuProps['items'];
};

export const ActFocusMenuBtn = ({
    className,
    btnLabel,
    items,
    ...remain
}: ActFocusMenuBtnProps) => {
    const menuBtnId = useId();
    const menuId = useId();
    const [expanded, setExpanded] = useState(false);
    const [focused, setFocused] = useState(-1);
    const menuItemListRef = useMenuItemListRef(items);
    const menuBtnRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div {...remain} className={classNames(className, styles.box)}>
            <MenuBtn
                id={menuBtnId}
                aria-expanded={expanded}
                ref={menuBtnRef}
                aria-controls={menuId}
                onClick={(evt) => {
                    const newExpanded = !expanded;
                    setExpanded(newExpanded);
                    newExpanded && setFocused(0);
                    evt.stopPropagation();
                    evt.preventDefault();
                }}
                onKeyDown={makeMenuBtnKeydownHandler(
                    expanded,
                    setExpanded,
                    setFocused,
                    menuItemListRef
                )}
            >
                {btnLabel}
            </MenuBtn>
            <Menu
                id={menuId}
                aria-labelledby={menuBtnId}
                items={items}
                listRef={menuItemListRef}
                setExpanded={setExpanded}
                expanded={expanded}
                focused={focused}
                setFocused={setFocused}
                menuBtnRef={menuBtnRef}
            />
        </div>
    );
};
