import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Alert.module.scss';

type AlertProps = ComponentPropsWithoutRef<'div'>;

export const Alert = ({ className, children, ...remain }: AlertProps) => (
    <div
        {...remain}
        role="alert"
        className={classNames(className, styles.alert)}
    >
        {children}
    </div>
);
