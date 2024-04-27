import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import { TableCell } from '../TableCell';
import styles from './TableCellEmpty.module.scss';

type TableCellEmptyProps = ComponentPropsWithoutRef<typeof TableCell>;

export const TableCellEmpty = ({
    type,
    className,
    children,
    ...remain
}: TableCellEmptyProps) => (
    <TableCell
        {...remain}
        type={type}
        className={classNames(className, styles.ghost)}
        tabIndex={-1}
    >
        {children}
    </TableCell>
);
