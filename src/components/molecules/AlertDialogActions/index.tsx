import { ComponentPropsWithoutRef } from 'react';
import { AlertDialogActions_ } from './style';

type AlertDialogActionsProps = ComponentPropsWithoutRef<
    typeof AlertDialogActions_
>;

export const AlertDialogActions = ({
    children,
    ...remain
}: AlertDialogActionsProps) => (
    <AlertDialogActions_ {...remain}>{children}</AlertDialogActions_>
);
