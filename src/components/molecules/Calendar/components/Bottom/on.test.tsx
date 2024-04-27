import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './Bottom.module.scss';
import { Bottom } from './index';

describe('<Bottom /> component', () => {
    test('renders correctly', () => {
        render(<Bottom data-testid="container">content</Bottom>);
        const $el = screen.getByTestId('container');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('content');
        expect($el).toHaveClass(styles.bottomCalendar);
    });
});
