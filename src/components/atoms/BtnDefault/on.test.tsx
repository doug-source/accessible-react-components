import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './BtnDefault.module.scss';
import { BtnDefault } from './index';

describe('<BtnDefault /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(<BtnDefault>{text}</BtnDefault>);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.btnDefault);
    });
});
