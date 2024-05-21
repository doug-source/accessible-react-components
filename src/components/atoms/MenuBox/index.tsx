import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './ActMenuBox.module.scss';

type MenuBoxProps = ComponentPropsWithoutRef<'ul'> & {
    expanded: boolean;
};

export const MenuBox = forwardRef<HTMLUListElement, MenuBoxProps>(
    function MenuBoxInner(
        { className, expanded, children, ...remain }: MenuBoxProps,
        ref
    ) {
        return (
            <ul
                {...remain}
                ref={ref}
                role="menu"
                className={classNames(
                    className,
                    styles.menuBox,
                    expanded ? styles.show : styles.hide
                )}
            >
                {children}
            </ul>
        );
    }
);
