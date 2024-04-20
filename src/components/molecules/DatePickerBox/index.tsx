import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './DatePickerBox.module.scss';

type DatePickerBoxProps = ComponentPropsWithoutRef<'div'>;

export const DatePickerBox = ({
    className,
    children,
    ...remain
}: DatePickerBoxProps) => (
    <div {...remain} className={classNames(className, styles.datePickerBox)}>
        {children}
    </div>
);
