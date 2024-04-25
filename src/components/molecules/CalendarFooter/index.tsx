import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './CalendarFooter.module.scss';

type CalendarFooterProps = ComponentPropsWithoutRef<'div'>;

export const CalendarFooter = ({
    className,
    children,
    ...remain
}: CalendarFooterProps) => (
    <div {...remain} className={classNames(className, styles.calendarFooter)}>
        {children}
    </div>
);
