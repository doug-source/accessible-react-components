import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SwitchBtn } from './index';

describe('<SwitchBtn /> component', () => {
    test('renders correctly', () => {
        render(<SwitchBtn />);
        const $el = screen.getByRole('switch');
        expect($el).toBeInTheDocument();
    });
    test('renders with ariaChecked property as false default correctly', () => {
        render(<SwitchBtn />);
        const $el = screen.getByRole('switch');
        expect($el).toHaveAttribute('aria-checked', 'false');
    });
    test("renders with ariaChecked property as 'false' correctly", () => {
        render(<SwitchBtn aria-checked="false" />);
        const $el = screen.getByRole('switch');
        expect($el).toHaveAttribute('aria-checked', 'false');
    });
    test("renders with ariaChecked property as 'true' correctly", () => {
        render(<SwitchBtn aria-checked="true" />);
        const $el = screen.getByRole('switch');
        expect($el).toHaveAttribute('aria-checked', 'true');
    });
    test('renders with ariaChecked property as false correctly', () => {
        render(<SwitchBtn aria-checked={false} />);
        const $el = screen.getByRole('switch');
        expect($el).toHaveAttribute('aria-checked', 'false');
    });
    test('renders with ariaChecked property as true correctly', () => {
        render(<SwitchBtn aria-checked={true} />);
        const $el = screen.getByRole('switch');
        expect($el).toHaveAttribute('aria-checked', 'true');
    });
    test('renders with label property passed correctly', () => {
        const label = 'Lunch:';
        const { rerender } = render(<SwitchBtn label={label} />);
        const $el = screen.getByRole('switch');
        expect(within($el).getByText(label)).toBeInTheDocument();
        rerender(<SwitchBtn />);
        expect(within($el).queryByText(label)).not.toBeInTheDocument();
    });
    test('renders triggering click event handler correctly', async () => {
        render(<SwitchBtn />);
        const $el = screen.getByRole('switch');
        expect($el).toHaveAttribute('aria-checked', 'false');
        const user = userEvent.setup();
        await user.click($el);
        expect($el).toHaveAttribute('aria-checked', 'true');
        await user.click($el);
        expect($el).toHaveAttribute('aria-checked', 'false');
    });
});
