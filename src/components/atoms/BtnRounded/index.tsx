import classNames from 'classnames';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';
import styles from './BtnRounded.module.scss';

type BtnRoundedProps = ComponentPropsWithoutRef<'button'> & {
    parentFocused?: boolean;
};

const BtnRoundedInner = (
    { parentFocused, className, ...remain }: BtnRoundedProps,
    ref: ForwardedRef<HTMLButtonElement>
) => (
    <button
        {...remain}
        ref={ref}
        type="button"
        className={classNames(
            className,
            styles.btnRounded,
            parentFocused && styles.parentFocused
        )}
    >
        <span className={styles.back}></span>
        <span className={styles.markout}></span>
    </button>
);

export const BtnRounded = Object.assign(
    forwardRef<HTMLButtonElement, BtnRoundedProps>(BtnRoundedInner),
    { styles }
);
