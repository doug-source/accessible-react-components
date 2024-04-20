import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './DatePickerBox.module.scss';
import { DatePickerBox } from './index';

describe('<DatePickerBox /> component', () => {
    test('renders correctly', () => {
        const text = 'content';
        const { rerender } = render(<DatePickerBox>{text}</DatePickerBox>);
        const $el = screen.getByText(text);
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.datePickerBox);
        rerender(
            <DatePickerBox className="class-name-test">{text}</DatePickerBox>
        );
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.datePickerBox);
        expect($el).toHaveClass('class-name-test');
        expect($el).toHaveTextContent(text);
    });
});
