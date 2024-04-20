import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './CalendarHeader.module.scss';
import { CalendarHeader } from './index';

describe('<CalendarHeader /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(
            <CalendarHeader data-testid="key-testid">{text}</CalendarHeader>
        );
        const $el = screen.getByTestId('key-testid');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.calendarHeader);
    });
});
