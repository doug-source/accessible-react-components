import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Box.module.scss';

type BoxProps = ComponentPropsWithoutRef<'div'> & {
    headingId: string;
    descriptionId: string;
    show?: boolean;
};

export const Box = ({
    headingId,
    descriptionId,
    show,
    children,
    className,
    ...remain
}: BoxProps) => {
    const classNameInner = show ? styles.show : styles.hide;
    return (
        <div
            {...remain}
            className={classNames(className, styles.box, classNameInner)}
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
