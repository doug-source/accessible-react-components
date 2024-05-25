import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ComboboxAutocomplete.module.scss';
import { ComboboxAutocomplete } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof ComboboxAutocomplete>;
type keys = 'items' | 'label' | 'onChange';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({ items = [], label, onChange }: Props = {}) => (
    <ComboboxAutocomplete items={items} label={label} onChange={onChange} />
);

describe('<ComboboxAutocomplete /> component', () => {
    test('renders correctly', () => {
        render(buildComponent({ label: 'TheLabel:' }));
        const $label = screen.getByText('TheLabel:');
        expect($label).toBeInTheDocument();
        expect($label).toHaveClass(styles.boxLabel);
        const $input = screen.getByLabelText('TheLabel:');
        expect($input.parentNode).toBeInTheDocument();
        expect($input.parentNode).toHaveClass(styles.box);
        const $btn = screen.getByRole('button');
        expect($btn).toBeInTheDocument();
        expect($btn.firstChild).toHaveClass(styles.arrowBtn);
    });
    test('renders onChange property correctly', async () => {
        const onChange = jest.fn();
        render(buildComponent({ onChange }));
        const $input = screen.getByRole('textbox');
        const user = userEvent.setup();
        await user.type($input, 'content');
        expect(onChange).toHaveBeenCalledWith('content');
        expect($input).toHaveValue('content');
    });
    test('renders clicking at an option correctly', async () => {
        const onChange = jest.fn();
        render(buildComponent({ onChange, items: ['one', 'two'] }));
        const $input = screen.getByRole('textbox');
        const options = screen.getAllByRole('option');
        const user = userEvent.setup();
        await user.click(options[0]);
        expect(onChange).toHaveBeenCalledWith('one');
        expect($input).toHaveValue('one');
    });
});
