import { CalendarData } from './CalendarData';

const makeDate = (day: string | number, month: string | number) => {
    return new Date(
        `2024-${String(month).padStart(2, '0')}-${String(day).padStart(
            2,
            '0'
        )}T00:00:00`
    );
};

const buildList = (str: string) => {
    const [, begin, end, month] = /^(\d+)-(\d+)\/(\d+)$/.exec(str) ?? [];
    const list: Date[] = [];
    if (typeof month !== 'undefined') {
        for (let i = Number(begin); i <= Number(end); i++) {
            list.push(makeDate(i, month));
        }
    }
    return list;
};

const openCalendar = (locale: string, date?: Date) => {
    return new (class extends CalendarData {
        public makeNamesPub(...args: Parameters<CalendarData['makeNames']>) {
            return this.makeNames(...args);
        }
        public movePub(...args: Parameters<typeof CalendarData.move>) {
            return CalendarData.move(...args);
        }
        public isLeapYearPub(
            ...args: Parameters<typeof CalendarData.isLeapYear>
        ) {
            return CalendarData.isLeapYear(...args);
        }
        public getPreviousMonthPub(
            ...args: Parameters<CalendarData['getPreviousMonth']>
        ) {
            return this.getPreviousMonth(...args);
        }
        public getNextMonthPub(
            ...args: Parameters<CalendarData['getNextMonth']>
        ) {
            return this.getNextMonth(...args);
        }
    })(locale, date);
};

