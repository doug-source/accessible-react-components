import { ComponentPropsWithoutRef, ReactNode, useId } from 'react';
import { Backdrop } from '../../atoms/Backdrop';
import { DialogBox } from '../../atoms/DialogBox';
import { Heading } from '../../atoms/Heading';
import { TabIndexReset } from '../../atoms/TabIndexReset';

type DialogBoxProps = ComponentPropsWithoutRef<typeof DialogBox>;

type DialogProps = {
    'aria-label': DialogBoxProps['aria-label'];
    heading: string;
    show?: boolean;
    children?: ReactNode;
};

export const Dialog = ({
    'aria-label': ariaLabel,
    heading,
    show,
    children,
}: DialogProps) => {
    const headingId = useId();
    return (
        <Backdrop show={show}>
            <TabIndexReset />
            <DialogBox
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                show={show}
                aria-labelledby={headingId}
            >
                <Heading id={headingId}>{heading}</Heading>
                {children}
            </DialogBox>
            <TabIndexReset />
        </Backdrop>
    );
};
