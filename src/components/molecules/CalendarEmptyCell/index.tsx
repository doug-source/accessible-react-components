import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { CalendarCell } from '../CalendarCell';
import styles from './CalendarEmptyCell.module.scss';

type CalendarEmptyCellProps = ComponentPropsWithoutRef<typeof CalendarCell>;

export const CalendarEmptyCell = ({
    type,
    className,
    children,
    ...remain
}: CalendarEmptyCellProps) => (
    <CalendarCell
        {...remain}
        type={type}
        className={classNames(className, styles.empty)}
        tabIndex={-1}
    >
        {children}
    </CalendarCell>
);
