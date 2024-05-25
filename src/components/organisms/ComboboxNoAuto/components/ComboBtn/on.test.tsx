import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './ComboBtn.module.scss';
import { ComboBtn } from './index';
// import { Arrow } from '../../../../atoms/Arrow';
import arrowStyles from '../../../../atoms/Arrow/Arrow.module.scss';

describe('<ComboBtn /> component', () => {
    test('renders correctly', () => {
        render(<ComboBtn expanded={false} />);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.comboBtn);
    });
    test('renders with expanded property correctly', () => {
        const { rerender } = render(<ComboBtn expanded={false} />);
        const $el = screen.getByRole('button');
        const [$arrow] = Array.from($el.children);
        expect($arrow).toHaveClass(styles.arrowDown);
        expect($arrow).toHaveClass(arrowStyles.bottom);
        rerender(<ComboBtn expanded={true} />);
        expect($arrow).toHaveClass(styles.arrowUp);
        expect($arrow).toHaveClass(arrowStyles.top);
    });
});
