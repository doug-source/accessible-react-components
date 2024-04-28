import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import { CalendarData } from '../../../../../utils/CalendarData';
import emptyStyles from '../../../../atoms/TableCellEmpty/TableCellEmpty.module.scss';
import cellStyles from '../../Calendar.module.scss';
import tbodyStyles from './TableBody.module.scss';
import { TableBody } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof TableBody>;
type keys =
    | 'listRows'
    | 'calendarData'
    | 'setDateFocused'
    | 'setDateSelected'
    | 'hideCallback';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const makeDate = (day: number, month = 4) => {
    return new Date(
        `2024-${String(month).padStart(2, '0')}-${String(day).padStart(
            2,
            '0'
        )}T00:00:00`
    );
};

const cellsToArray = ($el: HTMLElement) => {
    return Array.from($el.children, ($tr) => {
        return Array.from($tr.children);
    });
};

const buildComponent = ({
    listRows = [],
    calendarData = new CalendarData('en-US', makeDate(15)),
    setDateFocused = () => {},
    setDateSelected = () => {},
    hideCallback = () => {},
    cellClassName = cellStyles.cell,
}: Props = {}) => {
    return (
        <table>
            <TableBody
                listRows={listRows}
                calendarData={calendarData}
                setDateFocused={setDateFocused}
                setDateSelected={setDateSelected}
                hideCallback={hideCallback}
                data-testid="tbodyEl"
                cellClassName={cellClassName}
            />
        </table>
    );
};

describe('<TableBody /> component', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    test('renders correctly', () => {
        render(buildComponent());
        const $tbody = screen.getByTestId('tbodyEl');
        expect($tbody).toBeInTheDocument();
    });
    test("renders tbody's lines correctly", () => {
        const listRows = [
            [makeDate(1), makeDate(2)],
            [makeDate(8), makeDate(9)],
        ];
        render(buildComponent({ listRows }));
        const $tbody = screen.getByTestId('tbodyEl');
        expect($tbody.children).toHaveLength(2);
        expect($tbody.children?.[0].children).toHaveLength(2);
        expect($tbody.children?.[1].children).toHaveLength(2);
        const [[$c_11, $c_12], [$c_21, $c_22]] = cellsToArray($tbody);
        expect($c_11.textContent).toBe('1');
        expect($c_12.textContent).toBe('2');
        expect($c_21.textContent).toBe('8');
        expect($c_22.textContent).toBe('9');
    });
    test('renders 6 rows when listRows property has length equal 5 correctly', () => {
        const listRows = [
            [makeDate(1)],
            [makeDate(8)],
            [makeDate(15)],
            [makeDate(22)],
            [makeDate(29)],
        ];
        render(buildComponent({ listRows }));
        const $tbody = screen.getByTestId('tbodyEl');
        expect($tbody.children).toHaveLength(6);
        expect($tbody.children?.[5]?.children?.[0]).toHaveClass(
            emptyStyles.ghost
        );
    });
    test("renders with cell's click event executing correctly", async () => {
        const calendarData = new CalendarData('en-US', makeDate(15));
        const jestHideCallback = jest.fn();
        const jestSetDateSelected = jest.fn();
        const jestSetDateFocused = jest.fn();
        const firstDate = makeDate(1);
        const listRows = [
            [makeDate(31, 3), firstDate, makeDate(2)],
            [makeDate(7), makeDate(8), makeDate(9)],
        ];
        const { rerender } = render(
            buildComponent({
                listRows,
                hideCallback: jestHideCallback,
                setDateSelected: (date: Date) => {
                    jestSetDateSelected(date);
                    calendarData.setDateSelected(date);
                },
                setDateFocused: (date: Date) => {
                    jestSetDateFocused(date);
                    calendarData.setDateFocused(date);
                },
                calendarData,
            })
        );
        const $tbody = screen.getByTestId('tbodyEl');
        const [
            [$cellOneOne, $cellOneTwo, $cellOneThree],
            [$cellTwoOne, $cellTwoTwo, $cellTwoThree],
        ] = cellsToArray($tbody);
        expect($cellOneOne).toHaveTextContent('');
        expect($cellOneOne).toHaveClass(tbodyStyles.empty);

        const user = userEvent.setup();
        await user.click($cellOneOne);
        expect(jestHideCallback).not.toHaveBeenCalled();
        expect(jestSetDateSelected).not.toHaveBeenCalled();
        expect(jestSetDateFocused).not.toHaveBeenCalled();
        expect($cellOneOne).toHaveAttribute('tabindex', '-1');
        expect($cellOneTwo).toHaveAttribute('tabindex', '-1');
        expect($cellOneThree).toHaveAttribute('tabindex', '-1');
        expect($cellTwoOne).toHaveAttribute('tabindex', '-1');
        expect($cellTwoTwo).toHaveAttribute('tabindex', '-1');
        expect($cellTwoThree).toHaveAttribute('tabindex', '-1');

        expect($cellOneOne).not.toHaveAttribute('aria-selected');
        expect($cellOneTwo).not.toHaveAttribute('aria-selected');
        expect($cellOneThree).not.toHaveAttribute('aria-selected');
        expect($cellTwoOne).not.toHaveAttribute('aria-selected');
        expect($cellTwoTwo).not.toHaveAttribute('aria-selected');
        expect($cellTwoThree).not.toHaveAttribute('aria-selected');

        await user.click($cellOneTwo);
        rerender(
            buildComponent({
                listRows,
                hideCallback: jestHideCallback,
                setDateSelected: (date: Date) => {
                    jestSetDateSelected(date);
                    calendarData.setDateSelected(date);
                },
                setDateFocused: (date: Date) => {
                    jestSetDateFocused(date);
                    calendarData.setDateFocused(date);
                },
                calendarData,
            })
        );
        expect($cellOneOne).toHaveAttribute('tabindex', '-1');
        expect($cellOneTwo).toHaveAttribute('tabindex', '0');
        expect($cellOneThree).toHaveAttribute('tabindex', '-1');
        expect($cellTwoOne).toHaveAttribute('tabindex', '-1');
        expect($cellTwoTwo).toHaveAttribute('tabindex', '-1');
        expect($cellTwoThree).toHaveAttribute('tabindex', '-1');

        expect($cellOneOne).not.toHaveAttribute('aria-selected');
        expect($cellOneTwo).toHaveAttribute('aria-selected', 'true');
        expect($cellOneThree).not.toHaveAttribute('aria-selected');
        expect($cellTwoOne).not.toHaveAttribute('aria-selected');
        expect($cellTwoTwo).not.toHaveAttribute('aria-selected');
        expect($cellTwoThree).not.toHaveAttribute('aria-selected');

        expect(jestHideCallback).toHaveBeenCalled();
        expect(jestSetDateSelected).toHaveBeenCalledWith(firstDate);
        expect(jestSetDateFocused).toHaveBeenCalledWith(firstDate);
    });
});
