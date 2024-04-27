import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Bottom.module.scss';

type BottomProps = ComponentPropsWithoutRef<'div'>;

/**
 * Used as Calendar's bottom content
 *
 * @param children The wrapper usually used to wrap calendar's bottom buttons
 * @returns The HTMLDivElement wrapper
 */
export const Bottom = ({ className, children, ...remain }: BottomProps) => (
    <div {...remain} className={classNames(className, styles.bottomCalendar)}>
        {children}
    </div>
);
