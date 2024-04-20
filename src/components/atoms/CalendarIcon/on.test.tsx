import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './CalendarIcon.module.scss';
import { CalendarIcon } from './index';

describe('<CalendarIcon /> component', () => {
    test('renders correctly', () => {
        render(<CalendarIcon data-testid="key-comp" />);
        const $el = screen.getByTestId('key-comp');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.calendarIcon);
    });
    test('renders no events correctly', () => {
        render(<CalendarIcon noEvents data-testid="key-comp" />);
        const $el = screen.getByTestId('key-comp');
        expect($el).toHaveClass(styles.noEvents);
    });
});
