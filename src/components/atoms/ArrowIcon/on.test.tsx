import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './ArrowIcon.module.scss';
import { ArrowIcon } from './index';

describe('<ArrowIcon /> component', () => {
    test('renders correctly', () => {
        render(<ArrowIcon data-testid="key-comp" />);
        const $el = screen.getByTestId('key-comp');
        expect($el).toBeInTheDocument();
    });
    test('renders no events correctly', () => {
        render(<ArrowIcon noEvents data-testid="key-comp" />);
        const $el = screen.getByTestId('key-comp');
        expect($el).toHaveClass(styles.noEvents);
    });
});
