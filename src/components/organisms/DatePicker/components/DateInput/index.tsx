import classNames from 'classnames';
import { ComponentPropsWithoutRef, useId } from 'react';
import styles from './DateInput.module.scss';

type DateInputProps = ComponentPropsWithoutRef<'input'> & {
    format: string;
};

export const DateInput = ({ className, format, ...remain }: DateInputProps) => {
    const dateId = useId();
    return (
        <label
            htmlFor={dateId}
            className={classNames(className, styles.dateLabel)}
        >
            <input
                {...remain}
                id={dateId}
                className={styles.inputField}
                type="text"
                readOnly
            />
            <span
                id={dateId}
                className={classNames(
                    styles.description,
                    String(remain.value).trim().length > 0 && styles.topRight
                )}
            >
                (<span className={styles.screenReaderOnly}>date format:</span>
                {format})
            </span>
        </label>
    );
};
