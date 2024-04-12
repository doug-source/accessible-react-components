import { ComponentPropsWithoutRef } from 'react';
import { DialogHeading_ } from './style';

type StyleProps = ComponentPropsWithoutRef<typeof DialogHeading_>;

type DialogHeadingProps = Omit<StyleProps, 'children'> & {
    children: string;
};

export const DialogHeading = ({ children, ...remain }: DialogHeadingProps) => (
    <DialogHeading_ {...remain}>{children}</DialogHeading_>
);
