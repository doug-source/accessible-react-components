import { ComponentPropsWithoutRef } from 'react';
import { DialogDesc_ } from './style';

type DialogDescProps = ComponentPropsWithoutRef<typeof DialogDesc_>;

export const DialogDesc = ({ children, ...remain }: DialogDescProps) => (
    <DialogDesc_ {...remain}>
        <p>{children}</p>
    </DialogDesc_>
);
