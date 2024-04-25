import classNames from 'classnames';
import { useId, useRef, useState } from 'react';
import { firstUpperCase } from '../../../lib';
import { CalendarCellService } from '../../../utils/CalendarCellService';
import { ArrowIcon } from '../../atoms/ArrowIcon';
import { ArrowsIcon } from '../../atoms/ArrowsIcon';
import { BtnDefault } from '../../atoms/BtnDefault';
import { CalendarIcon } from '../../atoms/CalendarIcon';
import { DatePickerBtn } from '../../atoms/DatePickerBtn';
import { DialogBox as CalendarBox } from '../../atoms/DialogBox';
import { DialogBtn } from '../../atoms/DialogBtn';
import { CalendarCell } from '../CalendarCell';
import { CalendarEmptyCell } from '../CalendarEmptyCell';
import { CalendarFooter } from '../CalendarFooter';
import { CalendarFooterMsg } from '../CalendarFooterMsg';
import { CalendarHeader } from '../CalendarHeader';
import { CalendarHeaderBtns } from '../CalendarHeaderBtns';
import { CalendarHeading } from '../CalendarHeading';
import { CalendarRow } from '../CalendarRow';
import { CalendarTable } from '../CalendarTable';
import { CalendarTableBox } from '../CalendarTableBox';
import { CalendarTableSection } from '../CalendarTableSection';
import { DatePickerBox } from '../DatePickerBox';
import { DatePickerInput } from '../DatePickerInput';
import { DialogBottom } from '../DialogBottom';
import styles from './DatePicker.module.scss';
import { ariaSelectedCell, extractDateContent, tabIndexCell } from './lib';
import { makeHeaderHandlers } from './lib/handlers/dateMode';
import { makeKeydownHandler } from './lib/handlers/keyDown';
import { makeKeyShiftFocusHandler } from './lib/handlers/keyShiftFocus';
import { useCalendarData } from './lib/hooks/useCalendarData';
import { useMsgBottom } from './lib/hooks/useMsgBottom';
import { useTableRowRef } from './lib/hooks/useTableCellRefList';

type DatePickerProps = {
    className?: string;
    locale?: string;
    onDateChange?: (date: Date) => void;
    show?: boolean;
};

