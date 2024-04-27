import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './FooterMsg.module.scss';
import { FooterMsg } from './index';

describe('<FooterMsg /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        const { rerender } = render(<FooterMsg showMsg>{text}</FooterMsg>);
        const $el = screen.getByText(text);
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.footerMsg);
        expect($el).toHaveTextContent(text);
        rerender(<FooterMsg>{text}</FooterMsg>);
        expect($el).not.toHaveTextContent(text);
    });
});
