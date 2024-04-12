import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { DialogHeading } from './index';

describe('<DialogHeading /> component', () => {
    test('renders correctly', () => {
        render(<DialogHeading id="heading-title">title</DialogHeading>);
        const $el = screen.getByText('title');
        expect($el).toBeVisible();
        expect($el).toHaveTextContent('title');
        expect($el).toHaveStyleRule('text-align', 'center');
        expect($el).toHaveStyleRule('font-size', '140%');
        expect($el).toHaveAttribute('id', 'heading-title');
    });
});
