import { ComponentPropsWithoutRef } from 'react';
import { Button_ } from './style';

type DialogBtnProps = ComponentPropsWithoutRef<'button'>;

/**
 * The HtmlButtonElement usually used into AlertDialog
 *
 * @param props The component's properties
 * @returns The react component
 */
export const DialogBtn = (props: DialogBtnProps) => (
    <Button_ {...props} type="button" />
);
