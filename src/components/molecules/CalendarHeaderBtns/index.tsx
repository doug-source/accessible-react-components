import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './CalendarHeaderBtns.module.scss';

type CalendarHeaderBtnsProps = ComponentPropsWithoutRef<'div'>;

export const CalendarHeaderBtns = ({
    className,
    children,
    ...remain
}: CalendarHeaderBtnsProps) => (
    <div
        {...remain}
        className={classNames(className, styles.calendarHeaderBtns)}
    >
        {children}
    </div>
);
