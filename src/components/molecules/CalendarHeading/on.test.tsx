import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './CalendarHeading.module.scss';
import { CalendarHeading } from './index';

describe('<CalendarHeading /> component', () => {
    test('renders correctly', () => {
        render(<CalendarHeading data-testid="key-test" />);
        const $el = screen.getByTestId('key-test');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.calendarHeading);
    });
});
