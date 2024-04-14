import { ComponentPropsWithoutRef } from 'react';
import { AlertDialogHeading_ } from './style';

type StyleProps = ComponentPropsWithoutRef<typeof AlertDialogHeading_>;

type AlertDialogHeadingProps = Omit<StyleProps, 'children'> & {
    children: string;
};

export const AlertDialogHeading = ({
    children,
    ...remain
}: AlertDialogHeadingProps) => (
    <AlertDialogHeading_ {...remain}>{children}</AlertDialogHeading_>
);
