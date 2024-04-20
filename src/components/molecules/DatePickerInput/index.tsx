import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId } from 'react';
import styles from './DatePickerInput.module.scss';

type DatePickerInputProps = ComponentPropsWithoutRef<'input'> & {
    format: string;
};

export const DatePickerInput = ({
    className,
    format,
    ...remain
}: DatePickerInputProps) => {
    const descriptionId = useId();
    return (
        <>
            <input
                {...remain}
                className={classNames(className, styles.inputField)}
                type="text"
                aria-describedby={descriptionId}
                placeholder={format}
                readOnly
            />
            <span id={descriptionId} className={styles.description}>
                (<span className={styles.screenReaderOnly}>date format:</span>
                {format})
            </span>
        </>
    );
};
