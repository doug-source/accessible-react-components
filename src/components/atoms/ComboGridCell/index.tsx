import classNames from 'classnames';
import {
    ComponentPropsWithoutRef,
    ForwardedRef,
    forwardRef,
    useId,
} from 'react';
import styles from './ComboGridCell.module.scss';

type ComboGridCellProps = ComponentPropsWithoutRef<'div'>;

const ComboGridCellInner = (
    { className, children, ...remain }: ComboGridCellProps,
    ref: ForwardedRef<HTMLDivElement>
) => {
    const cellRef = useId();
    return (
        <div
            {...remain}
            ref={ref}
            id={cellRef}
            className={classNames(className, styles.cell)}
        >
            {children}
        </div>
    );
};

export const ComboGridCell = forwardRef<HTMLDivElement, ComboGridCellProps>(
    ComboGridCellInner
);
