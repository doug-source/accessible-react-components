import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './CalendarCell.module.scss';
import { CalendarCell } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof CalendarCell>;
type Props = Omit<ElementProps, 'type'> & Partial<Pick<ElementProps, 'type'>>;

const buildComponent = ({ type = 'th', children = 'content' }: Props = {}) => {
    return (
        <table>
            <tbody>
                <tr>
                    <CalendarCell type={type} data-testid="key-test">
                        {children}
                    </CalendarCell>
                </tr>
            </tbody>
        </table>
    );
};

describe('<CalendarCell /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('key-test');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.calendarCell);
    });
    test('renders with HTMLTableCellElement instance correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByTestId('key-test');
        expect($el).toBeInstanceOf(HTMLTableCellElement);
        rerender(buildComponent({ type: 'td' }));
        expect($el).toBeInstanceOf(HTMLTableCellElement);
    });
});
