import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId } from 'react';
import styles from './MenuItem.module.scss';

type MenuItemProps = ComponentPropsWithoutRef<'li'> & {
    listRefFn: (el: HTMLLIElement | null) => void;
    identified?: boolean;
};

const MenuItem = ({
    className,
    children,
    listRefFn,
    identified = false,
    ...remain
}: MenuItemProps) => {
    const id = useId();
    return (
        <li
            {...remain}
            id={identified ? id : undefined}
            ref={(el) => listRefFn(el)}
            role="menuitem"
            className={classNames(MenuItem.styles.menuItem, className)}
        >
            {children}
        </li>
    );
};

MenuItem.styles = styles;

export { MenuItem };
