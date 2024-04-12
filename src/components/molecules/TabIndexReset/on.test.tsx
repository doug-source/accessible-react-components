import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { TabIndexReset } from './index';

describe('<TabIndexReset /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(<TabIndexReset>content</TabIndexReset>);
        const $el = screen.getByText('content');
        expect($el).toBeVisible();
        expect($el).toHaveAttribute('tabIndex', '0');
        expect($el).toHaveTextContent('content');
        rerender(<TabIndexReset />);
        expect($el).toBeEmptyDOMElement();
    });
});
