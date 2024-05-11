import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './MenuItem.module.scss';

type MenuItemProps = ComponentPropsWithoutRef<'li'> & {
    listRefFn: (el: HTMLLIElement | null) => void;
};

export const MenuItem = ({
    className,
    children,
    listRefFn,
    ...remain
}: MenuItemProps) => (
    <li
        {...remain}
        ref={(el) => listRefFn(el)}
        role="menuitem"
        className={classNames(styles.menuItem, className)}
    >
        {children}
    </li>
);
