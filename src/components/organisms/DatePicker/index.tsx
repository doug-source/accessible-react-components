import { useState } from 'react';
import { makeKeydownHandler } from '../../../lib/handlers/keyDown';
import { CalendarIcon } from '../../atoms/CalendarIcon';
import { Calendar } from '../../molecules/Calendar';
import { Box } from './components/Box';
import { Btn } from './components/Btn';
import { DateInput } from './components/DateInput';
import { useCalendarData } from './hooks/useCalendarData';

type DatePickerProps = {
    show: boolean;
    locale: string;
    onDateChange?: (date: Date) => void;
};

const DatePicker = ({ show, locale, onDateChange }: DatePickerProps) => {
    const {
        list: listRows,
        calendarData,
        setDateFocused,
        setDateSelected,
        ariaLabelBtn,
        dataSelectedInput,
    } = useCalendarData(locale, onDateChange);
    const [showCalendar, setShowCalendar] = useState(show);
    return (
        <Box title="date picker">
            <DateInput
                format={calendarData.getDateFormat()}
                value={dataSelectedInput}
            />
            <Btn
                onClick={() => setShowCalendar(true)}
                onKeyDown={makeKeydownHandler([
                    [
                        'Enter',
                        () => {
                            setShowCalendar(true);
                            return true;
                        },
                    ],
                ])}
                aria-label={ariaLabelBtn}
            >
                <CalendarIcon noEvents />
            </Btn>
            <Calendar
                calendarData={calendarData}
                listRows={listRows}
                locale={locale}
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                setDateFocused={setDateFocused}
                setDateSelected={setDateSelected}
            />
        </Box>
    );
};

export { DatePicker };
