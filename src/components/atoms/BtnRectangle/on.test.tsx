import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './BtnRectangle.module.scss';
import { BtnRectangle } from './index';

describe('<BtnRectangle /> component', () => {
    test('renders correctly', () => {
        render(<BtnRectangle />);
        const $btn = screen.getByRole('button');
        expect($btn).toBeInTheDocument();
        expect($btn).toHaveClass(styles.btnRectangle);
    });
});
