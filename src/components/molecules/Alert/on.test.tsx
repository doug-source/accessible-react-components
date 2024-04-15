import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Alert } from './index';

describe('<Alert /> component', () => {
    test('renders with content correctly', () => {
        render(<Alert>The content</Alert>);
        const $el = screen.getByRole('alert');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('The content');
    });
    test('renders no content correctly', () => {
        render(<Alert />);
        const $el = screen.getByRole('alert', { hidden: true });
        expect($el).toBeInTheDocument();
        expect($el).toBeEmptyDOMElement();
    });
});
