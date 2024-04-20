import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DialogBottom } from './index';

describe('<DialogBottom /> component', () => {
    test('renders correctly', () => {
        render(<DialogBottom data-testid="container">content</DialogBottom>);
        const $el = screen.getByTestId('container');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('content');
        expect($el).toHaveClass('dialogBottom');
    });
});
