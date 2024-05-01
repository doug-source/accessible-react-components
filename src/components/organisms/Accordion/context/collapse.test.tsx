import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CollapseWrapper } from './collapse';
import { useCollapse } from './hooks';

const TestingComponent = () => {
    const collapse = useCollapse();
    return (
        <div data-testid="test-element">
            {collapse ? 'Collapsed' : 'Non-collapsed'}
        </div>
    );
};

describe('<CollapseWrapper />', () => {
    test('provides expected AuthContext to child elements', () => {
        const { rerender } = render(
            <CollapseWrapper value={true}>
                <TestingComponent />
            </CollapseWrapper>
        );
        const $el = screen.getByTestId('test-element');
        expect($el).toHaveTextContent('Collapsed');
        rerender(
            <CollapseWrapper value={false}>
                <TestingComponent />
            </CollapseWrapper>
        );
        expect($el).toHaveTextContent('Non-collapsed');
    });
});
