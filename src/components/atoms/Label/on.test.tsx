import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Label } from './index';

describe('<Label /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(<Label htmlFor="foo">content</Label>);
        let $el: HTMLElement | null = screen.getByText('content');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('content');
        expect($el).toHaveAttribute('for', 'foo');
        rerender(<Label htmlFor="foo"></Label>);
        $el = screen.queryByText('content');
        expect($el).not.toBeInTheDocument();
    });
});
