import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeyboardEventHandler, useRef } from 'react';
import { CalendarCellService } from '../../../../../../../utils/CalendarCellService';
import { CalendarData } from '../../../../../../../utils/CalendarData';
import { makeCellKeyDown } from './makeCellKeyDown';

const createBtn = (
    onKeyDown: KeyboardEventHandler<HTMLElement>,
    onKeyDownTwo = onKeyDown
) => {
    return (
        <>
            <button data-testid="preBtn" onKeyDown={onKeyDown}>
                One
            </button>
            <button data-testid="posBtn" onKeyDown={onKeyDownTwo}>
                Two
            </button>
        </>
    );
};

const runHook = () => {
    return renderHook(() => {
        return useRef<(HTMLTableCellElement | null)[][]>([]);
    });
};

const detachHook = (ref: ReturnType<typeof runHook>) => ref.result.current;

const calendarData = new CalendarData('en-US');
const cellService = new CalendarCellService(detachHook(runHook()));

describe('makeCellKeyDown handler', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    test('runs returning a function handler correctly', () => {
        const setDateFocused = () => {};
        const setDateSelected = () => {};
        const hideCallback = () => {};
        const handler = makeCellKeyDown(
            calendarData,
            cellService,
            setDateFocused,
            setDateSelected,
            0,
            new Date(),
            hideCallback
        );
        expect(typeof handler).toBe('function');
    });
    test('runs triggering keydown KeyBoard event with Space key correctly', async () => {
        const setDateSelected = jest.fn();
        const date = new Date();
        const handler = makeCellKeyDown(
            calendarData,
            cellService,
            () => {},
            setDateSelected,
            0,
            date,
            () => {}
        );
        render(createBtn(handler));
        const $el = screen.getByTestId('preBtn');
        $el.focus();
        const user = userEvent.setup();
        await user.keyboard(' ');
        expect(setDateSelected).toHaveBeenCalledWith(date);
    });
    test('runs triggering keydown KeyBoard event with Enter key correctly', async () => {
        const setDateFocused = jest.fn();
        const setDateSelected = jest.fn();
        const hideCallback = jest.fn();
        const date = new Date();
        const handler = makeCellKeyDown(
            calendarData,
            cellService,
            setDateFocused,
            setDateSelected,
            0,
            date,
            hideCallback
        );
        render(createBtn(handler));
        const $el = screen.getByTestId('preBtn');
        $el.focus();
        const user = userEvent.setup();
        await user.keyboard('{Enter}');
        expect(setDateSelected).toHaveBeenCalledWith(date);
        expect(setDateFocused).toHaveBeenCalledWith(date);
        expect(hideCallback).toHaveBeenCalled();
    });
    test('runs triggering keydown KeyBoard event with ArrowUp key correctly', async () => {
        const date = new Date('2024-04-08T00:00:00');
        const calendarData = new CalendarData('en-US', date);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = (date: Date) => {
            jestDateFocused();
            calendarData.setDateFocused(date);
        };
        const row = 1;
        const handler = makeCellKeyDown(
            calendarData,
            cellService,
            setDateFocused,
            () => {},
            row,
            date,
            () => {}
        );
        render(createBtn(handler));
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;
        $posBtn.focus();

        const col = 1;
        const anyDate = new Date();
        cellService.insertItem(0, col, $preBtn, anyDate);
        cellService.insertItem(row, col, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{ArrowUp}');
        expect(jestDateFocused).toHaveBeenCalled();
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - 7);
        expect(calendarData.getDateFocused()).toMatchObject(newDate);
        expect($preBtn).toHaveFocus();
    });
    test('runs triggering keydown KeyBoard event with ArrowDown key correctly', async () => {
        const date = new Date('2024-04-01T00:00:00');
        const calendarData = new CalendarData('en-US', date);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = (date: Date) => {
            jestDateFocused();
            calendarData.setDateFocused(date);
        };
        const row = 0;
        const handler = makeCellKeyDown(
            calendarData,
            cellService,
            setDateFocused,
            () => {},
            row,
            date,
            () => {}
        );
        render(createBtn(handler));
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        $preBtn.focus();
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;

        const col = 1;
        const anyDate = new Date();
        cellService.insertItem(row, col, $preBtn, anyDate);
        cellService.insertItem(1, col, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{ArrowDown}');
        expect(jestDateFocused).toHaveBeenCalled();
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + 7);
        expect(calendarData.getDateFocused()).toMatchObject(newDate);
        expect($posBtn).toHaveFocus();
    });
    test('runs triggering keydown KeyBoard event with ArrowRight key correctly', async () => {
        const date = new Date('2024-04-01T00:00:00');
        const calendarData = new CalendarData('en-US', date);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = (date: Date) => {
            jestDateFocused();
            calendarData.setDateFocused(date);
        };
        const row = 0;
        const handler = makeCellKeyDown(
            calendarData,
            cellService,
            setDateFocused,
            () => {},
            row,
            date,
            () => {}
        );
        render(createBtn(handler));
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        $preBtn.focus();
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;

        const anyDate = new Date();
        cellService.insertItem(row, 1, $preBtn, anyDate);
        cellService.insertItem(row, 2, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{ArrowRight}');
        expect(jestDateFocused).toHaveBeenCalled();
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + 1);
        expect(calendarData.getDateFocused()).toMatchObject(newDate);
        expect($posBtn).toHaveFocus();
    });
    test('runs triggering keydown KeyBoard event with ArrowLeft key correctly', async () => {
        const date = new Date('2024-04-02T00:00:00');
        const calendarData = new CalendarData('en-US', date);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = (date: Date) => {
            jestDateFocused();
            calendarData.setDateFocused(date);
        };
        const row = 0;
        const handler = makeCellKeyDown(
            calendarData,
            cellService,
            setDateFocused,
            () => {},
            row,
            date,
            () => {}
        );
        render(createBtn(handler));
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;
        $posBtn.focus();

        const anyDate = new Date();
        cellService.insertItem(row, 1, $preBtn, anyDate);
        cellService.insertItem(row, 2, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{ArrowLeft}');
        expect(jestDateFocused).toHaveBeenCalled();
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - 1);
        expect(calendarData.getDateFocused()).toMatchObject(newDate);
        expect($preBtn).toHaveFocus();
    });
    test("runs triggering keydown KeyBoard event with Home key with complete month's week correctly", async () => {
        const date13 = new Date('2024-04-13T00:00:00');
        const date7 = new Date('2024-04-07T00:00:00');
        const calendarData = new CalendarData('en-US', date13);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = (date: Date) => {
            jestDateFocused();
            calendarData.setDateFocused(date);
        };
        const row = 1;
        render(
            createBtn(
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date7,
                    () => {}
                ),
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date13,
                    () => {}
                )
            )
        );
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;
        $posBtn.focus();

        const anyDate = new Date();
        cellService.insertItem(row, 0, $preBtn, anyDate);
        cellService.insertItem(row, 6, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{Home}');
        expect(jestDateFocused).toHaveBeenCalled();
        const newDate = new Date(date7);
        expect(calendarData.getDateFocused()).toMatchObject(newDate);
        expect($preBtn).toHaveFocus();
    });
    test("runs triggering keydown KeyBoard event with Home key with incomplete month's week correctly", async () => {
        const date4 = new Date('2024-05-04T00:00:00');
        const date1 = new Date('2024-05-01T00:00:00');
        const calendarData = new CalendarData('en-US', date4);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = (date: Date) => {
            jestDateFocused();
            calendarData.setDateFocused(date);
        };
        const row = 0;
        render(
            createBtn(
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date1,
                    () => {}
                ),
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date4,
                    () => {}
                )
            )
        );
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;
        $posBtn.focus();

        const anyDate = new Date();
        cellService.insertItem(row, 3, $preBtn, anyDate);
        cellService.insertItem(row, 6, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{Home}');
        expect(jestDateFocused).toHaveBeenCalled();
        const newDate = new Date(date1);
        expect(calendarData.getDateFocused()).toMatchObject(newDate);
        expect($preBtn).toHaveFocus();
    });
    test("runs triggering keydown KeyBoard event with End key with complete month's week correctly", async () => {
        const date7 = new Date('2024-04-07T00:00:00');
        const date13 = new Date('2024-04-13T00:00:00');
        const calendarData = new CalendarData('en-US', date7);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = (date: Date) => {
            jestDateFocused();
            calendarData.setDateFocused(date);
        };
        const row = 1;
        render(
            createBtn(
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date7,
                    () => {}
                ),
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date13,
                    () => {}
                )
            )
        );
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;
        $preBtn.focus();

        const anyDate = new Date();
        cellService.insertItem(row, 0, $preBtn, anyDate);
        cellService.insertItem(row, 6, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{End}');
        expect(jestDateFocused).toHaveBeenCalled();
        const newDate = new Date(date13);
        expect(calendarData.getDateFocused()).toMatchObject(newDate);
        expect($posBtn).toHaveFocus();
    });
    test("runs triggering keydown KeyBoard event with End key with incomplete month's week correctly", async () => {
        const date28 = new Date('2024-04-28T00:00:00');
        const date30 = new Date('2024-04-30T00:00:00');
        const calendarData = new CalendarData('en-US', date28);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = (date: Date) => {
            jestDateFocused();
            calendarData.setDateFocused(date);
        };
        const row = 4;
        render(
            createBtn(
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date28,
                    () => {}
                ),
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date30,
                    () => {}
                )
            )
        );
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;
        $preBtn.focus();

        const anyDate = new Date();
        cellService.insertItem(row, 0, $preBtn, anyDate);
        cellService.insertItem(row, 2, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{End}');
        expect(jestDateFocused).toHaveBeenCalled();
        const newDate = new Date(date30);
        expect(calendarData.getDateFocused()).toMatchObject(newDate);
        expect($posBtn).toHaveFocus();
    });
    test("runs triggering keydown KeyBoard event with PageUp key with complete previous month's week correctly", async () => {
        const date2_29 = new Date('2024-02-29T00:00:00');
        const date3_29 = new Date('2024-03-29T00:00:00');
        const calendarData = new CalendarData('en-US', date3_29);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = jestDateFocused;
        const row = 1;
        render(
            createBtn(
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date2_29,
                    () => {}
                ),
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date3_29,
                    () => {}
                )
            )
        );
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;
        $posBtn.focus();

        const anyDate = new Date();
        cellService.insertItem(4, 4, $preBtn, anyDate);
        cellService.insertItem(4, 5, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{PageUp}');

        cellService.insertItem(4, 4, $preBtn, date2_29);
        cellService.insertItem(4, 5, $posBtn, date3_29);
        // In this use case, the below line is called asynchronously in the application
        calendarData.setDateFocused(date2_29);
        expect(calendarData.getDateFocused()).toMatchObject(date2_29);
        expect(jestDateFocused).toHaveBeenCalled();
        expect($preBtn).toHaveFocus();
    });
    test("runs triggering keydown KeyBoard event with PageUp key with incomplete previous month's week correctly", async () => {
        const date2_29 = new Date('2024-02-29T00:00:00');
        const date3_31 = new Date('2024-03-31T00:00:00');
        const calendarData = new CalendarData('en-US', date3_31);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = jestDateFocused;
        const preCol = 4;
        const postCol = 5;
        render(
            createBtn(
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    preCol,
                    date2_29,
                    () => {}
                ),
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    postCol,
                    date3_31,
                    () => {}
                )
            )
        );
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;
        $posBtn.focus();

        const anyDate = new Date();
        cellService.insertItem(preCol, 4, $preBtn, anyDate);
        cellService.insertItem(postCol, 0, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{PageUp}');

        cellService.insertItem(preCol, 4, $preBtn, date2_29);
        cellService.insertItem(postCol, 0, $posBtn, date3_31);
        // In this use case, the below line is called asynchronously in the application
        calendarData.setDateFocused(date2_29);
        expect(calendarData.getDateFocused()).toMatchObject(date2_29);
        expect(jestDateFocused).toHaveBeenCalled();
        expect($preBtn).toHaveFocus();
    });
    test("runs triggering keydown KeyBoard event with PageDown key with complete previous month's week correctly", async () => {
        const date1_29 = new Date('2024-01-29T00:00:00');
        const date2_29 = new Date('2024-02-29T00:00:00');
        const calendarData = new CalendarData('en-US', date1_29);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = jestDateFocused;
        const row = 1;
        render(
            createBtn(
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date1_29,
                    () => {}
                ),
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    row,
                    date2_29,
                    () => {}
                )
            )
        );
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;
        $preBtn.focus();

        const anyDate = new Date();
        cellService.insertItem(4, 1, $preBtn, anyDate);
        cellService.insertItem(4, 5, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{PageDown}');

        cellService.insertItem(4, 1, $preBtn, date1_29);
        cellService.insertItem(4, 5, $posBtn, date2_29);
        // In this use case, the below line is called asynchronously in the application
        calendarData.setDateFocused(date2_29);
        expect(calendarData.getDateFocused()).toMatchObject(date2_29);
        expect(jestDateFocused).toHaveBeenCalled();
        expect($posBtn).toHaveFocus();
    });
    test("runs triggering keydown KeyBoard event with PageDown key with incomplete previous month's week correctly", async () => {
        const date1_31 = new Date('2024-01-31T00:00:00');
        const date2_29 = new Date('2024-02-29T00:00:00');
        const calendarData = new CalendarData('en-US', date1_31);
        const cellService = new CalendarCellService(detachHook(runHook()));

        const jestDateFocused = jest.fn();
        const setDateFocused = jestDateFocused;
        const preCol = 4;
        const postCol = 5;
        render(
            createBtn(
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    preCol,
                    date1_31,
                    () => {}
                ),
                makeCellKeyDown(
                    calendarData,
                    cellService,
                    setDateFocused,
                    () => {},
                    postCol,
                    date2_29,
                    () => {}
                )
            )
        );
        const $preBtn = screen.getByTestId(
            'preBtn'
        ) as unknown as HTMLTableCellElement;
        const $posBtn = screen.getByTestId(
            'posBtn'
        ) as unknown as HTMLTableCellElement;
        $preBtn.focus();

        const anyDate = new Date();
        cellService.insertItem(preCol, 4, $preBtn, anyDate);
        cellService.insertItem(postCol, 0, $posBtn, anyDate);

        const user = userEvent.setup();
        await user.keyboard('{PageDown}');

        cellService.insertItem(preCol, 4, $preBtn, date1_31);
        cellService.insertItem(postCol, 0, $posBtn, date2_29);
        // In this use case, the below line is called asynchronously in the application
        calendarData.setDateFocused(date1_31);
        expect(calendarData.getDateFocused()).toMatchObject(date1_31);
        expect(jestDateFocused).toHaveBeenCalled();
        expect($posBtn).toHaveFocus();
    });
});
