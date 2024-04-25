import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { CalendarCellService } from './CalendarCellService';
import { CalendarData } from './CalendarData';

type Item = HTMLTableCellElement | null;

let calendarCellService: CalendarCellService;

const runHook = () => {
    const initialProps: { list: Item[][] } = { list: [] };
    return renderHook(
        ({ list }) => {
            return useRef<Item[][]>(list);
        },
        { initialProps }
    );
};

const createDataCell = (dateNum: number, month: number, tabIndex = -1) => {
    const date = CalendarData.makeDateDashed(2024, month, dateNum);
    const td = {
        focus: jest.fn(),
        tabIndex,
    } as unknown as HTMLTableCellElement;
    return [td, date] as const;
};

describe('CallCellService', () => {
    beforeAll(() => {
        const { result } = runHook();
        calendarCellService = new CalendarCellService(result.current);
    });
    test('runs in beginning correctly', () => {
        const [cellOne, dateOne] = createDataCell(1, 9);
        const [cellTwo, dateTwo] = createDataCell(2, 9);
        const [cellThree, dateThree] = createDataCell(3, 9);
        const [cellFour, dateFour] = createDataCell(4, 9);

        calendarCellService.insertItem(0, 0, cellOne, dateOne);
        calendarCellService.insertItem(0, 1, cellTwo, dateTwo);
        calendarCellService.insertItem(1, 0, cellThree, dateThree);
        calendarCellService.insertItem(1, 1, cellFour, dateFour);

        expect(cellOne.focus).not.toHaveBeenCalled();
        expect(cellTwo.focus).not.toHaveBeenCalled();
        expect(cellThree.focus).not.toHaveBeenCalled();
        expect(cellFour.focus).not.toHaveBeenCalled();
    });
    test('runs by focusPrevious in the same month and row correctly', () => {
        const [cell, dateTarget] = createDataCell(1, 9);
        const rowOrigin = 0;
        calendarCellService.insertItem(rowOrigin, 0, cell, dateTarget);
        calendarCellService.insertItem(rowOrigin, 1, ...createDataCell(2, 9));
        calendarCellService.focusPrevious(rowOrigin, dateTarget);
        expect(cell.focus).toHaveBeenCalled();
    });
    test('runs by focusNext in the same month and row correctly', () => {
        const [cell, date] = createDataCell(2, 9);
        const rowOrigin = 0;
        calendarCellService.insertItem(rowOrigin, 0, ...createDataCell(1, 9));
        calendarCellService.insertItem(rowOrigin, 1, cell, date);
        calendarCellService.focusNext(rowOrigin, date);
        expect(cell.focus).toHaveBeenCalled();
    });
    test('runs by focusPreviousWeek in the same month correctly', () => {
        const calData = new CalendarData(
            'en-US',
            CalendarData.makeDateDashed(2024, 9, 1)
        );
        const [cell, dateTarget] = createDataCell(1, 9);
        calendarCellService.insertItem(0, 0, cell, dateTarget);
        const rowOrigin = 1;
        calendarCellService.insertItem(rowOrigin, 0, ...createDataCell(8, 9));
        calendarCellService.focusPreviousWeek(rowOrigin, dateTarget, calData);
        expect(cell.focus).toHaveBeenCalled();
    });
    test('runs by focusNextWeek in the same month correctly', () => {
        const calendarData = new CalendarData(
            'en-US',
            CalendarData.makeDateDashed(2024, 9, 1)
        );
        const [cell, date] = createDataCell(8, 9);
        calendarCellService.insertItem(0, 0, ...createDataCell(1, 9));
        calendarCellService.insertItem(1, 0, cell, date);
        calendarCellService.focusNextWeek(0, date, calendarData);
        expect(cell.focus).toHaveBeenCalled();
    });
    test('runs by focusPrevious to the previous month correctly', () => {
        const anyDate = new Date();
        // first ref assign
        calendarCellService.insertItem(0, 1, ...createDataCell(1, 4)); // dateOrigin
        calendarCellService.insertItem(0, 2, ...createDataCell(2, 4));
        calendarCellService.insertItem(0, 6, null, anyDate);
        calendarCellService.insertItem(1, 0, null, anyDate);
        const [cell, dateTarget] = createDataCell(31, 3, 0);
        calendarCellService.focusPrevious(0, dateTarget);
        expect(cell.focus).not.toHaveBeenCalled();
        // last ref assign
        calendarCellService.insertItem(0, 1, null, anyDate);
        calendarCellService.insertItem(0, 2, null, anyDate);
        calendarCellService.insertItem(0, 6, ...createDataCell(30, 3));
        calendarCellService.insertItem(1, 0, cell, dateTarget);
        expect(cell.focus).toHaveBeenCalled();
    });
    test('runs by focusNext in the next month correctly', () => {
        const anyDate = new Date();
        // first ref assign
        calendarCellService.insertItem(0, 6, ...createDataCell(30, 3));
        calendarCellService.insertItem(1, 0, ...createDataCell(31, 3));
        calendarCellService.insertItem(0, 1, null, anyDate);
        calendarCellService.insertItem(0, 2, null, anyDate);
        const [cell, dateTarget] = createDataCell(1, 4, 0);
        calendarCellService.focusNext(1, dateTarget);
        expect(cell.focus).not.toHaveBeenCalled();
        // last ref assign
        calendarCellService.insertItem(0, 6, null, anyDate);
        calendarCellService.insertItem(1, 0, null, anyDate);
        calendarCellService.insertItem(0, 1, cell, dateTarget);
        calendarCellService.insertItem(0, 2, ...createDataCell(2, 4));
        expect(cell.focus).toHaveBeenCalled();
    });
    test('runs by focusPreviousWeek to the previous month correctly', () => {
        const calendarData = new CalendarData(
            'en-US',
            CalendarData.makeDateDashed(2024, 4, 3)
        );
        const [cell, date] = createDataCell(27, 3, 0);
        calendarCellService.insertItem(0, 3, ...createDataCell(20, 3));
        calendarCellService.insertItem(1, 3, cell, date);
        calendarCellService.focusPreviousWeek(0, date, calendarData);
        expect(cell.focus).not.toHaveBeenCalled();
        calendarCellService.insertItem(0, 3, ...createDataCell(20, 3));
        calendarCellService.insertItem(1, 3, cell, date);
        expect(cell.focus).toHaveBeenCalled();
    });
    test('runs by focusNextWeek to the next month correctly', () => {
        const calendarData = new CalendarData(
            'en-US',
            CalendarData.makeDateDashed(2024, 3, 30)
        );
        const [cell, date] = createDataCell(6, 4, 0);
        calendarCellService.insertItem(0, 0, cell, date);
        calendarCellService.insertItem(1, 0, ...createDataCell(13, 4));
        calendarCellService.focusNextWeek(0, date, calendarData);
        expect(cell.focus).not.toHaveBeenCalled();
        calendarCellService.insertItem(0, 0, cell, date);
        calendarCellService.insertItem(1, 0, ...createDataCell(13, 4));
        expect(cell.focus).toHaveBeenCalled();
    });
    test('runs by focusPrevious in the same month between rows correctly', () => {
        const [cell, dateTarget] = createDataCell(13, 4);
        calendarCellService.insertItem(0, 6, cell, dateTarget);
        const rowOrigin = 1;
        calendarCellService.insertItem(rowOrigin, 0, ...createDataCell(14, 4));
        calendarCellService.focusPrevious(rowOrigin, dateTarget);
        expect(cell.focus).toHaveBeenCalled();
    });
    test('runs by focusNext in the same month between rows correctly', () => {
        const [cell, dateTarget] = createDataCell(14, 4);
        calendarCellService.insertItem(1, 0, cell, dateTarget);
        const rowOrigin = 0;
        calendarCellService.insertItem(rowOrigin, 6, ...createDataCell(13, 4));
        calendarCellService.focusNext(rowOrigin, dateTarget);
        expect(cell.focus).toHaveBeenCalled();
    });
});
