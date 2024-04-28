import classNames from 'classnames';
import { useId, useRef, useState } from 'react';
import { CalendarData } from '../../../utils/CalendarData';
import { ArrowIcon } from '../../atoms/ArrowIcon';
import { ArrowsIcon } from '../../atoms/ArrowsIcon';
import { DialogBox as CalendarBox } from '../../atoms/DialogBox';
import { DialogBtn } from '../../atoms/DialogBtn';
import styles from './Calendar.module.scss';
import { AfterMonthBtn } from './components/AfterMonthBtn';
import { AfterYearBtn } from './components/AfterYearBtn';
import { BeforeMonthBtn } from './components/BeforeMonthBtn';
import { BeforeYearBtn } from './components/BeforeYearBtn';
import { Bottom } from './components/Bottom';
import { Footer } from './components/Footer';
import { FooterMsg } from './components/FooterMsg';
import { Header } from './components/Header';
import { HeaderBtns } from './components/HeaderBtns';
import { Heading } from './components/Heading';
import { OkBtn } from './components/OkBtn';
import { TableBody } from './components/TableBody';
import { TableGrid } from './components/TableGrid';
import { TableHead } from './components/TableHead';
import { makeHeaderHandlers } from './lib/handlers/dateMode';
import { makeHideHandlers } from './lib/handlers/makeHide';
import { useMonthYear } from './lib/hooks/useMonthYear';
import { useWeekdays } from './lib/hooks/useWeekdays';

type CalendarProps = {
    locale: string;
    listRows: Date[][];
    calendarData: CalendarData;
    onDateChange?: (date: Date) => void;
    setDateFocused: (date: Date) => void;
    setDateSelected: (date: Date) => void;
    showCalendar: boolean;
    setShowCalendar: (show: boolean) => void;
};

const Calendar = ({
    locale,
    listRows,
    calendarData,
    setDateFocused,
    setDateSelected,
    showCalendar,
    setShowCalendar,
}: CalendarProps) => {
    const headingId = useId();
    const [showMsgFooter, setShowMsgFooter] = useState(false);

    const { before: beforeBtnHandler, after: afterBtnHandler } =
        makeHeaderHandlers(calendarData, setDateFocused);

    const [weekdays] = useWeekdays(locale, calendarData);
    const [monthYear] = useMonthYear(
        calendarData.getMonth('long'),
        calendarData.year
    );

    const { hideCallback, escKeyDownHandler } =
        makeHideHandlers(setShowCalendar);

    const refBeforeYearBtn = useRef<HTMLButtonElement | null>(null);
    const okBtnRef = useRef<HTMLButtonElement | null>(null);
    return (
        <CalendarBox
            className={styles.calendarBox}
            aria-label="Choose Date"
            show={showCalendar}
            onKeyDown={escKeyDownHandler}
            title="calendar"
        >
            <Calendar.Header>
                <Calendar.HeaderBtns>
                    <Calendar.BeforeYearBtn
                        className={styles.headerBtn}
                        ref={refBeforeYearBtn}
                        btnHandler={beforeBtnHandler}
                        okBtnRef={okBtnRef}
                        label="previous year"
                        title="go to previous year"
                    >
                        <ArrowsIcon
                            noEvents
                            className={classNames(
                                styles.arrowIcon,
                                styles.left
                            )}
                        />
                    </Calendar.BeforeYearBtn>
                    <Calendar.BeforeMonthBtn
                        className={styles.headerBtn}
                        btnHandler={beforeBtnHandler}
                        label="previous month"
                        title="go to previous month"
                    >
                        <ArrowIcon
                            noEvents
                            className={classNames(
                                styles.arrowIcon,
                                styles.left
                            )}
                        />
                    </Calendar.BeforeMonthBtn>
                </Calendar.HeaderBtns>
                <Calendar.Heading id={headingId}>{monthYear}</Calendar.Heading>
                <Calendar.HeaderBtns>
                    <Calendar.AfterMonthBtn
                        className={styles.headerBtn}
                        btnHandler={afterBtnHandler}
                        label="next month"
                        title="go to next month"
                    >
                        <ArrowIcon noEvents className={styles.arrowIcon} />
                    </Calendar.AfterMonthBtn>
                    <Calendar.AfterYearBtn
                        className={styles.headerBtn}
                        btnHandler={afterBtnHandler}
                        label="next year"
                        title="go to next year"
                    >
                        <ArrowsIcon noEvents className={styles.arrowIcon} />
                    </Calendar.AfterYearBtn>
                </Calendar.HeaderBtns>
            </Calendar.Header>
            <div className={styles.tableBox}>
                <Calendar.TableGrid
                    aria-labelledby={headingId}
                    onFocus={() => setShowMsgFooter(true)}
                    onBlur={() => setShowMsgFooter(false)}
                >
                    <Calendar.TableHead
                        weekdays={weekdays}
                        cellClassName={styles.cell}
                        title="weekdays"
                    />
                    <Calendar.TableBody
                        listRows={listRows}
                        calendarData={calendarData}
                        hideCallback={hideCallback}
                        setDateFocused={setDateFocused}
                        setDateSelected={setDateSelected}
                        cellClassName={styles.cell}
                    />
                </Calendar.TableGrid>
            </div>
            <Calendar.Bottom>
                <DialogBtn onClick={hideCallback} onKeyDown={escKeyDownHandler}>
                    Cancel
                </DialogBtn>
                <Calendar.OkBtn
                    ref={okBtnRef}
                    beforeYearBtnRef={refBeforeYearBtn}
                    onSelect={() => {
                        setDateSelected(calendarData.getDateFocused());
                        hideCallback();
                        return true;
                    }}
                >
                    Ok
                </Calendar.OkBtn>
            </Calendar.Bottom>
            <Calendar.Footer>
                <Calendar.FooterMsg showMsg={showMsgFooter}>
                    Cursor keys can navigate dates
                </Calendar.FooterMsg>
            </Calendar.Footer>
        </CalendarBox>
    );
};

Calendar.Header = Header;
Calendar.HeaderBtns = HeaderBtns;
Calendar.Heading = Heading;
Calendar.TableGrid = TableGrid;
Calendar.TableHead = TableHead;
Calendar.Footer = Footer;
Calendar.FooterMsg = FooterMsg;
Calendar.BeforeYearBtn = BeforeYearBtn;
Calendar.BeforeMonthBtn = BeforeMonthBtn;
Calendar.AfterMonthBtn = AfterMonthBtn;
Calendar.AfterYearBtn = AfterYearBtn;
Calendar.Bottom = Bottom;
Calendar.OkBtn = OkBtn;
Calendar.TableBody = TableBody;

export { Calendar };
