import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ComboGridBox.module.scss';

type ComboGridBoxProps = ComponentPropsWithoutRef<'div'> & {
    labelId?: string;
};

export const ComboGridBox = ({
    className,
    labelId,
    children,
    ...remain
}: ComboGridBoxProps) => (
    <div
        {...remain}
        aria-labelledby={labelId}
        role="grid"
        className={classNames(className, styles.grid)}
    >
        {children}
    </div>
);
