import { renderHook, waitFor } from '@testing-library/react';
import { CalendarData } from '../../../../../../../utils/CalendarData';
import { useTableRowRef } from './useTableCellRefList';

type List = Date[][];

const runHook = (list: List = []) => {
    const initialProps: { list: List } = { list };
    return renderHook(({ list }) => useTableRowRef(list), { initialProps });
};

describe('useTableRowRef hook', () => {
    test('runs from empty list correctly', () => {
        const { result, rerender } = runHook();
        expect(result.current.current).toHaveLength(0);
        const listOne = [
            [
                CalendarData.makeDateDashed(2024, 1, 4),
                CalendarData.makeDateDashed(2024, 1, 5),
            ],
            [
                CalendarData.makeDateDashed(2024, 1, 6),
                CalendarData.makeDateDashed(2024, 1, 7),
            ],
        ];
        rerender({ list: listOne });
        waitFor(() => {
            expect(result.current.current).toHaveLength(2);
            expect(result.current.current[0]).toHaveLength(2);
            expect(result.current.current[1]).toHaveLength(2);
            expect(result.current.current[0][0]).toBe(listOne[0][0]);
            expect(result.current.current[0][1]).toBe(listOne[0][1]);
            expect(result.current.current[1][0]).toBe(listOne[1][0]);
            expect(result.current.current[1][1]).toBe(listOne[1][1]);
        });
    });
    test('runs from no empty list correctly', () => {
        const listOne = [
            [
                CalendarData.makeDateDashed(2024, 1, 4),
                CalendarData.makeDateDashed(2024, 1, 5),
            ],
            [
                CalendarData.makeDateDashed(2024, 1, 6),
                CalendarData.makeDateDashed(2024, 1, 7),
            ],
        ];
        const { result, rerender } = runHook(listOne);
        waitFor(() => {
            const listOneSize = 2;
            expect(result.current.current).toHaveLength(listOneSize);
            for (let i = 0; i < listOneSize; i++) {
                const subListOneSize = 2;
                expect(result.current.current[i]).toHaveLength(subListOneSize);
                for (let j = 0; j < subListOneSize; j++) {
                    expect(result.current.current[i][j]).toBe(listOne[i][j]);
                }
            }
        });
        const listTwo = [
            [
                CalendarData.makeDateDashed(2024, 1, 1),
                CalendarData.makeDateDashed(2024, 1, 2),
                CalendarData.makeDateDashed(2024, 1, 3),
            ],
        ];
        rerender({ list: listTwo });
        waitFor(() => {
            expect(result.current.current).toHaveLength(1);
            expect(result.current.current[0]).toHaveLength(3);
            expect(result.current.current[0][0]).toBe(listTwo[0][0]);
            expect(result.current.current[0][1]).toBe(listTwo[0][1]);
            expect(result.current.current[0][2]).toBe(listTwo[0][2]);
        });
        const listThree: Date[][] = [];
        rerender({ list: listThree });
        waitFor(() => {
            expect(result.current.current).toHaveLength(0);
        });
        const listFour: Date[][] = [
            [
                CalendarData.makeDateDashed(2024, 1, 1),
                CalendarData.makeDateDashed(2024, 1, 2),
                CalendarData.makeDateDashed(2024, 1, 3),
            ],
            [],
        ];
        rerender({ list: listFour });
        waitFor(() => {
            expect(result.current.current).toHaveLength(2);
            expect(result.current.current[0]).toHaveLength(3);
            expect(result.current.current[1]).toHaveLength(0);
        });
    });
});
