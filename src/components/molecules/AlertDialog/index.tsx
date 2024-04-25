import { ReactNode, useId } from 'react';
import { AlertDialogDesc } from '../../atoms/AlertDialogDesc';
import { Heading } from '../../atoms/Heading';
import { Backdrop } from '../Backdrop';
import { TabIndexReset } from '../TabIndexReset';
import styles from './AlertDialog.module.scss';
import { Box } from './components/Box';
import { useKeydownBinding } from './lib/hooks';

type AlertDialogProps = {
    heading: string;
    description: string;
    show?: boolean;
    children?: ReactNode;
    onClose: () => void;
};

const AlertDialog = ({
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
        <Backdrop show={show}>
            <TabIndexReset />
            <AlertDialog.Box
                headingId={headingId}
                descriptionId={descriptionId}
                show={show}
                className={styles.alertDialoBox}
            >
                <Heading id={headingId} className={styles.heading}>
                    {heading}
                </Heading>
                <AlertDialogDesc
                    id={descriptionId}
                    className={styles.alertDialog}
                >
                    {description}
                </AlertDialogDesc>
                {children}
            </AlertDialog.Box>
            <TabIndexReset />
        </Backdrop>
    );
};

AlertDialog.Box = Box;

export { AlertDialog };
