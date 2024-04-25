import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './CalendarFooterMsg.module.scss';

type CalendarFooterProps = ComponentPropsWithoutRef<'span'>;

export const CalendarFooterMsg = ({
    className,
    children,
    ...remain
}: CalendarFooterProps) => (
    <span
        {...remain}
        className={classNames(className, styles.calendarFooterMsg)}
    >
        {children}
    </span>
);
