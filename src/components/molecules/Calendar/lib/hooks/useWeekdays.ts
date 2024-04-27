import { useEffect, useState } from 'react';
import { CalendarData } from '../../../../../utils/CalendarData';

const buildWeekDays = (calendarData: CalendarData) => {
    const shorts = calendarData.getWeekNames('short');
    return calendarData
        .getWeekNames('long')
        .map((long, i) => [shorts[i], long] as const);
};

export const useWeekdays = (locale: string, calendarData: CalendarData) => {
    const [weekdays, setWeekdays] = useState(buildWeekDays(calendarData));

    useEffect(() => {
        if (locale !== calendarData.getLocale()) {
            return;
        }
        setWeekdays(buildWeekDays(calendarData));
    }, [locale, calendarData]);
    return [weekdays];
};
