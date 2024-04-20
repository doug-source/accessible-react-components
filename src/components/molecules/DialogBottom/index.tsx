import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './DialogBottom.module.scss';

type DialogBottomProps = ComponentPropsWithoutRef<'div'>;

/**
 * Used as Dialog's children
 *
 * @param children The wrapper usually used to wrap dialog's buttons
 * @returns The HTMLDivElement wrapper
 */
export const DialogBottom = ({
    className,
    children,
    ...remain
}: DialogBottomProps) => (
    <div {...remain} className={classNames(className, styles.dialogBottom)}>
        {children}
    </div>
);
