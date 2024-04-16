import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Backdrop } from './index';

describe('<Backdrop /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(
            <Backdrop data-testid="backdrop-id">content</Backdrop>
        );
        const $el = screen.getByTestId('backdrop-id');
        expect($el).toBeInTheDocument();
        expect($el).not.toHaveClass('show');
        expect($el).toHaveClass('hide');
        rerender(
            <Backdrop data-testid="backdrop-id" show>
                content
            </Backdrop>
        );
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass('show');
        expect($el).not.toHaveClass('hide');
    });
});
