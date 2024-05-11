import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ActMenuBox.module.scss';

type ActMenuBoxProps = ComponentPropsWithoutRef<'ul'> & {
    expanded: boolean;
};

export const ActMenuBox = ({
    className,
    expanded,
    children,
    ...remain
}: ActMenuBoxProps) => (
    <ul
        {...remain}
        role="menu"
        className={classNames(
            className,
            styles.actMenuBox,
            expanded ? styles.show : styles.hide
        )}
    >
        {children}
    </ul>
);
