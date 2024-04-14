import { ReactNode, useId } from 'react';
import { AlertDialogDesc } from '../../atoms/AlertDialogDesc';
import { AlertDialogHeading } from '../../atoms/AlertDialogHeading';
import { AlertDialogBox } from '../AlertDialogBox';
import { TabIndexReset } from '../TabIndexReset';
import { useKeydownBinding } from './lib/hooks';
import { Backdrop_ } from './style';

type AlertDialogProps = {
    heading: string;
    description: string;
    show?: boolean;
    children?: ReactNode;
    onClose: () => void;
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
    useKeydownBinding(onClose);

    return (
        <Backdrop_ show={show}>
            <TabIndexReset />
            <AlertDialogBox
                headingId={headingId}
                descriptionId={descriptionId}
                show={show}
            >
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
