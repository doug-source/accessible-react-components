import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './AlertDialogActions.module.scss';

type AlertDialogActionsProps = ComponentPropsWithoutRef<'div'>;

/**
 * Used as AlertDialog's children
 *
 * @param children The wrapper usually used to wrap dialog's buttons
 * @returns The HTMLDivElement wrapper
 */
export const AlertDialogActions = ({
    className,
    children,
    ...remain
}: AlertDialogActionsProps) => (
    <div
        {...remain}
        className={classNames(className, styles.alertDialogActions)}
    >
        {children}
    </div>
);
