import { renderHook } from '@testing-library/react';
import { CalendarData } from '../../../../utils/CalendarData';
import { useCalendarDays } from './useCalendarDays';

type InitialProps = {
    dateFocused: Date;
    dateSelected: Date;
    onDateChange?: (date: Date) => void;
};

const runHook = () => {
    const initialProps: InitialProps = {
        dateFocused: CalendarData.makeDateDashed(2024, 2, 1),
        dateSelected: new Date(0, 0, 1),
    };
    const { result, rerender } = renderHook(
        ({ dateFocused, dateSelected, onDateChange }) => {
            const { monthDays: list, calendarData } = useCalendarDays(
                'en-US',
                dateFocused,
                dateSelected,
                onDateChange
            );
            return {
                list,
                calendarData,
            };
        },
        { initialProps }
    );
    return { result, rerender };
};

describe('useCalendarDays hook', () => {
    test('runs correctly', () => {
        const { result } = runHook();

        expect(result.current.list).toHaveLength(5);
        expect(result.current.list[0]).toHaveLength(7);
        expect(result.current.list[0][0].getMonth()).toBe(0); // January
        expect(result.current.list[0][0].getFullYear()).toBe(2024);
        expect(result.current.list[1][0].getMonth()).toBe(1); // February
        expect(result.current.list[1][0].getFullYear()).toBe(2024);
        const lastRow = result.current.list[result.current.list.length - 1];
        expect(lastRow[lastRow.length - 1].getMonth()).toBe(2); // March
        expect(lastRow[lastRow.length - 1].getFullYear()).toBe(2024);
    });
    test('runs changing month correctly', async () => {
        const { result, rerender } = runHook();

        rerender({
            dateFocused: CalendarData.makeDateDashed(2024, 4, 1),
            dateSelected: new Date(0, 0, 1),
        });

        expect(result.current.list[0][0].getMonth()).toBe(2); // March
        expect(result.current.list[0][0].getFullYear()).toBe(2024);
        expect(result.current.list[1][0].getMonth()).toBe(3); // April
        expect(result.current.list[1][0].getFullYear()).toBe(2024);
        const lastRow = result.current.list[result.current.list.length - 1];
        expect(lastRow[lastRow.length - 1].getMonth()).toBe(4); // May
        expect(lastRow[lastRow.length - 1].getFullYear()).toBe(2024);
    });
    test('runs changing dateSelected and dateFocused correctly', () => {
        const onDateChange = jest.fn();
        const { result, rerender } = runHook();
        expect(
            result.current.calendarData.equalDateFocused(
                CalendarData.makeDateDashed(2024, 2, 1)
            )
        ).toBe(true);
        expect(
            result.current.calendarData.equalDateSelected(new Date(0, 0, 1))
        ).toBe(true);
        const newDateSelected = CalendarData.makeDateDashed(2024, 4, 15);
        rerender({
            dateFocused: CalendarData.makeDateDashed(2024, 4, 1),
            dateSelected: newDateSelected,
            onDateChange,
        });
        expect(
            result.current.calendarData.equalDateFocused(
                CalendarData.makeDateDashed(2024, 4, 1)
            )
        ).toBe(true);
        expect(
            result.current.calendarData.equalDateSelected(
                CalendarData.makeDateDashed(2024, 4, 15)
            )
        ).toBe(true);
        expect(onDateChange).toHaveBeenCalledWith(newDateSelected);
    });
});
