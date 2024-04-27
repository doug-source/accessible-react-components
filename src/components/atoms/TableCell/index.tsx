import { ComponentPropsWithoutRef, createElement, forwardRef } from 'react';

type TableCellProps = ComponentPropsWithoutRef<'th' | 'td'> & {
    type: 'th' | 'td';
};

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
    function TableCellInner(
        { type, className, children, ...remain }: TableCellProps,
        ref
    ) {
        return createElement(
            type,
            {
                ...remain,
                className,
                ref,
            },
            children
        );
    }
);
