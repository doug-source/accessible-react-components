import { renderHook } from '@testing-library/react';
import { CalendarData } from '../../../../../utils/CalendarData';
import { useWeekdays } from './useWeekdays';

describe('useWeekdays hook', () => {
    test('runs correctly', () => {
        const enLocale = 'en-US';
        const calendarData = new CalendarData(enLocale);
        const initialProps = { locale: enLocale, calendarData };
        const hookOutput = renderHook(
            ({ locale, calendarData }) => useWeekdays(locale, calendarData),
            { initialProps }
        );
        const enWeekdays = [
            ['Sun', 'Sunday'],
            ['Mon', 'Monday'],
            ['Tue', 'Tuesday'],
            ['Wed', 'Wednesday'],
            ['Thu', 'Thursday'],
            ['Fri', 'Friday'],
            ['Sat', 'Saturday'],
        ];
        let [weekdays] = hookOutput.result.current;
        expect(weekdays).toMatchObject(enWeekdays);
        const ptLocale = 'pt-BR';
        calendarData.setLocale(ptLocale);
        hookOutput.rerender({ locale: ptLocale, calendarData });
        const ptWeekdays = [
            ['dom', 'domingo'],
            ['seg', 'segunda-feira'],
            ['ter', 'terça-feira'],
            ['qua', 'quarta-feira'],
            ['qui', 'quinta-feira'],
            ['sex', 'sexta-feira'],
            ['sáb', 'sábado'],
        ];
        [weekdays] = hookOutput.result.current;
        expect(weekdays).toMatchObject(ptWeekdays);
    });
});
