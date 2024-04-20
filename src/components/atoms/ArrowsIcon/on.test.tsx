import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './ArrowsIcon.module.scss';
import { ArrowsIcon } from './index';

describe('<ArrowsIcon /> component', () => {
    test('renders correctly', () => {
        render(<ArrowsIcon data-testid="key-comp" />);
        const $el = screen.getByTestId('key-comp');
        expect($el).toBeInTheDocument();
    });
    test('renders no events correctly', () => {
        render(<ArrowsIcon noEvents data-testid="key-comp" />);
        const $el = screen.getByTestId('key-comp');
        expect($el).toHaveClass(styles.noEvents);
    });
});
