import { ComponentPropsWithoutRef } from 'react';
import { AlertDialogActions_ } from './style';

type AlertDialogActionsProps = ComponentPropsWithoutRef<
    typeof AlertDialogActions_
>;

/**
 * Used as AlertDialog's children
 *
 * @param children The wrapper usually used to wrap dialog's buttons
 * @returns The HTMLDivElement wrapper
 */
export const AlertDialogActions = ({
    children,
    ...remain
}: AlertDialogActionsProps) => (
    <AlertDialogActions_ {...remain}>{children}</AlertDialogActions_>
);
