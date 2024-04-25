import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { CalendarData } from '../../../../../utils/CalendarData';
import { useCalendarData } from './useCalendarData';

const runHook = () => {
    return renderHook(({ locale }) => useCalendarData(locale), {
        initialProps: {
            locale: 'en-US',
        },
    });
};

describe('useCalendarData hook', () => {
    test('runs correctly', () => {
        const { result } = runHook();
        expect(result.current.calendarData).toBeDefined();
        expect(Array.isArray(result.current.list)).toBe(true);
        expect(typeof result.current.setDateFocused).toBe('function');
        expect(result.current.calendarData.getLocale()).toBe('en-US');
    });
    test('changes the dateSelected dependencies', () => {
        const { result } = runHook();
        const lastDate = result.current.calendarData.getDateFocused();
        const {
            list: [[firstDateOld]],
        } = result.current;
        act(() =>
            result.current.setDateFocused(
                CalendarData.makeDateDashed(
                    lastDate.getFullYear() + 1,
                    lastDate.getMonth() + 2,
                    lastDate.getDate() + 1
                )
            )
        );
        const newDate = result.current.calendarData.getDateFocused();
        const {
            list: [[firstDateNew]],
        } = result.current;
        expect(newDate.getFullYear()).not.toBe(lastDate.getFullYear());
        expect(newDate.getMonth()).not.toBe(lastDate.getMonth());
        expect(newDate.getDate()).not.toBe(lastDate.getDate());
        expect(firstDateOld.getTime()).not.toBe(firstDateNew.getTime());
    });
});
