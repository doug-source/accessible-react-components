import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './ComboGridBox.module.scss';
import { ComboGridBox } from './index';

describe('<ComboGridBox /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(<ComboGridBox>content</ComboGridBox>);
        const $el = screen.getByRole('grid');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.grid);
        expect($el).toHaveTextContent('content');
        expect($el).not.toHaveAttribute('aria-labelledby');
        rerender(<ComboGridBox labelId="foo">content</ComboGridBox>);
        expect($el).toHaveAttribute('aria-labelledby', 'foo');
    });
});
