import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './CalendarHeader.module.scss';

type CalendarHeaderProps = ComponentPropsWithoutRef<'div'>;

export const CalendarHeader = ({
    className,
    children,
    ...remain
}: CalendarHeaderProps) => (
    <div {...remain} className={classNames(className, styles.calendarHeader)}>
        {children}
    </div>
);
