import { ComponentPropsWithoutRef } from 'react';
import { AlertDialogDesc_ } from './style';

type AlertDialogDescProps = ComponentPropsWithoutRef<typeof AlertDialogDesc_>;

export const AlertDialogDesc = ({
    children,
    ...remain
}: AlertDialogDescProps) => (
    <AlertDialogDesc_ {...remain}>
        <p>{children}</p>
    </AlertDialogDesc_>
);
