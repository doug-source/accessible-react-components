import { ComponentPropsWithoutRef } from 'react';

type TableRowProps = ComponentPropsWithoutRef<'tr'> & {
    show: boolean;
};

export const TableRow = ({
    show,
    className,
    children,
    ...remain
}: TableRowProps) => {
    if (!show) {
        return null;
    }
    return (
        <tr {...remain} className={className}>
            {children}
        </tr>
    );
};
