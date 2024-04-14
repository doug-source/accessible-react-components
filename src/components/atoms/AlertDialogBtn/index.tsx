import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Button_ } from './style';

type AlertDialogBtnProps = ComponentPropsWithoutRef<'button'>;

/**
 * The HtmlButtonElement usually used into AlertDialog
 *
 * @param props The component's properties
 * @param ref The component's reference
 * @returns The react component
 */
export const AlertDialogBtn = forwardRef<
    HTMLButtonElement,
    AlertDialogBtnProps
>(function AlertDialogBtnInner(props: AlertDialogBtnProps, ref) {
    return <Button_ {...props} ref={ref} type="button" />;
});
