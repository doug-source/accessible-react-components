import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { SwitchBasic } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SwitchBasic>;

const buildComponent = ({ label, onChange }: ElementProps = {}) => {
    return render(<SwitchBasic label={label} onChange={onChange} />);
};

describe('<SwitchBasic /> component', () => {
    test('renders correctly', () => {
        buildComponent({ label: 'Foo' });
        const $el = screen.getByRole('switch');
        expect($el).toBeVisible();
    });
    test('renders no having label correctly', () => {
        buildComponent();
        const $el = screen.getByRole('switch');
        expect($el.children).toHaveLength(1);
        expect($el.firstChild).toHaveClass('switch');
    });
    test('renders triggering click event correctly', async () => {
        const onChange = jest.fn();
        buildComponent({ onChange });
        const $el = screen.getByRole('switch');
        const user = userEvent.setup();
        await user.click($el);
        expect(onChange).toHaveBeenCalled();
    });
    test('renders triggering keydown event with Space key correctly', async () => {
        const onChange = jest.fn();
        buildComponent({ onChange });
        const $el = screen.getByRole('switch');
        $el.focus();
        const user = userEvent.setup();
        await user.keyboard(' ');
        expect(onChange).toHaveBeenCalled();
    });
    test('renders triggering keydown event with Enter key correctly', async () => {
        const onChange = jest.fn();
        buildComponent({ onChange });
        const $el = screen.getByRole('switch');
        $el.focus();
        const user = userEvent.setup();
        await user.keyboard('{Enter}');
        expect(onChange).toHaveBeenCalled();
    });
});
