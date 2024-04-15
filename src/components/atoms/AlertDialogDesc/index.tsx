import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './AlertDialogDesc.module.scss';

type AlertDialogDescProps = ComponentPropsWithoutRef<'div'>;

export const AlertDialogDesc = ({
    children,
    className,
    ...remain
}: AlertDialogDescProps) => (
    <div {...remain} className={classNames(className, styles.alertDialogDesc)}>
        <p>{children}</p>
    </div>
);
