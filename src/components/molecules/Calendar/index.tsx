import classNames from 'classnames';
import { useId, useRef, useState } from 'react';
import { CalendarData } from '../../../utils/CalendarData';
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
            <Header>
                <HeaderBtns>
                    <BeforeYearBtn
                        className={styles.headerBtn}
                        ref={refBeforeYearBtn}
                        btnHandler={beforeBtnHandler}
                        okBtnRef={okBtnRef}
                        label="previous year"
                        title="go to previous year"
                    >
                        <span
                            className={classNames(
                                styles.icon,
                                styles.iconBeforeDouble
                            )}
                        ></span>
                        <span
                            className={classNames(
                                styles.icon,
                                styles.iconBeforeDouble,
                                styles.back
                            )}
                        ></span>
                    </BeforeYearBtn>
                    <BeforeMonthBtn
                        className={styles.headerBtn}
                        btnHandler={beforeBtnHandler}
                        label="previous month"
                        title="go to previous month"
                    >
                        <span className={styles.icon}></span>
                    </BeforeMonthBtn>
                </HeaderBtns>
                <Heading id={headingId}>{monthYear}</Heading>
                <HeaderBtns>
                    <AfterMonthBtn
                        className={styles.headerBtn}
                        btnHandler={afterBtnHandler}
                        label="next month"
                        title="go to next month"
                    >
                        <span
                            className={classNames(
                                styles.icon,
                                styles.iconAfterSingle
                            )}
                        ></span>
                    </AfterMonthBtn>
                    <AfterYearBtn
                        className={styles.headerBtn}
                        btnHandler={afterBtnHandler}
                        label="next year"
                        title="go to next year"
                    >
                        <span
                            className={classNames(
                                styles.icon,
                                styles.iconAfterDouble
                            )}
                        ></span>
                        <span
                            className={classNames(
                                styles.icon,
                                styles.iconAfterDouble,
                                styles.back
                            )}
                        ></span>
                    </AfterYearBtn>
                </HeaderBtns>
            </Header>
            <div className={styles.tableBox}>
                <TableGrid
                    aria-labelledby={headingId}
                    onFocus={() => setShowMsgFooter(true)}
                    onBlur={() => setShowMsgFooter(false)}
                >
                    <TableHead
                        weekdays={weekdays}
                        cellClassName={styles.cell}
                        title="weekdays"
                    />
                    <TableBody
                        listRows={listRows}
                        calendarData={calendarData}
                        hideCallback={hideCallback}
                        setDateFocused={setDateFocused}
                        setDateSelected={setDateSelected}
                        cellClassName={styles.cell}
                    />
                </TableGrid>
            </div>
            <Bottom>
                <DialogBtn onClick={hideCallback} onKeyDown={escKeyDownHandler}>
                    Cancel
                </DialogBtn>
                <OkBtn
                    ref={okBtnRef}
                    beforeYearBtnRef={refBeforeYearBtn}
                    onSelect={() => {
                        setDateSelected(calendarData.getDateFocused());
                        hideCallback();
                        return true;
                    }}
                >
                    Ok
                </OkBtn>
            </Bottom>
            <Footer>
                <FooterMsg showMsg={showMsgFooter}>
                    Cursor keys can navigate dates
                </FooterMsg>
            </Footer>
        </CalendarBox>
    );
};

export { Calendar };
