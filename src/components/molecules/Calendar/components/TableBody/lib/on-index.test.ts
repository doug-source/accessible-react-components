import { ariaSelectedCell, extractDateContent, tabIndexCell } from '.';
import { CalendarData } from '../../../../../../utils/CalendarData';

const calendarData = new CalendarData('en-US');

describe('extractDateContent function', () => {
    test('runs with output correctly', () => {
        const date = CalendarData.makeDateDashed(2024, 2, 15);
        let output = extractDateContent(date, calendarData);
        expect(output).toBe('\u{FEFF}');
        const dateFocused = calendarData.getDateFocused();
        output = extractDateContent(dateFocused, calendarData);
        expect(output).toBe(dateFocused.getDate());
    });
});

describe('tabIndexCell function', () => {
    test('runs with output correctly', () => {
        const date = calendarData.getDateFocused();
        expect(tabIndexCell(date, calendarData)).toBe(0);
        const anotherDate = CalendarData.makeDateDashed(2023, 2, 1);
        expect(tabIndexCell(anotherDate, calendarData)).toBe(-1);
    });
});

describe('ariaSelectedCell function', () => {
    test('runs with output correctly', () => {
        const date = calendarData.getDateSelected();
        expect(ariaSelectedCell(date, calendarData)).toBe(true);
        const anotherDate = CalendarData.makeDateDashed(2023, 2, 1);
        expect(ariaSelectedCell(anotherDate, calendarData)).toBe(undefined);
    });
});
