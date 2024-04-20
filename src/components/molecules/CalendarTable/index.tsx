import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './CalendarTable.module.scss';

type CalendarTableProps = ComponentPropsWithoutRef<'table'>;

export const CalendarTable = ({
    className,
    children,
    ...remain
}: CalendarTableProps) => (
    <table
        {...remain}
        className={classNames(className, styles.calendarTable)}
        role="grid"
    >
        {children}
    </table>
);
