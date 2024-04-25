/**
 * Class manager of DatePicker state
 */
export class CalendarData {
    protected localeName: string;

    protected dateSelected: Date;

    protected dateFocused: Date;

    public lastDateNum: number;

    public get year() {
        return this.dateFocused.getFullYear();
    }

    public static readonly MONTHS_30: ReadonlyArray<number> = [4, 6, 9, 11];
    public static readonly CALENDAR_WEEKS = 6;
    public static readonly CALENDAR_MONTHS_QTY = 12;
    public static readonly CALENDAR_WEEK_DAYS = 7;

    protected WEEKS: Readonly<Record<'short' | 'long', ReadonlyArray<string>>>;

    protected MONTHS: Readonly<Record<'short' | 'long', ReadonlyArray<string>>>;

    protected static dateFormats: Record<string, string> = {
        'en-US': 'mm/dd/yyyy',
        'pt-BR': 'dd/mm/yyyy',
    };

    constructor(localeName: string, dateFocused = new Date()) {
        this.dateSelected = new Date(0, 0, 1);
        this.dateFocused = dateFocused;
        this.localeName = localeName;
        this.lastDateNum = this.dateFocused.getDate();

        this.WEEKS = this.makeWeekNames();
        this.MONTHS = this.makeMonthNames();
    }

    /**
     * Getter to localeName property
     *
     * @returns The current locale
     */
    public getLocale() {
        return this.localeName;
    }

    /**
     * Getter to dateFocused property
     *
     * @returns The current dateFocused
     */
    public getDateFocused() {
        return new Date(this.dateFocused);
    }

    /**
     * Change the date focused
     *
     * @param date The new date focused
     */
    public setDateFocused(date: Date) {
        this.dateFocused = new Date(date);
        this.lastDateNum = date.getDate();
    }

    /**
     * Getter to dateSelected property
     *
     * @returns The current dateSelected property
     */
    public getDateSelected() {
        return new Date(this.dateSelected);
    }

    /**
     * Change the date selected
     *
     * @param date The new date selected
     */
    public setDateSelected(date: Date) {
        this.dateSelected = new Date(date);
    }

