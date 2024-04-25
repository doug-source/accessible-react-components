import { CalendarData } from '../../../../../utils/CalendarData';

export const makeDateMoveHandler = (
    calendarData: CalendarData,
    setDateSelected: (value: Date) => void,
    monthQty: number
) => {
    return () => {
        setDateSelected(
            CalendarData.changeMonth(
                calendarData.getDateFocused(),
                monthQty,
                calendarData.lastDateNum
            )
        );
        return true;
    };
};

type HeaderHandlerParams = Parameters<typeof makeDateMoveHandler>;

export const makeHeaderHandlers = (
    calendarData: HeaderHandlerParams[0],
    setDateSelected: HeaderHandlerParams[1]
) => {
    return {
        before: {
            year: makeDateMoveHandler(calendarData, setDateSelected, -12),
            month: makeDateMoveHandler(calendarData, setDateSelected, -1),
        },
        after: {
            year: makeDateMoveHandler(calendarData, setDateSelected, 12),
            month: makeDateMoveHandler(calendarData, setDateSelected, 1),
        },
    };
};
