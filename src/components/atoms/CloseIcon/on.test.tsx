import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CloseIcon } from './index';

describe('<CloseIcon /> component', () => {
    test('renders correctly', () => {
        render(<CloseIcon />);
        const $el = screen.getByLabelText('close dialog');
        expect($el).toHaveAttribute('aria-label');
        expect($el).toBeInTheDocument();
    });
});
