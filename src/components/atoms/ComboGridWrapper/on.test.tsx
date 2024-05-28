import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComboGridWrapper } from '.';

describe('<ComboGridWrapper /> component', () => {
    test('renders correctly', () => {
        render(
            <ComboGridWrapper data-testid="test-component">
                content
            </ComboGridWrapper>
        );
        const $el = screen.getByTestId('test-component');
        expect($el).toBeInTheDocument();
    });
});
