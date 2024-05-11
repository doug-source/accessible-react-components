import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId } from 'react';
import styles from './ActMenuItem.module.scss';

type ActMenuItemProps = ComponentPropsWithoutRef<'li'> & {
    listRefFn: (el: HTMLLIElement | null) => void;
    identified?: boolean;
};

const ActMenuItem = ({
    className,
    children,
    listRefFn,
    identified = false,
    ...remain
}: ActMenuItemProps) => {
    const id = useId();
    return (
        <li
            {...remain}
            id={identified ? id : undefined}
            ref={(el) => listRefFn(el)}
            role="menuitem"
            className={classNames(ActMenuItem.styles.menuItem, className)}
        >
            {children}
        </li>
    );
};

ActMenuItem.styles = styles;

export { ActMenuItem };
