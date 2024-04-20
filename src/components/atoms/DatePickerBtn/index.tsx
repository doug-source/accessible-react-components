import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { BtnDefault } from '../BtnDefault';
import styles from './DatePickerBtn.module.scss';

type DatePickerBtnProps = ComponentPropsWithoutRef<'button'>;

export const DatePickerBtn = ({
    className,
    children,
    ...remain
}: DatePickerBtnProps) => {
    return (
        <BtnDefault
            {...remain}
            className={classNames(className, styles.datePickerBtn)}
        >
            {children}
        </BtnDefault>
    );
};
