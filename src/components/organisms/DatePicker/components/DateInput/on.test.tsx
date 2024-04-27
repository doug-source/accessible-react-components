import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import styles from './DateInput.module.scss';
import { DateInput } from './index';

describe('<DateInput /> component', () => {
    test('renders correctly', () => {
        const format = 'dd/mm/yyyy';
        const value = 'input-value';
        render(<DateInput format={format} value={value} />);
        let $el = screen.getByDisplayValue(value);
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.inputField);
        expect($el.nextElementSibling).toBeInTheDocument();
        expect($el.nextElementSibling).toHaveClass(styles.description);
        const label = 'date format:';
        expect($el.nextElementSibling).toHaveTextContent(`(${label}${format})`);
        $el = screen.getByText(label);
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.screenReaderOnly);
    });
});
