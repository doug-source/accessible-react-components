import classNames from 'classnames';
import { ComponentPropsWithoutRef, useState } from 'react';
import { CalendarCellService } from '../../../../../utils/CalendarCellService';
import { CalendarData } from '../../../../../utils/CalendarData';
import { TableCell } from '../../../../atoms/TableCell';
import { TableCellEmpty } from '../../../../atoms/TableCellEmpty';
import { TableRow } from '../../../../atoms/TableRow';
import { TableSection } from '../../../../atoms/TableSection';
import styles from './TableBody.module.scss';
import { ariaSelectedCell, extractDateContent, tabIndexCell } from './lib';
import { makeCellKeyDown } from './lib/handlers/makeCellKeyDown';
import { useTableRowRef } from './lib/hooks/useTableCellRefList';

type TableBodyProps = Omit<
    ComponentPropsWithoutRef<typeof TableSection>,
    'type'
> & {
    listRows: Date[][];
    cellClassName?: string;
    calendarData: CalendarData;
    setDateFocused: (date: Date) => void;
    setDateSelected: (date: Date) => void;
    hideCallback: () => void;
};

export const TableBody = ({
    listRows,
    cellClassName,
    calendarData,
    setDateFocused,
    setDateSelected,
    hideCallback,
    ...remain
}: TableBodyProps) => {
    const [cellService] = useState(
        new CalendarCellService(useTableRowRef(listRows))
    );
    return (
        <TableSection {...remain} type="tbody">
            {listRows?.map((cols, i) => (
                <TableRow show key={i}>
                    {cols.map((date, j) => (
                        <TableCell
                            ref={(el) => cellService.insertItem(i, j, el, date)}
                            type="td"
                            key={date.getDate()}
                            className={classNames(
                                cellClassName,
                                styles.day,
                                !calendarData.equalMonthFocused(date) &&
                                    styles.empty
                            )}
                            tabIndex={tabIndexCell(date, calendarData)}
                            aria-selected={ariaSelectedCell(date, calendarData)}
                            onClick={() => {
                                if (!calendarData.equalMonthFocused(date)) {
                                    return;
                                }
                                hideCallback();
                                setDateSelected(date);
                                setDateFocused(date);
                            }}
                            onKeyDown={makeCellKeyDown(
                                calendarData,
                                cellService,
                                setDateFocused,
                                setDateSelected,
                                i,
                                date,
                                hideCallback
                            )}
                        >
                            {extractDateContent(date, calendarData)}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
            <TableRow show={listRows?.length === 5}>
                <TableCellEmpty type="td" className={styles.day}>
                    &nbsp;
                </TableCellEmpty>
            </TableRow>
        </TableSection>
    );
};
