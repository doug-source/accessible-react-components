import { useEffect, useState } from 'react';
import { firstUpperCase } from '../../../../../lib';

export const useMonthYear = (monthValue: string, yearValue: number) => {
    const [monthYear, setMonthYear] = useState(
        `${firstUpperCase(monthValue)} ${yearValue}`
    );
    useEffect(() => {
        setMonthYear(`${firstUpperCase(monthValue)} ${yearValue}`);
    }, [monthValue, yearValue]);

    return [monthYear];
};
