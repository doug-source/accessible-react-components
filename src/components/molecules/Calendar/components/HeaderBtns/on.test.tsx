import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './HeaderBtns.module.scss';
import { HeaderBtns } from './index';

describe('<HeaderBtns /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(<HeaderBtns data-testid="key-testid">{text}</HeaderBtns>);
        const $el = screen.getByTestId('key-testid');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.headerBtns);
    });
});
