import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './SwitchLabel.module.scss';

type SwitchLabelProps = {
    className?: string;
    label?: string;
} & ComponentPropsWithoutRef<'span'>;

export const SwitchLabel = ({
    className,
    label,
    ...remain
}: SwitchLabelProps) => {
    if (!label) {
        return null;
    }
    return (
        <span {...remain} className={classNames(className, styles.switchLabel)}>
            {label}
        </span>
    );
};
