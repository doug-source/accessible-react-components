import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId, useRef, useState } from 'react';
import { ActMenu as Menu } from '../../molecules/ActMenu';
import { ActMenuBtn } from '../../molecules/ActMenuBtn';
import styles from './MenuBtn.module.scss';
import { makeMenuBtnKeydownHandler } from './lib/handlers/makeMenuBtnKeydownHandler';
import { useMenuItemListRef } from './lib/hooks/useMenuItemListRef';

type MenuProps = ComponentPropsWithoutRef<typeof Menu>;

type MenuBtnProps = ComponentPropsWithoutRef<'div'> & {
    btnLabel: string;
    items: MenuProps['items'];
};

export const MenuBtn = ({
    className,
    btnLabel,
    items,
    ...remain
}: MenuBtnProps) => {
    const menuBtnId = useId();
    const menuId = useId();
    const [expanded, setExpanded] = useState(false);
    const [focused, setFocused] = useState(-1);
    const menuItemListRef = useMenuItemListRef(items);
    const menuBtnRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div {...remain} className={classNames(className, styles.box)}>
            <ActMenuBtn
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
            </ActMenuBtn>
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
