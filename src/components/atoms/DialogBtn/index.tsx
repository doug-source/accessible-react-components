import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './DialogBtn.module.scss';

type DialogBtnProps = ComponentPropsWithoutRef<'button'>;

/**
 * The HtmlButtonElement usually used into Dialog
 *
 * @param props The button component's properties
 * @param ref The component's reference
 * @returns The react component
 */
export const DialogBtn = forwardRef<HTMLButtonElement, DialogBtnProps>(
    function DialogBtnInner(
        { children, className, ...remain }: DialogBtnProps,
        ref
    ) {
        return (
            <button
                {...remain}
                ref={ref}
                type="button"
                className={classNames(className, styles.button)}
            >
                {children}
            </button>
        );
    }
);
