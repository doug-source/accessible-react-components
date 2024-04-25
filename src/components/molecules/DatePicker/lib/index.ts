import { CalendarData } from '../../../../utils/CalendarData';

export const extractDateContent = (date: Date, calendarData: CalendarData) => {
    return calendarData.equalMonthFocused(date) ? date.getDate() : '\u{FEFF}';
};

export const tabIndexCell = (date: Date, calendarData: CalendarData) => {
    if (calendarData.equalDateFocused(date)) {
        return 0;
    }
    return -1;
};

export const ariaSelectedCell = (date: Date, calendarData: CalendarData) => {
    if (calendarData.equalDateSelected(date)) {
        return true;
    }
};
