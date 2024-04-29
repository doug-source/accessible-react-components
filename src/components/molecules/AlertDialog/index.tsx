import { ReactNode, useId } from 'react';
import { Backdrop } from '../../atoms/Backdrop';
import { Heading } from '../../atoms/Heading';
import { TabIndexReset } from '../../atoms/TabIndexReset';
import styles from './AlertDialog.module.scss';
import { Box } from './components/Box';
import { Description } from './components/Description';
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
                <AlertDialog.Description
                    id={descriptionId}
                    className={styles.alertDialog}
                >
                    {description}
                </AlertDialog.Description>
                {children}
            </AlertDialog.Box>
            <TabIndexReset />
        </Backdrop>
    );
};

AlertDialog.Box = Box;
AlertDialog.Description = Description;

export { AlertDialog };
