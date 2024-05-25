import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import styles from './ComboInput.module.scss';
import { ComboInput } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof ComboInput>;
type keys =
    | 'expanded'
    | 'setExpanded'
    | 'selected'
    | 'setSelected'
    | 'items'
    | 'value'
    | 'onChange';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    expanded = false,
    setExpanded = () => {},
    selected = -1,
    setSelected = () => {},
    items = ['one', 'two'],
    value = '',
    onChange = () => {},
}: Props = {}) => (
    <ComboInput
        expanded={expanded}
        setExpanded={setExpanded}
        selected={selected}
        setSelected={setSelected}
        items={items}
        value={value}
        onChange={onChange}
    />
);

describe('<ComboInput /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByRole('textbox');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.combo);
        expect($el).toHaveClass(styles.focused);
        rerender(buildComponent({ selected: 0 }));
        expect($el).not.toHaveClass(styles.focused);
    });
    test('renders, changing the input correctly', async () => {
        let finalValue = '';
        const onChange = (value: string) => {
            finalValue += value;
        };
        render(buildComponent({ onChange }));
        const $el = screen.getByRole<HTMLInputElement>('textbox');
        const user = userEvent.setup();
        await user.type($el, 'content');
        await waitFor(() => {
            expect(finalValue).toBe('content');
        });
    });
});
