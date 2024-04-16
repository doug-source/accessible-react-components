import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Heading } from './index';

describe('<Heading /> component', () => {
    test('renders correctly', () => {
        render(<Heading id="heading-title">title</Heading>);
        const $el = screen.getByText('title');
        expect($el).toBeInTheDocument();
    });
    test('renders with children property passed', () => {
        const text = 'content';
        render(<Heading id="heading-title">{text}</Heading>);
        const $el = screen.getByText(text);
        expect($el).toHaveTextContent(text);
    });
});
