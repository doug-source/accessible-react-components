import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './CalendarFooterMsg.module.scss';
import { CalendarFooterMsg } from './index';

describe('<CalendarFooterMsg /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(
            <CalendarFooterMsg data-testid="key-testid">
                {text}
            </CalendarFooterMsg>
        );
        const $el = screen.getByTestId('key-testid');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.calendarFooterMsg);
    });
});
