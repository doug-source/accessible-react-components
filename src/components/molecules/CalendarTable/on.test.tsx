import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import styles from './CalendarTable.module.scss';
import { CalendarTable } from './index';

describe('<CalendarTable /> component', () => {
    test('renders correctly', () => {
        render(<CalendarTable data-testid="key-test" />);
        const $el = screen.getByTestId('key-test');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.calendarTable);
    });
    test('renders children correctly', () => {
        render(
            <CalendarTable data-testid="key-test">
                <tbody>
                    <tr>
                        <td data-testid="key-test-child">content</td>
                    </tr>
                </tbody>
            </CalendarTable>
        );
        const $child = within(screen.getByTestId('key-test')).getByTestId(
            'key-test-child'
        );
        expect($child).toBeInTheDocument();
        expect($child).toHaveTextContent('content');
    });
});
