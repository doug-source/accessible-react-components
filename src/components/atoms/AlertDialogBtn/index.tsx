import { ComponentPropsWithoutRef } from 'react';
import { Button_ } from './style';

type AlertDialogBtnProps = ComponentPropsWithoutRef<'button'>;

/**
 * The HtmlButtonElement usually used into AlertDialog
 *
 * @param props The component's properties
 * @returns The react component
 */
export const AlertDialogBtn = (props: AlertDialogBtnProps) => (
    <Button_ {...props} type="button" />
);
