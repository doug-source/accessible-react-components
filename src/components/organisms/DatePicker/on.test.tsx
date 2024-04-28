import '@testing-library/jest-dom';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import dialogBoxStyle from '../../atoms/DialogBox/DialogBox.module.scss';
import { DatePicker } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof DatePicker>;
type keys = 'show' | 'locale' | 'onDateChange';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    show = false,
    locale = 'en-US',
    onDateChange = () => {},
}: Props = {}) => {
    return (
        <DatePicker show={show} locale={locale} onDateChange={onDateChange} />
    );
};

describe('<DatePicker /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTitle('date picker');
        expect($el).toBeInTheDocument();
    });
    test('renders all children correctly', () => {
        render(buildComponent());
        const $el = screen.getByTitle('date picker');
        const [$label, $btn, $calendar] = Array.from($el.children);
        expect($label).toBeInTheDocument();
        expect($btn).toBeInTheDocument();
        expect($calendar).toBeInTheDocument();
    });
    test("renders the dateInput's button details correctly", async () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByTitle('date picker');
        const $btn = within($el).getByRole('button', { name: 'Choose Date' });
        expect($btn).toHaveAttribute('aria-label', 'Choose Date');
        const user = userEvent.setup();
        await user.click($btn);
        await user.keyboard('{Tab>5/}');
        await user.keyboard('{Enter}');
        const engReg = /^Change\sDate,\s\w+,\s\w+\s\d{1,2},\s\d{4}$/;
        expect($btn.getAttribute('aria-label')).toEqual(
            expect.stringMatching(engReg)
        );
        rerender(buildComponent({ locale: 'pt-BR' }));
        await user.click($btn);
        await user.keyboard('{Tab>5/}{ArrowLeft}');
        await user.keyboard('{Enter}');
        const ptReg = /^Change\sDate,\s.+,\s\d{1,2}\sde\s.+\sde\s\d{4}$/;
        expect($btn.getAttribute('aria-label')).toEqual(
            expect.stringMatching(ptReg)
        );
        act(() => {
            $btn.focus();
        });
        await user.keyboard('{Enter}');
        expect(within($el).getByTitle('calendar')).toHaveClass(
            dialogBoxStyle.show
        );
    });
});