describe('CalendarData class', () => {
    test('instanciates with propery correctly', () => {
        const date = new Date();
        const locale = 'en-US';
        const calendarData = new CalendarData(locale, date);
        expect(calendarData.lastDateNum).toBe(date.getDate());
        expect(calendarData.year).toBe(date.getFullYear());
    });
    test('runs getLocale method correctly', () => {
        const date = new Date('2024-04-01T00:00:00');
        const locale = 'en-US';
        const calendarData = new CalendarData(locale, date);
        expect(calendarData.getLocale()).toBe(locale);
    });
    test('runs getDateFocused and getDateSelected methods correctly', () => {
        const date = new Date('2024-04-01T00:00:00');
        const locale = 'en-US';
        const calendarData = new CalendarData(locale, date);
        expect(calendarData.getDateFocused()).toMatchObject(date);
        expect(calendarData.getDateSelected()).toMatchObject(new Date(0, 0, 1));
    });
    test('runs getDateSelectedComplete method correctly', () => {
        const date = new Date('2024-04-01T00:00:00');
        const locale = 'en-US';
        const calendarData = new CalendarData(locale, date);
        expect(calendarData.getDateSelectedComplete()).toBe('');
        calendarData.setDateSelected(date);
        expect(calendarData.getDateSelectedComplete()).toBe(
            date.toLocaleDateString(locale, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        );
    });
    test('runs getInputDateSelected method correctly', () => {
        const date = new Date('2024-04-01T00:00:00');
        const locale = 'en-US';
        const calendarData = new CalendarData(locale, date);
        expect(calendarData.getInputDateSelected()).toBe('');
        calendarData.setDateSelected(calendarData.getDateFocused());
        expect(calendarData.getInputDateSelected()).toBe(
            date.toLocaleDateString(locale)
        );
    });
    test('runs getWeekNames method correctly', () => {
        const date = new Date('2024-04-01T00:00:00');
        const locale = 'en-US';
        const calendarData = new CalendarData(locale, date);
        expect(calendarData.getWeekNames('short')).toMatchObject([
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
        ]);
        expect(calendarData.getWeekNames('long')).toMatchObject([
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]);
    });
    test('runs getMonth method correctly', () => {
        const date = new Date('2024-04-01T00:00:00');
        const locale = 'en-US';
        const calendarData = new CalendarData(locale, date);
        expect(calendarData.getMonth('short')).toBe('Apr');
        expect(calendarData.getMonth('long')).toBe('April');
    });
    test('runs getDateFormat method correctly', () => {
        const calendarData = new CalendarData(
            'en-US',
            new Date('2024-04-01T00:00:00')
        );
        expect(calendarData.getDateFormat()).toBe('mm/dd/yyyy');
        expect(calendarData.getDateFormat('pt-BR')).toBe('dd/mm/yyyy');
        expect(calendarData.getDateFormat('en-GB')).toBe('mm/dd/yyyy');
    });
    test('runs setLocale method correctly', () => {
        const firstLocale = 'en-US';
        const calendarData = new CalendarData(firstLocale);
        expect(calendarData.getLocale()).toBe(firstLocale);
        const secondLocale = 'pt-BR';
        calendarData.setLocale(secondLocale);
        expect(calendarData.getLocale()).toBe(secondLocale);
    });
    test('runs getCalendarDays method correctly', () => {
        const date = new Date('2024-04-01T00:00:00');
        const locale = 'en-US';
        const calendarData = new CalendarData(locale, date);
        const februaryDays = [
            ['28-31/1', '1-3/2'],
            ['4-10/2'],
            ['11-17/2'],
            ['18-24/2'],
            ['25-29/2', '1-2/3'],
        ].map((list) => list.map((str) => buildList(str)).flat());
        expect(calendarData.getCalendarDays(2, 2024)).toMatchObject(
            februaryDays
        );
        calendarData.setDateFocused(new Date('2024-09-01T00:00:00'));
        const septemberDays = [
            ['1-7/9'],
            ['8-14/9'],
            ['15-21/9'],
            ['22-28/9'],
            ['29-30/9', '1-5/10'],
        ].map((list) => list.map((str) => buildList(str)).flat());
        expect(calendarData.getCalendarDays()).toMatchObject(septemberDays);
    });
    test('runs setDateFocused method correctly', () => {
        const date = new Date('2024-04-01T00:00:00');
        const calendarData = new CalendarData('en-US');
        calendarData.setDateFocused(date);
        expect(calendarData.getDateFocused()).toMatchObject(date);
    });
    test('runs equalDateSelected method correctly', () => {
        const calendarData = new CalendarData('en-US');
        const date = new Date('2024-04-01T00:00:00');
        expect(calendarData.equalDateSelected(new Date(date)));
    });
    test('runs equalMonthFocused method correctly', () => {
        const calendarData = new CalendarData(
            'en-US',
            new Date('2024-04-01T00:00:00')
        );
        expect(
            calendarData.equalMonthFocused(new Date('2024-04-15T00:00:00'))
        ).toBe(true);
        expect(
            calendarData.equalMonthFocused(new Date('2024-05-01T00:00:00'))
        ).toBe(false);
    });
    test('runs equalDateFocused method correctly', () => {
        const date = new Date('2024-04-01T00:00:00');
        const calendarData = new CalendarData('en-US', date);
        const newDate = new Date(date);
        expect(calendarData.equalDateFocused(newDate)).toBe(true);
        newDate.setDate(5);
        expect(calendarData.equalDateFocused(newDate)).toBe(false);
    });
    test('runs static equalDates method correctly', () => {
        expect(CalendarData.equalDates(makeDate(1, 2), makeDate(1, 2))).toBe(
            true
        );
        expect(CalendarData.equalDates(makeDate(1, 2), makeDate(1, 3))).toBe(
            false
        );
    });
    test('runs static changeMonth method correctly', () => {
        const dateModifiedOne = CalendarData.changeMonth(makeDate(5, 1), 2, 1);
        expect(dateModifiedOne.getDate()).toBe(1);
        expect(dateModifiedOne.getMonth() + 1).toBe(3);
        const dateModifiedTwo = CalendarData.changeMonth(makeDate(5, 5), 2);
        expect(dateModifiedTwo.getDate()).toBe(5);
        expect(dateModifiedTwo.getMonth() + 1).toBe(7);
    });
    test('runs static makeDateDashed method correctly', () => {
        const dateFromDashed = CalendarData.makeDateDashed(2024, 3, 1);
        expect(dateFromDashed.getFullYear()).toBe(2024);
        expect(dateFromDashed.getMonth() + 1).toBe(3);
        expect(dateFromDashed.getDate()).toBe(1);
    });
    test('runs static getMonthDaysQty method correctly', () => {
        expect(CalendarData.getMonthDaysQty(2, 2023)).toBe(28);
        expect(CalendarData.getMonthDaysQty(2, 2024)).toBe(29);
        expect(CalendarData.getMonthDaysQty(4, 2024)).toBe(30);
        expect(CalendarData.getMonthDaysQty(1, 2024)).toBe(31);
    });
    test('runs protected makeNames method for weeks correctly', () => {
        const calendarData = openCalendar('en-US');
        const weekdayNames = calendarData.makeNamesPub('weekday');
        expect(weekdayNames.short).toMatchObject([
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
        ]);
        expect(weekdayNames.long).toMatchObject([
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ]);
    });
    test('runs protected makeNames method for months correctly', () => {
        const calendarData = openCalendar('en-US');
        const monthNames = calendarData.makeNamesPub('month');
        expect(monthNames.short).toMatchObject([
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]);
        expect(monthNames.long).toMatchObject([
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]);
    });
    test('runs protected static move method correctly', () => {
        const calendarData = openCalendar('en-US');
        expect(calendarData.movePub(10, 2, false)).toBe(12);
        expect(calendarData.movePub(10, 2, true)).toBe(8);
    });
    test('runs protected static isLeapYear method correctly', () => {
        const calendarData = openCalendar('en-US');
        expect(calendarData.isLeapYearPub(-1)).toBe(false);
        expect(calendarData.isLeapYearPub(2000)).toBe(false);
    });
    test('runs protected getPreviousMonth method correctly', () => {
        const date = new Date();
        const calendarData = openCalendar('en-US', date);
        expect(calendarData.getPreviousMonthPub(2, 2024)).toMatchObject({
            month: 1,
            year: 2024,
        });
        expect(calendarData.getPreviousMonthPub(1, 2024)).toMatchObject({
            month: 12,
            year: 2023,
        });
    });
    test('runs protected getNextMonth method correctly', () => {
        const date = new Date();
        const calendarData = openCalendar('en-US', date);
        expect(calendarData.getNextMonthPub(11, 2024)).toMatchObject({
            month: 12,
            year: 2024,
        });
        expect(calendarData.getNextMonthPub(12, 2024)).toMatchObject({
            month: 1,
            year: 2025,
        });
    });
});