export const DatePicker = ({
    className,
    // locale = 'pt-BR',
    locale = 'en-US',
    show = false,
    onDateChange,
}: DatePickerProps) => {
    const headingId = useId();
    const [showCalendar, setShowCalendar] = useState(show);
    const [showMsgFooter, setShowMsgFooter] = useState(false);
    const [bottomMsg] = useMsgBottom(
        'Cursor keys can navigate dates',
        showMsgFooter
    );
    const {
        list: listRows,
        calendarData,
        setDateFocused,
        setDateSelected,
        ariaLabelBtn,
        dataSelectedInput,
    } = useCalendarData(locale, onDateChange);

    const [cellService] = useState(
        new CalendarCellService(useTableRowRef(listRows))
    );

    const { before: beforeBtnHandler, after: afterBtnHandler } =
        makeHeaderHandlers(calendarData, setDateFocused);

    const showCallback = () => {
        setShowCalendar(true);
        return true;
    };
    const hideCallback = () => {
        setShowCalendar(false);
        return true;
    };
    const keyDownHandler = makeKeydownHandler([
        ['Esc', () => hideCallback()],
        ['Escape', () => hideCallback()],
    ]);
    const refBeforeYearBtn = useRef<HTMLButtonElement | null>(null);
    const refOkBtn = useRef<HTMLButtonElement | null>(null);

    return (
        <DatePickerBox className={classNames(className, styles.datePicker)}>
            <DatePickerInput
                format={calendarData.getDateFormat()}
                value={dataSelectedInput}
            />
            <DatePickerBtn
                onClick={showCallback}
                onKeyDown={makeKeydownHandler([['Enter', showCallback]])}
                aria-label={ariaLabelBtn}
            >
                <CalendarIcon noEvents />
            </DatePickerBtn>
            <CalendarBox
                className={styles.calendarBox}
                aria-label="Choose Date"
                show={showCalendar}
                onKeyDown={keyDownHandler}
            >
                <CalendarHeader>
                    <CalendarHeaderBtns>
                        <BtnDefault
                            ref={refBeforeYearBtn}
                            className={styles.headerBtn}
                            onClick={beforeBtnHandler.year}
                            onKeyDown={makeKeydownHandler([
                                ['Enter', beforeBtnHandler.year],
                                [
                                    'Tab',
                                    makeKeyShiftFocusHandler(refOkBtn, true),
                                ],
                            ])}
                        >
                            <ArrowsIcon
                                noEvents
                                className={classNames(
                                    styles.arrowIcon,
                                    styles.left
                                )}
                            />
                        </BtnDefault>
                        <BtnDefault
                            className={styles.headerBtn}
                            onClick={beforeBtnHandler.month}
                            onKeyDown={makeKeydownHandler([
                                ['Enter', beforeBtnHandler.month],
                            ])}
                        >
                            <ArrowIcon
                                noEvents
                                className={classNames(
                                    styles.arrowIcon,
                                    styles.left
                                )}
                            />
                        </BtnDefault>
                    </CalendarHeaderBtns>
                    <CalendarHeading id={headingId} aria-live="polite">
                        {`${firstUpperCase(calendarData.getMonth('long'))} ${
                            calendarData.year
                        }`}
                    </CalendarHeading>
                    <CalendarHeaderBtns>
                        <BtnDefault
                            className={styles.headerBtn}
                            onClick={afterBtnHandler.month}
                            onKeyDown={makeKeydownHandler([
                                ['Enter', afterBtnHandler.month],
                            ])}
                        >
                            <ArrowIcon noEvents className={styles.arrowIcon} />
                        </BtnDefault>
                        <BtnDefault
                            className={styles.headerBtn}
                            onClick={afterBtnHandler.year}
                            onKeyDown={makeKeydownHandler([
                                ['Enter', afterBtnHandler.year],
                            ])}
                        >
                            <ArrowsIcon noEvents className={styles.arrowIcon} />
                        </BtnDefault>
                    </CalendarHeaderBtns>
                </CalendarHeader>
                <CalendarTableBox>
                    <CalendarTable
                        aria-labelledby={headingId}
                        onFocus={() => setShowMsgFooter(true)}
                        onBlur={() => setShowMsgFooter(false)}
                    >
                        <CalendarTableSection type="thead">
                            <CalendarRow show>
                                {calendarData
                                    .getWeekNames('short')
                                    .map((name, i) => (
                                        <CalendarCell
                                            key={name}
                                            type="th"
                                            className={styles.weekday}
                                            abbr={firstUpperCase(
                                                calendarData.getWeekNames(
                                                    'long'
                                                )[i]
                                            )}
                                            scope="col"
                                        >
                                            {name}
                                        </CalendarCell>
                                    ))}
                            </CalendarRow>
                        </CalendarTableSection>
                        <CalendarTableSection type="tbody">
                            {listRows?.map((cols, i) => (
                                <CalendarRow show key={i}>
                                    {cols.map((date, j) => (
                                        <CalendarCell
                                            ref={(el) =>
                                                cellService.insertItem(
                                                    i,
                                                    j,
                                                    el,
                                                    date
                                                )
                                            }
                                            type="td"
                                            key={date.getDate()}
                                            className={classNames(
                                                styles.day,
                                                !calendarData.equalMonthFocused(
                                                    date
                                                ) && styles.empty
                                            )}
                                            tabIndex={tabIndexCell(
                                                date,
                                                calendarData
                                            )}
                                            aria-selected={ariaSelectedCell(
                                                date,
                                                calendarData
                                            )}
                                            onClick={() => {
                                                if (
                                                    !calendarData.equalMonthFocused(
                                                        date
                                                    )
                                                ) {
                                                    return;
                                                }
                                                hideCallback();
                                                setDateSelected(date);
                                                setDateFocused(date);
                                            }}
                                            onKeyDown={makeKeydownHandler([
                                                [
                                                    'ArrowRight',
                                                    () => {
                                                        const date =
                                                            calendarData.getDateFocused();
                                                        date.setDate(
                                                            date.getDate() + 1
                                                        );
                                                        setDateFocused(date);
                                                        cellService.focusNext(
                                                            i,
                                                            date
                                                        );
                                                        return true;
                                                    },
                                                ],
                                                [
                                                    'ArrowLeft',
                                                    () => {
                                                        const date =
                                                            calendarData.getDateFocused();
                                                        date.setDate(
                                                            date.getDate() - 1
                                                        );
                                                        setDateFocused(date);
                                                        cellService.focusPrevious(
                                                            i,
                                                            date
                                                        );
                                                        return true;
                                                    },
                                                ],
                                                [
                                                    'ArrowUp',
                                                    () => {
                                                        const date =
                                                            calendarData.getDateFocused();
                                                        date.setDate(
                                                            date.getDate() - 7
                                                        );
                                                        setDateFocused(date);
                                                        cellService.focusPreviousWeek(
                                                            i,
                                                            date,
                                                            calendarData
                                                        );
                                                        return true;
                                                    },
                                                ],
                                                [
                                                    'ArrowDown',
                                                    () => {
                                                        const date =
                                                            calendarData.getDateFocused();
                                                        date.setDate(
                                                            date.getDate() + 7
                                                        );
                                                        setDateFocused(date);
                                                        cellService.focusNextWeek(
                                                            i,
                                                            date,
                                                            calendarData
                                                        );
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
                                            ])}
                                        >
                                            {extractDateContent(
                                                date,
                                                calendarData
                                            )}
                                        </CalendarCell>
                                    ))}
                                </CalendarRow>
                            ))}
                            <CalendarRow show={listRows?.length === 5}>
                                <CalendarEmptyCell
                                    type="td"
                                    className={styles.day}
                                >
                                    &nbsp;
                                </CalendarEmptyCell>
                            </CalendarRow>
                        </CalendarTableSection>
                    </CalendarTable>
                    <DialogBottom>
                        <DialogBtn
                            onClick={hideCallback}
                            onKeyDown={keyDownHandler}
                        >
                            Cancel
                        </DialogBtn>
                        <DialogBtn
                            ref={refOkBtn}
                            onKeyDown={makeKeydownHandler([
                                [
                                    'Tab',
                                    makeKeyShiftFocusHandler(refBeforeYearBtn),
                                ],
                                [
                                    'Enter',
                                    () => {
                                        const date =
                                            calendarData.getDateFocused();
                                        setDateSelected(date);
                                        setDateFocused(date);
                                        hideCallback();
                                        return true;
                                    },
                                ],
                            ])}
                        >
                            OK
                        </DialogBtn>
                    </DialogBottom>
                </CalendarTableBox>
                <CalendarFooter>
                    <CalendarFooterMsg>{bottomMsg}</CalendarFooterMsg>
                </CalendarFooter>
            </CalendarBox>
        </DatePickerBox>
    );
};
