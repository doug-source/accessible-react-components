import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './Box.module.scss';
import { Box } from './index';

describe('<Box /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        const { rerender } = render(<Box>{text}</Box>);
        const $el = screen.getByText(text);
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.box);
        rerender(<Box className="class-name-test">{text}</Box>);
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.box);
        expect($el).toHaveClass('class-name-test');
        expect($el).toHaveTextContent(text);
    });
});
