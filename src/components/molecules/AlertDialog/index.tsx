import { ReactNode, useId } from 'react';
import { AlertDialogDesc } from '../../atoms/AlertDialogDesc';
import { AlertDialogHeading } from '../../atoms/AlertDialogHeading';
import { CloseIcon } from '../../atoms/CloseIcon';
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
                <AlertDialogHeading id={headingId}>
                    {heading}
                </AlertDialogHeading>
                <AlertDialogDesc id={descriptionId}>
                    {description}
                </AlertDialogDesc>
                {children}
            </AlertDialogBox>
            <TabIndexReset />
        </Backdrop_>
    );
};
