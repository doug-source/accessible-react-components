import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ActMenuItem.module.scss';

type ActMenuItemProps = ComponentPropsWithoutRef<'li'> & {
    listRefFn: (el: HTMLLIElement | null) => void;
};

export const ActMenuItem = ({
    className,
    children,
    listRefFn,
    ...remain
}: ActMenuItemProps) => (
    <li
        {...remain}
        ref={(el) => listRefFn(el)}
        role="menuitem"
        className={classNames(styles.menuItem, className)}
    >
        {children}
    </li>
);
