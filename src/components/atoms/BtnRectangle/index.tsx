import classNames from 'classnames';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';
import styles from './BtnRectangle.module.scss';

type BtnProps = ComponentPropsWithoutRef<'button'>;

const BtnRectangleInner = (
    { className, children, ...remain }: BtnProps,
    ref: ForwardedRef<HTMLButtonElement>
) => (
    <button
        {...remain}
        ref={ref}
        type="button"
        className={classNames(styles.btnRectangle, className)}
    >
        <div className={styles.rectBack}></div>
        {children}
    </button>
);

export const BtnRectangle = Object.assign(
    forwardRef<HTMLButtonElement, BtnProps>(BtnRectangleInner),
    { styles }
);
