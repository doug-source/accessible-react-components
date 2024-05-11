import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './ActMenuBox.module.scss';

type ActMenuBoxProps = ComponentPropsWithoutRef<'ul'> & {
    expanded: boolean;
};

export const ActMenuBox = forwardRef<HTMLUListElement, ActMenuBoxProps>(
    function ActMenuBoxInner(
        { className, expanded, children, ...remain }: ActMenuBoxProps,
        ref
    ) {
        return (
            <ul
                {...remain}
                ref={ref}
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
    }
);
