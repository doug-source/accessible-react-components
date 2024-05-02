import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import { CalendarData } from '../../../utils/CalendarData';
import styles from './Calendar.module.scss';
import { Calendar } from './index';

const makeDate = (day: number, month = 4) => {
    return new Date(
        `2024-${String(month).padStart(2, '0')}-${String(day).padStart(
            2,
            '0'
        )}T00:00:00`
    );
};

type ElementProps = ComponentPropsWithoutRef<typeof Calendar>;
type keys =
    | 'locale'
    | 'listRows'
    | 'calendarData'
    | 'setDateFocused'
    | 'setDateSelected'
    | 'showCalendar'
    | 'setShowCalendar';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    locale = 'en-US',
    listRows = [],
    calendarData = new CalendarData(locale, makeDate(15)),
    setDateFocused = () => {},
    setDateSelected = () => {},
    showCalendar = false,
    setShowCalendar = () => {},
}: Props = {}) => {
    return (
        <Calendar
            locale={locale}
            listRows={listRows}
            calendarData={calendarData}
            setDateFocused={setDateFocused}
            setDateSelected={setDateSelected}
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
        />
    );
};

describe('<Calendar /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTitle('calendar');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.calendarBox);
    });
    test("renders the calendar's HTMLElement children correctly", () => {
        render(buildComponent());
        const $el = screen.getByTitle('calendar');
        const [$header, $grid, $bottom, $footer] = Array.from($el.children);
        expect($header).toBeInTheDocument();
        expect($grid).toBeInTheDocument();
        expect($bottom).toBeInTheDocument();
        expect($footer).toBeInTheDocument();
    });
    test("renders the calendar's header's HTMLElement children correctly", () => {
        render(buildComponent());
        const $el = screen.getByTitle('calendar');
        const [[$firstHeaderBtns, $heading, $secondHeaderBtns]] = Array.from(
            $el.children,
            ($el) => Array.from($el.children)
        );
        expect($firstHeaderBtns).toBeInTheDocument();
        const [$beforeYearBtn, $beforeMonthBtn] = Array.from(
            $firstHeaderBtns.children
        );
        expect($beforeYearBtn).toBeInTheDocument();
        expect($beforeYearBtn).toHaveAttribute('title', 'go to previous year');
        expect($beforeMonthBtn).toBeInTheDocument();
        expect($beforeMonthBtn).toHaveAttribute(
            'title',
            'go to previous month'
        );
        expect($heading).toBeInTheDocument();
        expect($secondHeaderBtns).toBeInTheDocument();
        const [$afterMonthBtn, $afterYearBtn] = Array.from(
            $secondHeaderBtns.children
        );
        expect($afterMonthBtn).toBeInTheDocument();
        expect($afterMonthBtn).toHaveAttribute('title', 'go to next month');
        expect($afterYearBtn).toBeInTheDocument();
        expect($afterYearBtn).toHaveAttribute('title', 'go to next year');
    });
    test("renders the calendar's tableBox's HTMLElement children correctly", () => {
        render(buildComponent());
        const $el = screen.getByTitle('calendar');
        const [, $grid] = Array.from(
            $el.children,
            ($child) => $child as unknown as HTMLElement
        );
        expect($grid.children).toHaveLength(1);
        const $child = within($grid).getByRole('grid');
        expect(within($grid).getByRole('grid')).toBeInTheDocument();
        expect($grid.children?.[0] === $child).toBe(true);
        const [$thead, $tbody] = Array.from($child.children);
        expect($thead).toBeInTheDocument();
        expect($thead).toHaveAttribute('title', 'weekdays');
        expect($tbody).toBeInTheDocument();
    });
    test("renders the calendar's Bottom's HTMLElement children correctly", async () => {
        const setShowCalendar = jest.fn();
        const setDateSelected = jest.fn();
        render(buildComponent({ setShowCalendar, setDateSelected }));
        const $cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        const $okBtn = screen.getByRole('button', { name: 'Ok' });
        expect($cancelBtn).toBeInTheDocument();
        expect($cancelBtn).toHaveTextContent('Cancel');
        expect($okBtn).toBeInTheDocument();
        expect($okBtn).toHaveTextContent('Ok');
        $okBtn.focus();
        const user = userEvent.setup();
        await user.keyboard('{Enter}');
        expect(setShowCalendar).toHaveBeenCalledWith(false);
        expect(setDateSelected).toHaveBeenCalled();
    });
    test("renders the calendar's Footer's HTMLElement children correctly", () => {
        render(buildComponent());
        const $el = screen.getByTitle('calendar');
        const [, , , [$footerMsg]] = Array.from($el.children, ($el) =>
            Array.from($el.children)
        );
        expect($footerMsg).toBeInTheDocument();
        expect($footerMsg).toHaveTextContent('');
    });
});
