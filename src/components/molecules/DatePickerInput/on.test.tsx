import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DatePickerInput } from './index';

describe('<DatePickerInput /> component', () => {
    test('renders correctly', () => {
        const format = 'dd/mm/yyyy';
        const value = 'input-value';
        render(<DatePickerInput format={format} value={value} />);
        const $el = screen.getByDisplayValue(value);
        expect($el).toBeInTheDocument();
    });
});
