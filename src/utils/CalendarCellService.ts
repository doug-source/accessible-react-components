import { MutableRefObject } from 'react';
import { CalendarData } from './CalendarData';

type Item = HTMLTableCellElement | null;
type RefList = MutableRefObject<Item[][]>;

/**
 * Class manager of calendar days' reference cels
 */
export class CalendarCellService {
    private refList: RefList;
    private soonDate: Date | null = null;

    /**
     * Class constructor
     *
     * @param list
     */
    constructor(list: RefList) {
        this.refList = list;
    }

    /**
     * Manage the focus from boundary dates from calendar
     *
     * @param el
     * @param date
     */
    private focusLimitCalendar(el: HTMLTableCellElement | null, date: Date) {
        if (
            el === null ||
            el.tabIndex !== 0 ||
            !this.soonDate ||
            !CalendarData.equalDates(this.soonDate, date)
        ) {
            return;
        }
        el?.focus();
        this.soonDate = null;
    }

    /**
     * Manage the cells storage
     *
     * @param row
     * @param col
     * @param el
     */
    private storeRefList(
        row: number,
        col: number,
        el: HTMLTableCellElement | null
    ) {
        if (!this.refList.current[row]) {
            this.refList.current[row] = [];
        }
        this.refList.current[row][col] = el;
    }

    /**
     * Store the cell and focus it if necessary
     *
     * @param row
     * @param col
     * @param el
     * @param date
     */
    public insertItem(
        row: number,
        col: number,
        el: HTMLTableCellElement | null,
        date: Date
    ) {
        this.storeRefList(row, col, el);
        this.focusLimitCalendar(el, date);
    }

    /**
     * Return the next cell to focus if it's not be first month day. Otherwise, store the date.
     *
     * @param row
     * @param newDate
     * @returns The cell or null
     */
    private getNextFocused(row: number, newDate: Date) {
        const monthDay = newDate.getDate();
        const col = newDate.getDay() % CalendarData.CALENDAR_WEEK_DAYS;
        if (monthDay === 1) {
            this.soonDate = new Date(newDate);
            return null;
        }
        if (col === 0) {
            return this.refList.current?.[row + 1]?.[col];
        }
        return this.refList.current?.[row]?.[col];
    }

    /**
     *
     * Return the previous cell to focus if it's not be last month day. Otherwise, store the date.
     *
     * @param row
     * @param newDate
     * @returns
     */
    private getPreviousFocused(row: number, newDate: Date) {
        const monthDay = newDate.getDate();
        const col = newDate.getDay() % CalendarData.CALENDAR_WEEK_DAYS;

        const lastMonthDay = CalendarData.getMonthDaysQty(
            newDate.getMonth() + 1,
            newDate.getFullYear()
        );
        if (monthDay === lastMonthDay) {
            this.soonDate = new Date(newDate);
            return null;
        }
        if (col === 6) {
            return this.refList.current?.[row - 1]?.[col];
        }

        return this.refList.current?.[row]?.[col];
    }

    /**
     * Focus the previous cell if it's not be first month day.
     *
     * @param row
     * @param newDate
     */
    public focusPrevious(row: number, newDate: Date) {
        const cell = this.getPreviousFocused(row, newDate);
        cell?.focus();
    }

    /**
     * Focus the previous cell if it's not be last month day.
     *
     * @param row
     * @param newDate
     */
    public focusNext(row: number, newDate: Date) {
        const cell = this.getNextFocused(row, newDate);
        cell?.focus();
    }

    /**
     * Return the cell from previous/next to focus if it's inside of current month. Otherwise, store the date.
     *
     * @param row
     * @param newDate
     * @param calendarData
     * @returns The cell or null
     */
    private getWeekFocused(
        row: number,
        newDate: Date,
        calendarData: CalendarData
    ) {
        const { current: refList } = this.refList;
        const col = newDate.getDay() % CalendarData.CALENDAR_WEEK_DAYS;
        if (!calendarData.equalMonthFocused(newDate)) {
            this.soonDate = new Date(newDate);
            return null;
        }
        return refList?.[row]?.[col];
    }

    /**
     * Focus the previous week cell if it's inside of current month.
     *
     * @param row
     * @param newDate
     * @param calendarData
     */
    public focusPreviousWeek(
        row: number,
        newDate: Date,
        calendarData: CalendarData
    ) {
        const cell = this.getWeekFocused(row - 1, newDate, calendarData);
        cell?.focus();
    }

    /**
     * Focus the next week cell if it's inside of current month.
     *
     * @param row
     * @param newDate
     * @param calendarData
     */
    public focusNextWeek(
        row: number,
        newDate: Date,
        calendarData: CalendarData
    ) {
        const cell = this.getWeekFocused(row + 1, newDate, calendarData);
        cell?.focus();
    }
}
