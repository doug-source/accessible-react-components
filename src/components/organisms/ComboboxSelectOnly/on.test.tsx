import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ComboboxSelectOnly.module.scss';
import { ComboboxSelectOnly } from './index';

type ElementProps<T> = ComponentPropsWithoutRef<typeof ComboboxSelectOnly<T>>;
type keys = 'itemName' | 'options';
type Props<T> = Omit<ElementProps<T>, keys> &
    Partial<Pick<ElementProps<T>, keys>>;

const buildComponent = <T,>({
    itemName = 'the name item',
    options = [],
    ...remain
}: Props<T> = {}) => (
    <ComboboxSelectOnly<T>
        itemName={itemName}
        options={options}
        data-testid="testid-key"
        {...remain}
    />
);

describe('<ComboboxSelectOnly /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(buildComponent<string>());
        const $el = screen.getByTestId('testid-key');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.box);
        expect($el).not.toHaveClass(styles.sameline);
        rerender(buildComponent<string>({ sameLine: true }));
        expect($el).toHaveClass(styles.sameline);
    });
    test('renders children correctly', () => {
        render(buildComponent<string>());
        const $el = screen.getByTestId('testid-key');
        expect(within($el).getByText('Favorite Fruit')).toBeInTheDocument();
        expect(within($el).getByRole('combobox')).toBeInTheDocument();
        expect(within($el).getByRole('listbox')).toBeInTheDocument();
    });
    test('renders calling click event handler from combobox correctly', async () => {
        render(buildComponent<string>());
        const $combobox = screen.getByRole('combobox');
        expect($combobox).toHaveAttribute('aria-expanded', 'false');
        const user = userEvent.setup();
        await user.click($combobox);
        expect($combobox).toHaveAttribute('aria-expanded', 'true');
    });
    test('renders calling Space keydown event handler from combobox correctly', async () => {
        render(buildComponent<string>());
        const $combobox = screen.getByRole('combobox');
        expect($combobox).toHaveAttribute('aria-expanded', 'false');
        $combobox.focus();
        const user = userEvent.setup();
        await user.keyboard(' ');
        expect($combobox).toHaveAttribute('aria-expanded', 'true');
    });
    test('renders calling Enter keydown event handler from combobox correctly', async () => {
        const jestOnChange = jest.fn();
        render(
            buildComponent<string>({
                options: [
                    { label: 'Label One', value: 'Value One' },
                    { label: 'Label Two', value: 'Value Two' },
                ],
                onChange: jestOnChange,
            })
        );
        const $combobox = screen.getByRole('combobox');
        $combobox.focus();
        const $listBox = screen.getByRole('listbox');
        const user = userEvent.setup();
        await user.keyboard('{Enter}');
        const options = within($listBox).getAllByRole('option');
        const [$firstOption] = options;
        await user.click($firstOption);
        expect($combobox).toHaveTextContent('Label One');
        expect(jestOnChange).toHaveBeenCalledWith('Value One');
    });
});
