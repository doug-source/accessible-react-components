import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchBtn } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchBtn>;

const buildComponent = ({
    label,
    'aria-checked': ariaChecked,
}: ElementProps = {}) => {
    return <SwitchBtn label={label} aria-checked={ariaChecked} />;
};

describe('<SwitchBtn /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('switch');
        expect($el).toBeInTheDocument();
    });
    test('renders with label property passed correctly', () => {
        const label = 'Lunch:';
        const { rerender } = render(buildComponent({ label }));
        const $el = screen.getByRole('switch');
        expect(within($el).getByText(label)).toBeInTheDocument();
        rerender(buildComponent());
        expect(within($el).queryByText(label)).not.toBeInTheDocument();
    });
    test('renders triggering click event handler correctly', async () => {
        render(buildComponent());
        const $el = screen.getByRole('switch');
        expect($el).toHaveAttribute('aria-checked', 'false');
        const user = userEvent.setup();
        await user.click($el);
        expect($el).toHaveAttribute('aria-checked', 'true');
    });
});
