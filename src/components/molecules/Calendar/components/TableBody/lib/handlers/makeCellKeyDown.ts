import { makeKeydownHandler } from '../../../../../../../lib/handlers/keyDown';
import { CalendarCellService } from '../../../../../../../utils/CalendarCellService';
import { CalendarData } from '../../../../../../../utils/CalendarData';

export const makeCellKeyDown = (
    calendarData: CalendarData,
    cellService: CalendarCellService,
    setDateFocused: (date: Date) => void,
    setDateSelected: (date: Date) => void,
    i: number,
    date: Date,
    hideCallback: () => void
) => {
    return makeKeydownHandler([
        [
            'ArrowRight',
            () => {
                const date = calendarData.getDateFocused();
                date.setDate(date.getDate() + 1);
                setDateFocused(date);
                cellService.focusNext(i, date);
                return true;
            },
        ],
        [
            'ArrowLeft',
            () => {
                const date = calendarData.getDateFocused();
                date.setDate(date.getDate() - 1);
                setDateFocused(date);
                cellService.focusPrevious(i, date);
                return true;
            },
        ],
        [
            'ArrowUp',
            () => {
                const date = calendarData.getDateFocused();
                date.setDate(date.getDate() - 7);
                setDateFocused(date);
                cellService.focusPreviousWeek(i, date, calendarData);
                return true;
            },
        ],
        [
            'ArrowDown',
            () => {
                const date = calendarData.getDateFocused();
                date.setDate(date.getDate() + 7);
                setDateFocused(date);
                cellService.focusNextWeek(i, date, calendarData);
                return true;
            },
        ],
        [
            ' ',
            () => {
                setDateSelected(date);
                return true;
            },
        ],
        [
            'Enter',
            () => {
                setDateSelected(date);
                setDateFocused(date);
                hideCallback();
                return true;
            },
        ],
        [
            'Home',
            () => {
                const dayQty = date.getDay() % CalendarData.CALENDAR_WEEK_DAYS;
                const newDate = new Date(date);
                newDate.setDate(newDate.getDate() - dayQty);
                if (newDate.getMonth() !== date.getMonth()) {
                    const lastMonthDate = CalendarData.getMonthDaysQty(
                        newDate.getMonth() + 1,
                        newDate.getFullYear()
                    );
                    const diff = lastMonthDate - newDate.getDate();
                    newDate.setDate(newDate.getDate() + diff + 1);
                }
                setDateFocused(newDate);
                cellService.focusPrevious(i, newDate);
                return true;
            },
        ],
        [
            'End',
            () => {
                const weekDays = CalendarData.CALENDAR_WEEK_DAYS;
                const dayPos = date.getDay() % weekDays;
                const dayQty = weekDays - (dayPos + 1);
                const newDate = new Date(date);
                newDate.setDate(newDate.getDate() + dayQty);
                if (newDate.getMonth() !== date.getMonth()) {
                    newDate.setDate(0);
                }
                setDateFocused(newDate);
                cellService.focusNext(i, newDate);
                return true;
            },
        ],
        [
            'PageUp',
            () => {
                const preMonthDate = date.getDate();
                let newDate = new Date(date);
                newDate.setMonth(newDate.getMonth() - 1);
                if (newDate.getDate() !== preMonthDate) {
                    newDate = new Date(date);
                    newDate.setDate(0);
                }
                setDateFocused(newDate);
                cellService.focusPreviousWeek(i, newDate, calendarData);
                return true;
            },
        ],
        [
            'PageDown',
            () => {
                const preMonthDate = date.getDate();
                const newDate = new Date(date);
                newDate.setMonth(newDate.getMonth() + 1);
                if (newDate.getDate() !== preMonthDate) {
                    newDate.setDate(0);
                }
                setDateFocused(newDate);
                cellService.focusNextWeek(i, newDate, calendarData);
                return true;
            },
        ],
    ]);
};
