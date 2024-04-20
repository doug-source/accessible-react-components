import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './CalendarTableBox.module.scss';
import { CalendarTableBox } from './index';

describe('<CalendarTableBox /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(<CalendarTableBox>{text}</CalendarTableBox>);
        const $el = screen.getByText(text);
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.calendarTableBox);
    });
});
