import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './CalendarTableBox.module.scss';

type CalendarTableBoxProps = ComponentPropsWithoutRef<'div'>;

export const CalendarTableBox = ({
    className,
    children,
    ...remain
}: CalendarTableBoxProps) => (
    <div {...remain} className={classNames(className, styles.calendarTableBox)}>
        {children}
    </div>
);
