import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId, useRef, useState } from 'react';
import { ActMenuComposite } from '../../molecules/ActMenuComposite';
import { ActMenuDefault } from '../../molecules/ActMenuDefault';
import { MenuBtn } from '../../molecules/MenuBtn';
import styles from './ActionMenuBtn.module.scss';
import { useMenuItemListRef } from './lib/hooks/useMenuItemListRef';

type MenuProps = ComponentPropsWithoutRef<typeof ActMenuDefault>;

type MenuBtnProps = ComponentPropsWithoutRef<'div'> & {
    btnLabel: string;
    items: MenuProps['items'];
    composite?: boolean;
};

export const ActionMenuBtn = ({
    className,
    btnLabel,
    items,
    composite = false,
    ...remain
}: MenuBtnProps) => {
    const menuBtnId = useId();
    const menuId = useId();
    const [expanded, setExpanded] = useState(false);
    const [focused, setFocused] = useState(-1);
    const menuItemListRef = useMenuItemListRef(items);
    const menuBtnRef = useRef<HTMLButtonElement | null>(null);
    const ulRef = useRef<HTMLUListElement | null>(null);

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

            <ActMenuDefault
                show={!composite}
                id={menuId}
                aria-labelledby={menuBtnId}
                items={items}
                listRef={menuItemListRef}
                expanded={expanded}
                setExpanded={setExpanded}
                focused={focused}
                setFocused={setFocused}
                menuBtnRef={menuBtnRef}
            />
            <ActMenuComposite
                show={composite}
                tabIndex={-1}
                id={menuId}
                aria-labelledby={menuBtnId}
                items={items}
                listRef={menuItemListRef}
                expanded={expanded}
                setExpanded={setExpanded}
                focused={focused}
                setFocused={setFocused}
                menuBtnRef={menuBtnRef}
                menuBoxRef={ulRef}
            />
        </div>
    );
};
