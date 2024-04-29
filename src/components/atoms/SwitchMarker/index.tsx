import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './SwitchMarker.module.scss';

type SwitchMarkerProps = ComponentPropsWithoutRef<'div'>;

export const SwitchMarker = ({
    className,
    children,
    ...remain
}: SwitchMarkerProps) => {
    return (
        <div className={classNames(className, styles.switchMarker)} {...remain}>
            {children}
        </div>
    );
};
