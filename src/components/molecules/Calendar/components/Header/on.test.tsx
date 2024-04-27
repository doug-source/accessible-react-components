import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './Header.module.scss';
import { Header } from './index';

describe('<Header /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(<Header data-testid="key-testid">{text}</Header>);
        const $el = screen.getByTestId('key-testid');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.header);
    });
});
