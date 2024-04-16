import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './SwitchCursor.module.scss';

type SwitchCursorProps = {
    checked: boolean;
} & ComponentPropsWithoutRef<'div'>;

export const SwitchCursor = ({
    className,
    children,
    checked,
    ...remain
}: SwitchCursorProps) => {
    const classNameInner = checked ? styles.checked : null;
    return (
        <div
            className={classNames(
                className,
                styles.switchCursor,
                classNameInner
            )}
            {...remain}
        >
            {children}
        </div>
    );
};
