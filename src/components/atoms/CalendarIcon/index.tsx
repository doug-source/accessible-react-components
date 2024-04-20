import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import CalendarSVG from '../../../assets/calendar.svg?react';
import styles from './CalendarIcon.module.scss';

type CalendarIconProps = ComponentPropsWithoutRef<'svg'> & {
    noEvents?: boolean;
};

export const CalendarIcon = ({
    className,
    noEvents = false,
    ...remain
}: CalendarIconProps) => {
    return (
        <CalendarSVG
            {...remain}
            className={classNames(
                className,
                noEvents && styles.noEvents,
                styles.calendarIcon
            )}
        />
    );
};
