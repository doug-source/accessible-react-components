import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './CalendarHeading.module.scss';

type CalendarHeadingProps = ComponentPropsWithoutRef<'h2'>;

export const CalendarHeading = ({
    className,
    children,
    ...remain
}: CalendarHeadingProps) => (
    <h2 {...remain} className={classNames(className, styles.calendarHeading)}>
        {children}
    </h2>
);
