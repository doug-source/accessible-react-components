import { useEffect, useState } from 'react';
import { CalendarData } from '../../../../../utils/CalendarData';

export const useCalendarDays = (
    locale: string,
    dateFocused: Date,
    dateSelected: Date,
    onDateChange?: (date: Date) => void
) => {
    const [calendarData] = useState(new CalendarData(locale, dateFocused));

    const [ariaLabelBtn, setAriaLabelBtn] = useState('Choose Date');
    const [dataSelectedInput, setDataSelectedInput] = useState('');
    useEffect(() => {
        calendarData.setDateSelected(dateSelected);
        onDateChange && onDateChange(dateSelected);
        setAriaLabelBtn(
            dateSelected.getFullYear() === 1900
                ? 'Choose Date'
                : `Change Date, ${calendarData.getDateSelectedComplete()}`
        );
        setDataSelectedInput(
            dateSelected.getFullYear() === 1900
                ? ''
                : calendarData.getInputDateSelected()
        );
    }, [calendarData, dateSelected, onDateChange]);

    const [monthDays, setMonthDays] = useState<Date[][]>([]);
    useEffect(() => {
        setMonthDays(
            calendarData.getCalendarDays(
                dateFocused.getMonth() + 1,
                dateFocused.getFullYear()
            )
        );
        calendarData.setDateFocused(dateFocused);
    }, [calendarData, dateFocused]);

    return {
        monthDays,
        calendarData,
        ariaLabelBtn,
        dataSelectedInput,
    } as const;
};
