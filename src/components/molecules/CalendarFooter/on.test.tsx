import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './CalendarFooter.module.scss';
import { CalendarFooter } from './index';

describe('<CalendarFooter /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(
            <CalendarFooter data-testid="key-testid">{text}</CalendarFooter>
        );
        const $el = screen.getByTestId('key-testid');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.calendarFooter);
    });
});
