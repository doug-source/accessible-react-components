import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId, useRef, useState } from 'react';
import { useMenuItemListRefs } from '../../../lib/hooks/useMenuItemListRefs';
import { MenuBtn } from '../../molecules/MenuBtn';
import { MenuNav } from '../../molecules/MenuNav';
import styles from './NavMenuBtn.module.scss';

type NavMenuBtnProps = ComponentPropsWithoutRef<'div'> & {
    btnLabel: string;
    items: ComponentPropsWithoutRef<typeof MenuNav>['items'];
};

export const NavMenuBtn = ({
    className,
    btnLabel,
    items,
    ...remain
}: NavMenuBtnProps) => {
    const menuBtnId = useId();
    const menuId = useId();
    const [expanded, setExpanded] = useState(false);
    const [focused, setFocused] = useState(-1);
    const menuBtnRef = useRef<HTMLButtonElement | null>(null);
    const [, menuItemListRef] = useMenuItemListRefs<unknown, HTMLAnchorElement>(
        items
    );
    return (
        <div {...remain} className={classNames(className, styles.box)}>
            <MenuBtn
                id={menuBtnId}
                aria-controls={menuId}
                menuBtnRef={menuBtnRef}
                menuItemListRef={menuItemListRef}
                expanded={expanded}
                setExpanded={setExpanded}
                setFocused={setFocused}
            >
                {btnLabel}
            </MenuBtn>
            <MenuNav
                show
                id={menuId}
                aria-labelledby={menuBtnId}
                items={items}
                expanded={expanded}
                setExpanded={setExpanded}
                focused={focused}
                setFocused={setFocused}
                menuBtnRef={menuBtnRef}
                listRef={menuItemListRef}
            />
        </div>
    );
};
