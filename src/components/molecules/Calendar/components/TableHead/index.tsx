import { ComponentPropsWithoutRef } from 'react';
import { TableCell } from '../../../../atoms/TableCell';
import { TableRow } from '../../../../atoms/TableRow';
import { TableSection } from '../../../../atoms/TableSection';
import styles from './TableHead.module.scss';

type weekday = readonly [short: string, long: string];

type TableHeadProps = {
    weekdays: weekday[];
    title?: ComponentPropsWithoutRef<typeof TableSection>['title'];
    cellClassName?: string;
};

export const TableHead = ({
    title,
    weekdays,
    cellClassName,
}: TableHeadProps) => (
    <TableSection type="thead" title={title} className={styles.weekdays}>
        <TableRow show>
            {weekdays.map(([short, long]) => (
                <TableCell
                    key={short}
                    type="th"
                    abbr={long}
                    scope="col"
                    className={cellClassName}
                >
                    {short}
                </TableCell>
            ))}
        </TableRow>
    </TableSection>
);
