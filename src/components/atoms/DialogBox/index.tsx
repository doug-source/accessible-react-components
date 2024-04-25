import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './DialogBox.module.scss';

type DialogBoxProps = ComponentPropsWithoutRef<'div'> & {
    show?: boolean;
};

export const DialogBox = ({
    show = false,
    className,
    children,
    ...remain
}: DialogBoxProps) => {
    const classNameInner = show ? styles.show : styles.hide;
    return (
        <div
            {...remain}
            className={classNames(className, styles.dialogBox, classNameInner)}
        >
            {children}
        </div>
    );
};
