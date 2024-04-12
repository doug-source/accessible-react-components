import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { Alert } from './index';

describe('<Alert /> component', () => {
    test('renders with content correctly', () => {
        render(<Alert>The content</Alert>);
        const $el = screen.getByRole('alert');
        expect($el).toBeVisible();
    });
    test('renders no content correctly', () => {
        render(<Alert />);
        const $el = screen.getByRole('alert', { hidden: true });
        expect($el).toBeInTheDocument();
        expect($el).not.toBeVisible();
    });
});
