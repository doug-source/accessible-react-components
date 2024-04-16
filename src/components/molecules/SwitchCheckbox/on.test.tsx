import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import { act } from 'react-dom/test-utils';
import { SwitchCheckbox } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchCheckbox>;

const buildComponent = ({ label, checked }: ElementProps = {}) => {
    return <SwitchCheckbox label={label} checked={checked} />;
};

describe('<SwitchCheckbox /> component', () => {
    test('renders by label correctly', () => {
        const label = 'some content';
        render(buildComponent({ label }));
        const $el = screen.getByText(label);
        expect($el).toBeInTheDocument();
    });
    test('renders by switch role element correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('switch');
        expect($el.parentNode).toBeInTheDocument();
        expect($el).toBeInTheDocument();
    });
    test('renders with focus and blur correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('switch');
        act(() => {
            $el && $el.focus();
        });
        expect($el.parentElement).toHaveClass('focused');
        act(() => {
            $el && $el.blur();
        });
        expect($el.parentElement).not.toHaveClass('focused');
    });
    test('renders triggering click event correctly', async () => {
        render(buildComponent());
        const $el = screen.getByRole('switch');
        expect($el).toHaveProperty('checked', false);
        const user = userEvent.setup();
        await user.click($el);
        expect($el).toHaveProperty('checked', true);
    });
});
