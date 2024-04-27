import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './TableGrid.module.scss';

type TableGridProps = ComponentPropsWithoutRef<'table'>;

export const TableGrid = ({
    className,
    children,
    ...remain
}: TableGridProps) => (
    <table
        {...remain}
        className={classNames(className, styles.tableGrid)}
        role="grid"
    >
        {children}
    </table>
);
