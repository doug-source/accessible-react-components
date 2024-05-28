import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComboboxGrid } from './index';

describe('<ComboboxGrid /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(
            <ComboboxGrid items={[['fooText', 'fooDesc']]} label="MyLabel" />
        );
        const $label = screen.getByText('MyLabel');
        expect($label).toBeInTheDocument();
        const $wrapper = $label.nextElementSibling;
        expect($wrapper).toBeInTheDocument();
        rerender(<ComboboxGrid items={[['fooText', 'fooDesc']]} />);
        expect($wrapper).toBeInTheDocument();
        expect($wrapper?.previousElementSibling).not.toBeInTheDocument();
    });
    test('renders changing input correctly', async () => {
        render(
            <ComboboxGrid items={[['fooText', 'fooDesc']]} label="MyLabel" />
        );
        const $input = screen.getByRole('combobox');
        const user = userEvent.setup();
        await user.type($input, 'content');
        waitFor(() => {
            expect($input).toHaveValue('content');
        });
    });
    test('renders with onSelection property called with value not null correctly', async () => {
        const onChange = jest.fn();
        const item: [string, string] = ['fooText', 'fooDesc'];
        render(
            <ComboboxGrid items={[item]} label="MyLabel" onChange={onChange} />
        );
        const $input = screen.getByRole('combobox');
        const user = userEvent.setup();
        await user.type($input, 'foo');
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{Enter}');
        expect(onChange).toHaveBeenCalledWith(item);
    });
    test('renders with onSelection property called correctly', async () => {
        const onChange = jest.fn();
        const item: [string, string] = ['fooText', 'fooDesc'];
        render(
            <ComboboxGrid items={[item]} label="MyLabel" onChange={onChange} />
        );
        const $input = screen.getByRole('combobox');
        const user = userEvent.setup();
        await user.type($input, 'foo');
        await user.keyboard('{Escape}');
        await user.keyboard('{Escape}');
        expect(onChange).toHaveBeenCalledWith(null);
    });
});
