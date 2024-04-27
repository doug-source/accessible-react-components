import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './Footer.module.scss';
import { Footer } from './index';

describe('<Footer /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(<Footer data-testid="key-testid">{text}</Footer>);
        const $el = screen.getByTestId('key-testid');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.footer);
    });
});
