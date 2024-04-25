import classNames from 'classnames';
import { ComponentPropsWithoutRef, createElement, forwardRef } from 'react';
import styles from './CalendarCell.module.scss';

type CalendarCellProps = ComponentPropsWithoutRef<'th' | 'td'> & {
    type: 'th' | 'td';
};

export const CalendarCell = forwardRef<HTMLTableCellElement, CalendarCellProps>(
    function CalendarCellInner(
        { type, className, children, ...remain }: CalendarCellProps,
        ref
    ) {
        return createElement(
            type,
            {
                ...remain,
                className: classNames(className, styles.calendarCell),
                ref,
            },
            children
        );
    }
);
