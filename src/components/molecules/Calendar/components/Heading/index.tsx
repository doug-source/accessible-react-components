import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { Heading as RootHeading } from '../../../../atoms/Heading';
import styles from './Heading.module.scss';

type CalendarHeadingProps = ComponentPropsWithoutRef<typeof RootHeading>;

export const Heading = ({
    className,
    children,
    ...remain
}: CalendarHeadingProps) => (
    <RootHeading {...remain} className={classNames(className, styles.heading)}>
        {children}
    </RootHeading>
);
