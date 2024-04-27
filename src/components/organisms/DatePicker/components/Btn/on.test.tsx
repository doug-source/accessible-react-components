import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import btnDefaultStyle from '../../../../atoms/BtnDefault/BtnDefault.module.scss';
import styles from './Btn.module.scss';
import { Btn } from './index';

describe('<Btn /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(<Btn>{text}</Btn>);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.btn);
        expect($el).toHaveClass(btnDefaultStyle.btnDefault);
    });
});
