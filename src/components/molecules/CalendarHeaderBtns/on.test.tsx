import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './CalendarHeaderBtns.module.scss';
import { CalendarHeaderBtns } from './index';

describe('<CalendarHeaderBtns /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(
            <CalendarHeaderBtns data-testid="key-testid">
                {text}
            </CalendarHeaderBtns>
        );
        const $el = screen.getByTestId('key-testid');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.calendarHeaderBtns);
    });
});
