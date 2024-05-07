import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ComboInput.module.scss';

type ComboInputProps = ComponentPropsWithoutRef<'div'> & {
    listboxId: string;
    labelId: string;
};

export const ComboInput = ({
    labelId,
    listboxId,
    className,
    children,
    ...remain
}: ComboInputProps) => (
    <div
        {...remain}
        role="combobox"
        tabIndex={0}
        className={classNames(styles.comboInput, className)}
        aria-controls={listboxId}
        aria-labelledby={labelId}
        aria-haspopup="listbox"
    >
        {children}
    </div>
);
