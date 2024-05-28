import classNames from 'classnames';
import {
    ComponentPropsWithoutRef,
    ForwardedRef,
    MutableRefObject,
    forwardRef,
    useId,
} from 'react';
import { ComboGridCell } from '../../atoms/ComboGridCell';
import styles from './ComboGridRow.module.scss';

type ComboGridRowProps = ComponentPropsWithoutRef<'div'> & {
    index: number;
    focused: number;
    cellListRef: MutableRefObject<(HTMLDivElement | null)[]>;
    cellBoolean: boolean;
    text: string;
    desc: string;
};

const ComboGridRowInner = (
    {
        className,
        index,
        focused,
        cellListRef,
        cellBoolean,
        text,
        desc,
        ...remain
    }: ComboGridRowProps,
    ref: ForwardedRef<HTMLDivElement>
) => {
    const rowId = useId();
    return (
        <div
            {...remain}
            ref={ref}
            id={rowId}
            role="row"
            className={classNames(className, styles.row)}
        >
            <ComboGridCell
                aria-selected={index === focused ? true : undefined}
                ref={(el) => {
                    cellListRef.current[index * 2] = el;
                }}
            >
                <span
                    className={classNames(
                        styles.text,
                        index === focused && !cellBoolean && styles.marked
                    )}
                >
                    {text}
                </span>
            </ComboGridCell>
            <ComboGridCell
                ref={(el) => {
                    cellListRef.current[index * 2 + 1] = el;
                }}
            >
                <span
                    className={classNames(
                        styles.text,
                        index === focused && cellBoolean && styles.marked
                    )}
                >
                    {desc}
                </span>
            </ComboGridCell>
        </div>
    );
};

export const ComboGridRow = forwardRef<HTMLDivElement, ComboGridRowProps>(
    ComboGridRowInner
);
