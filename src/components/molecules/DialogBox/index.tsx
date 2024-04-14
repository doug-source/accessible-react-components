import { ComponentPropsWithoutRef } from 'react';
import { DialogBox_ } from './style';

type StyleProps = ComponentPropsWithoutRef<typeof DialogBox_>;

type DialogBoxProps = Omit<StyleProps, '$show'> & {
    show?: StyleProps['$show'];
};

export const DialogBox = ({
    show = false,
    children,
    ...remain
}: DialogBoxProps) => (
    <DialogBox_ $show={show} {...remain}>
        {children}
    </DialogBox_>
);
