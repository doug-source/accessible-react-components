import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ComboMenu.module.scss';

type ComboMenuProps = ComponentPropsWithoutRef<'ul'> & {
    expanded: boolean;
};

const ComboMenu = ({
    className,
    expanded,
    children,
    ...remain
}: ComboMenuProps) => (
    <ul
        {...remain}
        className={classNames(
            className,
            styles.comboMenu,
            !expanded && 'hidden'
        )}
        role="listbox"
        aria-label="Previous Searches"
    >
        {children}
    </ul>
);

ComboMenu.styles = styles;

export { ComboMenu };
