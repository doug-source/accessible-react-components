import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './BtnDefault.module.scss';

type BtnDefaultProps = ComponentPropsWithoutRef<'button'>;

export const BtnDefault = ({
    className,
    children,
    ...remain
}: BtnDefaultProps) => {
    return (
        <button
            {...remain}
            className={classNames(className, styles.btnDefault)}
        >
            {children}
        </button>
    );
};
