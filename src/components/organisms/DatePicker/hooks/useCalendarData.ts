import { useState } from 'react';
import { useCalendarDays } from './useCalendarDays';

export const useCalendarData = (
    locale: string,
    onDateChange?: (date: Date) => void
) => {
    const [dateFocused, setDateFocused] = useState(new Date());
    const [dateSelected, setDateSelected] = useState(new Date(0, 0, 1));
    const {
        monthDays: list,
        calendarData,
        ariaLabelBtn,
        dataSelectedInput,
    } = useCalendarDays(locale, dateFocused, dateSelected, onDateChange);

    return {
        list,
        calendarData,
        setDateFocused,
        setDateSelected,
        ariaLabelBtn,
        dataSelectedInput,
    };
};
