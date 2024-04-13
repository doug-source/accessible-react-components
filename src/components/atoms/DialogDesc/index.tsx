import { ComponentPropsWithoutRef } from 'react';
import { DialogDesc_ } from './style';

type DialogDescProps = ComponentPropsWithoutRef<typeof DialogDesc_> & {
    description: string;
};

export const DialogDesc = ({
    description,
    children,
    ...remain
}: DialogDescProps) => (
    <DialogDesc_ {...remain}>
        <p>{description}</p>
        {children}
    </DialogDesc_>
);
