import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeyboardEventHandler, useRef } from 'react';
import { CalendarCellService } from '../../../../../../../utils/CalendarCellService';
import { CalendarData } from '../../../../../../../utils/CalendarData';
import { makeCellKeyDown } from './makeCellKeyDown';

const createBtn = (onKeyDown: KeyboardEventHandler<HTMLElement>) => {
    return (
        <>
            <button data-testid="preBtn" onKeyDown={onKeyDown}>
                One
            </button>
            <button data-testid="posBtn" onKeyDown={onKeyDown}>
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
});
