import classNames from 'classnames';
import React, { ComponentPropsWithoutRef } from 'react';
import styles from './CalendarCell.module.scss';

type CalendarCellProps<T extends 'th' | 'td'> = ComponentPropsWithoutRef<T> & {
    type: T;
};

export const CalendarCell = <T extends 'th' | 'td'>({
    type,
    className,
    children,
    ...remain
}: CalendarCellProps<T>) => {
    return React.createElement(
        type,
        {
            ...remain,
            className: classNames(className, styles.calendarCell),
        },
        children
    );
};