    /**
     * Return the complete string from date selected
     *
     * @returns The date selected complete
     */
    public getDateSelectedComplete() {
        if (this.dateSelected.getFullYear() === 1900) {
            return '';
        }
        return this.dateSelected.toLocaleDateString(this.localeName, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    /**
     * Return the string from date selected used by datepicker input
     *
     * @returns The string from date selected
     */
    public getInputDateSelected() {
        if (this.dateSelected.getFullYear() === 1900) {
            return '';
        }
        return this.dateSelected.toLocaleDateString(this.localeName);
    }

    /**
     * Change the current locale
     *
     * @param localeName The new locale
     */
    public setLocale(localeName: string) {
        this.localeName = localeName;

        this.WEEKS = this.makeWeekNames();
        this.MONTHS = this.makeMonthNames();
    }

    /**
     * Define if the firstDate passed is equal to secondDate
     *
     * @param firstDate
     * @param secondDate
     * @returns The conditional
     */
    public static equalDates(firstDate: Date, secondDate: Date) {
        return (
            firstDate.getDate() === secondDate.getDate() &&
            firstDate.getMonth() === secondDate.getMonth() &&
            firstDate.getFullYear() === secondDate.getFullYear()
        );
    }

    /**
     * Define if the date passed is equal to internal focused date
     *
     * @param date
     * @returns The conditional
     */
    public equalDateFocused(date: Date) {
        return CalendarData.equalDates(this.dateFocused, date);
    }

    /**
     * Define if the date passed is equal to internal selected date
     *
     * @param date
     * @returns The conditional
     */
    public equalDateSelected(date: Date) {
        return CalendarData.equalDates(this.dateSelected, date);
    }

    /**
     * Define if the date passed has the month equal to internal focused date's month
     *
     * @param date
     * @returns The conditional
     */
    public equalMonthFocused(date: Date) {
        return (
            this.dateFocused.getMonth() === date.getMonth() &&
            this.dateFocused.getFullYear() === date.getFullYear()
        );
    }

    /**
     * Return a week names list
     *
     * @returns The week names
     */
    public getWeekNames(type: 'short' | 'long') {
        return this.WEEKS[type];
    }

    /**
     * Make the internal week/month names list
     *
     * @returns The week/month names list
     */
    protected makeNames(type: 'weekday' | 'month') {
        return {
            short: CalendarData.buildListByLocale(
                this.localeName,
                type,
                'short'
            ).map((d) => d.replace('.', '')),
            long: CalendarData.buildListByLocale(this.localeName, type, 'long'),
        };
    }

    /**
     * Make the internal week names list
     *
     * @returns The week names list
     */
    protected makeWeekNames() {
        return this.makeNames('weekday');
    }

    /**
     * Make the internal month names list
     *
     * @returns The month names list
     */
    protected makeMonthNames() {
        return this.makeNames('month');
    }

    /**
     * Mount the weekdays/months list for a given format
     *
     * @param localeName
     * @param type
     * @param format
     * @returns string[]
     */
    protected static buildListByLocale(
        localeName: string,
        type: 'weekday' | 'month',
        format: 'long' | 'narrow' | 'short'
    ) {
        const { format: FormatFn } = new Intl.DateTimeFormat(localeName, {
            [type]: format,
        });
        if (type === 'weekday') {
            return Array.from({ length: 7 }, (_, day) =>
                FormatFn(new Date(Date.UTC(2023, 1, day - 1)))
            );
        }
        return Array.from({ length: 12 }, (_, month) =>
            FormatFn(new Date(Date.UTC(2023, month + 1, 1)))
        );
    }

    /**
     * Get the month in the long or short string format
     *
     * @param type 'long' or 'short'
     * @param date
     * @returns string
     */
    public getMonth(type: 'long' | 'short', date = this.dateFocused) {
        return this.MONTHS[type][date.getMonth()];
    }

    /**
     * Make the date-format
     *
     * @param locale The locale base of date-format
     * @returns The date-format
     */
    public getDateFormat(locale = this.localeName) {
        const dFormat: string | undefined = CalendarData.dateFormats[locale];
        return dFormat ?? CalendarData.dateFormats['en-US'];
    }

    /**
     * Move a value to a direction
     *
     * @param value The value to move
     * @param qty Quantity to move
     * @param back Define the direction of value movement
     * @returns The new value
     */
    protected static move(value: number, qty: number, back: boolean) {
        if (back) {
            return value - qty;
        }
        return value + qty;
    }

    /**
     * Calculate the days quantity into a month
     *
     * @param year
     * @param month
     * @returns The days quantity calculated
     */
    protected static getMonthDays(year: number, month: number) {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * Apply at date's month value a quantity-based moviment
     *
     * @param date
     * @param numMonths
     * @param lastDate
     * @returns
     */
    public static changeMonth(
        date: Date,
        numMonths: number,
        lastDate?: number
    ) {
        const isPrev = numMonths < 0;
        const numYears = Math.trunc(
            Math.abs(numMonths) / CalendarData.CALENDAR_MONTHS_QTY
        );
        const nMonths = Math.abs(numMonths) % CalendarData.CALENDAR_MONTHS_QTY;

        const newYear = CalendarData.move(date.getFullYear(), numYears, isPrev);
        const newMonth = CalendarData.move(date.getMonth(), nMonths, isPrev);
        const newDate = new Date(newYear, newMonth, 1);
        const daysInMonth = CalendarData.getMonthDays(newYear, newMonth);
        const lastDateNum = lastDate ? lastDate : date.getDate();

        newDate.setDate(Math.min(lastDateNum, daysInMonth));

        return newDate;
    }

    /**
     * Mounts the month days quantities present into a ui calendar month splitting in:
     * - previous month days
     * - current month days
     * - and next month day
     *
     * @param month
     * @param year
     * @returns The days separeted
     */
    protected buildCalendarMonthDaysQty(month: number, year: number) {
        // month days present into a ui calendar month (42 days)
        const calendarMonthDays =
            CalendarData.CALENDAR_WEEKS * CalendarData.CALENDAR_WEEK_DAYS;
        // days present into current month
        const actualMonthDays = CalendarData.getMonthDaysQty(month, year);
        // weekday from first day into current month
        const actualMonthFirstWeekday = this.getMonthFirstDay(month, year);
        // weekday from last day into previous month
        // Since it fluctuates between 0 and 6, it also represents the
        // quantity of previous month days into ui calendar month's first row
        const prevMonthLastWeekday = actualMonthFirstWeekday - 1;
        // It represents the quantity of next month days into
        // ui calendar month's last row
        const nextMonthDays =
            (calendarMonthDays - (prevMonthLastWeekday + actualMonthDays)) %
            CalendarData.CALENDAR_WEEK_DAYS;

        return {
            prevMonthDays: prevMonthLastWeekday,
            actualMonthDays,
            nextMonthDays,
        };
    }

    /**
     * Build the days list on [year, month, day] format
     *
     * @param month
     * @param year
     * @param length
     * @param makeDay
     * @returns The list of month's days' data
     */
    protected buildCalendarMonthDayData(
        month: number,
        year: number,
        length: number,
        makeDay: (index: number) => number
    ) {
        return Array.from<
            {
                length: number;
            },
            [number, string, string]
        >({ length }, (_, index) => {
            const day = makeDay(index);
            return [
                year,
                `${month}`.padStart(2, '0'),
                `${day}`.padStart(2, '0'),
            ];
        });
    }

    /**
     * Create the list of 42 days (7 days in 6 weeks). The gregorian calendar uses this pattern in your calendar months. Each date data is in [number, string, string] format representing [year, month, date]. Will represent the data used to create the dates. After each item will be used to call `new Date('yyyy-MM-ddTHH:mm:ss')`.
     *
     * @param month
     * @param year
     * @returns the month days lists map
     */
    protected buildTrimonthDays(month: number, year: number) {
        const { actualMonthDays, prevMonthDays, nextMonthDays } =
            this.buildCalendarMonthDaysQty(month, year);

        const { month: prevMonth, year: prevMonthYear } = this.getPreviousMonth(
            month,
            year
        );
        const { month: nextMonth, year: nextMonthYear } = this.getNextMonth(
            month,
            year
        );
        const prevMonthQtyDays = CalendarData.getMonthDaysQty(
            prevMonth,
            prevMonthYear
        );
        const prevMonthDates = this.buildCalendarMonthDayData(
            prevMonth,
            prevMonthYear,
            prevMonthDays,
            (index) => {
                return index + 1 + (prevMonthQtyDays - prevMonthDays);
            }
        );
        const currentMonthDates = this.buildCalendarMonthDayData(
            month,
            year,
            actualMonthDays,
            (index) => index + 1
        );
        const nextMonthDates = this.buildCalendarMonthDayData(
            nextMonth,
            nextMonthYear,
            nextMonthDays,
            (index) => index + 1
        );
        return {
            prevMonthDates,
            currentMonthDates,
            nextMonthDates,
        } as const;
    }

    /**
     * Make the list of days splitting by week
     *
     * @param month The month number between [1 - 12]
     * @param year
     * @returns The weeks list
     */
    public getCalendarDays(
        month = this.dateFocused.getMonth() + 1,
        year = this.dateFocused.getFullYear()
    ) {
        const { prevMonthDates, currentMonthDates, nextMonthDates } =
            this.buildTrimonthDays(month, year);

        const items = [
            ...prevMonthDates,
            ...currentMonthDates,
            ...nextMonthDates,
        ];
        const weeks = items.length / CalendarData.CALENDAR_WEEK_DAYS;
        let w = 0;
        return Array.from<{ length: number }, Date[]>({ length: weeks }, () => {
            return Array.from(
                {
                    length: CalendarData.CALENDAR_WEEK_DAYS,
                },
                () => {
                    const data = items[w++];
                    return CalendarData.makeDateDashed(
                        data[0],
                        data[1],
                        data[2]
                    );
                }
            );
        });
    }

    /**
     * Define if the month number is in a February position
     *
     * @param month
     * @returns The conditional
     */
    protected static isFebruary(month: number) {
        return month === 2;
    }

    /**
     * Define if the year number is leap year
     *
     *
     * @param year
     * @returns The conditional
     */
    protected static isLeapYear(year: number) {
        if (year < 0) {
            return false;
        }
        if (year % 4 !== 0) {
            return false;
        }
        if (year % 100 === 0 && year % 400 !== 400) {
            return false;
        }
        return true;
    }

    /**
     * Return the number days in a month for a given year from 28 - 31
     *
     * @param month Between [1 - 12]
     * @param year
     * @returns
     */
    public static getMonthDaysQty(month: number, year: number) {
        if (CalendarData.isFebruary(month)) {
            if (!CalendarData.isLeapYear(year)) {
                return 28;
            }
            return 29;
        }
        if (CalendarData.MONTHS_30.includes(month)) {
            return 30;
        }
        return 31;
    }

    /**
     * Make a date instance using year-month-date parameter
     *
     * @param year
     * @param month
     * @param date
     * @returns The date
     */
    public static makeDateDashed(
        year: number,
        month: number | string,
        date: number | string
    ) {
        const monthInput = `${month}`.padStart(2, '0');
        const dateInput = `${date}`.padStart(2, '0');
        return new Date(`${year}-${monthInput}-${dateInput}T00:00:00`);
    }

    /**
     * Return the weekday of first day of the month for a given year, from 0 - 6
     *
     * 0 => Sunday, 6 => Saturday
     *
     * @param month The value betwen [1, 12]
     * @param year
     * @returns The first day
     */
    protected getMonthFirstDay(month: number, year: number) {
        return CalendarData.makeDateDashed(year, month, 1).getDay() + 1;
    }

    /**
     * Return the previous month/year based on month/year passed
     *
     * @param month
     * @param year
     * @returns The previous month and year
     */
    protected getPreviousMonth(month: number, year: number) {
        const prevMonth = month > 1 ? month - 1 : 12;
        const prevMonthYear = month > 1 ? year : year - 1;
        return { month: prevMonth, year: prevMonthYear };
    }

    /**
     * Return the next month/year based on month/year passed
     *
     * @param month
     * @param year
     * @returns The next month and year
     */
    protected getNextMonth(month: number, year: number) {
        const nextMonth = month < 12 ? month + 1 : 1;
        const nextMonthYear = month < 12 ? year : year + 1;
        return { month: nextMonth, year: nextMonthYear };
    }
}
