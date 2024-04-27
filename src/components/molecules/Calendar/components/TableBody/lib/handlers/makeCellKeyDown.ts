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
    ]);
};
