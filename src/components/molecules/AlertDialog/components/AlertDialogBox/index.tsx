import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './AlertDialogBox.module.scss';

type AlertDialogBoxProps = ComponentPropsWithoutRef<'div'> & {
    headingId: string;
    descriptionId: string;
    show?: boolean;
};

export const AlertDialogBox = ({
    headingId,
    descriptionId,
    show,
    children,
    className,
    ...remain
}: AlertDialogBoxProps) => {
    const classNameInner = show ? styles.show : styles.hide;
    return (
        <div
            {...remain}
            className={classNames(
                className,
                styles.alertDialogBox,
                classNameInner
            )}
            id="alertdialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={headingId}
            aria-describedby={descriptionId}
        >
            {children}
        </div>
    );
};
