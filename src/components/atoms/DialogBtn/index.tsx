import classNames from 'classnames';
import { ComponentPropsWithoutRef, forwardRef } from 'react';
import styles from './AlertDialogBtn.module.scss';

type AlertDialogBtnProps = ComponentPropsWithoutRef<'button'>;

/**
 * The HtmlButtonElement usually used into AlertDialog
 *
 * @param props The button component's properties
 * @param ref The component's reference
 * @returns The react component
 */
export const AlertDialogBtn = forwardRef<
    HTMLButtonElement,
    AlertDialogBtnProps
>(function AlertDialogBtnInner(
    { children, className, ...remain }: AlertDialogBtnProps,
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
});
