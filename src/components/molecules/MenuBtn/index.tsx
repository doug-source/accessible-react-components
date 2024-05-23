import { ComponentPropsWithoutRef, MutableRefObject } from 'react';
import { MenuArrowBtn } from '../../atoms/MenuArrowBtn';
import { makeMenuBtnKeydownHandler } from './lib/handlers/makeMenuBtnKeydownHandler';

type MenuArrowBtnProps = ComponentPropsWithoutRef<typeof MenuArrowBtn>;

type MenuBtnProps = Omit<
    MenuArrowBtnProps,
    'aria-expanded' | 'aria-controls' | 'children'
> & {
    'aria-controls': NonNullable<MenuArrowBtnProps['aria-controls']>;
    children: NonNullable<MenuArrowBtnProps['children']>;
    menuBtnRef: MutableRefObject<HTMLButtonElement | null>;
    menuItemListRef: MutableRefObject<(unknown | null)[]>;
    expanded: boolean;
    setExpanded: (value: boolean) => void;
    setFocused: (value: number) => void;
};

export const MenuBtn = ({
    className,
    'aria-controls': ariaControls,
    children,
    menuBtnRef,
    menuItemListRef,
    expanded,
    setExpanded,
    setFocused,
    ...remain
}: MenuBtnProps) => (
    <MenuArrowBtn
        {...remain}
        className={className}
        aria-expanded={expanded}
        ref={menuBtnRef}
        aria-controls={ariaControls}
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
        {children}
    </MenuArrowBtn>
);
