import { ReactNode, useId } from 'react';
import { CloseIcon } from '../../atoms/CloseIcon';
import { DialogDesc } from '../../atoms/DialogDesc';
import { DialogHeading } from '../../atoms/DialogHeading';
import { AlertDialogBox } from '../AlertDialogBox';
import { TabIndexReset } from '../TabIndexReset';
import { Backdrop_ } from './style';

type AlertDialogProps = {
    heading: string;
    description: string;
    show?: boolean;
    children?: ReactNode;
    onClose?: () => void;
};

export const AlertDialog = ({
    show,
    heading,
    description,
    children,
    onClose,
}: AlertDialogProps) => {
    const headingId = useId();
    const descriptionId = useId();
    return (
        <Backdrop_ show={show}>
            <TabIndexReset />
            <AlertDialogBox
                headingId={headingId}
                descriptionId={descriptionId}
                show={show}
            >
                <CloseIcon onClick={() => onClose && onClose()} />
                <DialogHeading id={headingId}>{heading}</DialogHeading>
                <DialogDesc id={descriptionId}>{description}</DialogDesc>
                {children}
            </AlertDialogBox>
            <TabIndexReset />
        </Backdrop_>
    );
};
