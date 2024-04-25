import { CalendarData } from '../../../../../utils/CalendarData';
import { makeDateMoveHandler, makeHeaderHandlers } from './dateMode';

describe('makeDateMoveHandler function', () => {
    const calendarData = new CalendarData(
        'en-US',
        CalendarData.makeDateDashed(2014, 2, 1)
    );

    beforeEach(() => {
        calendarData.setDateFocused(CalendarData.makeDateDashed(2014, 2, 1));
    });
    test('returns function as output', () => {
        const outputFn = makeDateMoveHandler(calendarData, () => {}, 1);
        expect(typeof outputFn).toBe('function');
    });
    test('calls setDateSelected with date on next month correctly', () => {
        const setDateSelected = jest.fn();
        let outputDate: Date | null = null;
        const fnInput = (date: Date) => {
            outputDate = date;
            setDateSelected(date);
        };
        const outputFn = makeDateMoveHandler(calendarData, fnInput, 1);
        outputFn();
        expect(setDateSelected).toHaveBeenCalledWith(outputDate);
        const dateToTest =
            outputDate ?? CalendarData.makeDateDashed(2014, 10, 1);
        expect(dateToTest.getMonth()).toBe(2); // March
    });
    test('calls setDateSelected with date on previous month correctly', () => {
        const setDateSelected = jest.fn();
        let outputDate: Date | null = null;
        const fnInput = (date: Date) => {
            outputDate = date;
            setDateSelected(date);
        };
        const outputFn = makeDateMoveHandler(calendarData, fnInput, -1);
        outputFn();
        expect(setDateSelected).toHaveBeenCalledWith(outputDate);
        const dateToTest =
            outputDate ?? CalendarData.makeDateDashed(2014, 10, 1);
        expect(dateToTest.getMonth()).toBe(0); // January
    });
});

describe('makeHeaderHandlers function', () => {
    const calendarData = new CalendarData(
        'en-US',
        CalendarData.makeDateDashed(2014, 2, 1)
    );

    test('returns output correctly', () => {
        const output = makeHeaderHandlers(calendarData, () => {});
        expect(output.before).toBeDefined();
        expect(output.after).toBeDefined();
        expect(typeof output.before.month).toBe('function');
        expect(typeof output.before.year).toBe('function');
        expect(typeof output.after.month).toBe('function');
        expect(typeof output.after.year).toBe('function');
        // calls
        expect(output.before.month()).toBe(true);
        expect(output.before.year()).toBe(true);
        expect(output.after.month()).toBe(true);
        expect(output.after.year()).toBe(true);
    });
});
