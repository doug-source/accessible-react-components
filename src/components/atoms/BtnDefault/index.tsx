import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './BtnDefault.module.scss';

type BtnDefaultProps = ComponentPropsWithoutRef<'button'>;

export const BtnDefault = forwardRef<HTMLButtonElement, BtnDefaultProps>(
    function BtnDefaultInner({ className, children, ...remain }, ref) {
        return (
            <button
                {...remain}
                ref={ref}
                className={classNames(className, styles.btnDefault)}
            >
                {children}
            </button>
        );
    }
);
