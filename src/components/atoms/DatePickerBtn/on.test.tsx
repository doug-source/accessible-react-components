import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import btnDefaultStyle from '../BtnDefault/BtnDefault.module.scss';
import styles from './DatePickerBtn.module.scss';
import { DatePickerBtn } from './index';

describe('<DatePickerBtn /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        render(<DatePickerBtn>{text}</DatePickerBtn>);
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.datePickerBtn);
        expect($el).toHaveClass(btnDefaultStyle.btnDefault);
    });
});
