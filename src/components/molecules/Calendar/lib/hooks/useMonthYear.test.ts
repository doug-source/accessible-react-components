import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useMonthYear } from './useMonthYear';

describe('useMonthYear hook', () => {
    test('runs correctly', () => {
        const initialProps = { monthValue: 'january', yearValue: 2024 };
        const { result, rerender } = renderHook(
            ({ monthValue, yearValue }) => useMonthYear(monthValue, yearValue),
            { initialProps }
        );
        expect(result.current[0]).toBe('January 2024');
        rerender({ monthValue: 'march', yearValue: 2027 });
        expect(result.current[0]).toBe('March 2027');
    });
});
