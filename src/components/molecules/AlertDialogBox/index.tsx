import { ComponentPropsWithoutRef } from 'react';
import { AlertDialogBox_ } from './style';

type AlertDialogBoxProps = ComponentPropsWithoutRef<typeof AlertDialogBox_> & {
    headingId: string;
    descriptionId: string;
    show?: boolean;
};

export const AlertDialogBox = ({
    headingId,
    descriptionId,
    show,
    children,
    ...remain
}: AlertDialogBoxProps) => (
    <AlertDialogBox_
        id="alertdialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        $show={show}
        {...remain}
    >
        {children}
    </AlertDialogBox_>
);
