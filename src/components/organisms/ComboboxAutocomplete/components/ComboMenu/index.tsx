import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ComboMenu.module.scss';

type ComboMenuProps = ComponentPropsWithoutRef<'ul'> & {
    expanded: boolean;
    show: boolean;
};

const ComboMenu = ({
    className,
    expanded,
    children,
    show,
    ...remain
}: ComboMenuProps) => {
    return (
        <ul
            {...remain}
            className={classNames(
                className,
                styles.comboMenu,
                (!expanded || !show) && 'hidden'
            )}
            role="listbox"
            aria-label="Previous Searches"
        >
            {children}
        </ul>
    );
};

ComboMenu.styles = styles;

export { ComboMenu };
