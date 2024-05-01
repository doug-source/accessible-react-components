import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useUnique } from './hooks';
import { UniqueWrapper } from './unique';

const TestingComponent = () => {
    const unique = useUnique();
    return (
        <div data-testid="test-element">{unique ? 'Unique' : 'Non-unique'}</div>
    );
};

describe('<UniqueWrapper />', () => {
    test('provides expected AuthContext to child elements', () => {
        const { rerender } = render(
            <UniqueWrapper value={true}>
                <TestingComponent />
            </UniqueWrapper>
        );
        const $el = screen.getByTestId('test-element');
        expect($el).toHaveTextContent('Unique');
        rerender(
            <UniqueWrapper value={false}>
                <TestingComponent />
            </UniqueWrapper>
        );
        expect($el).toHaveTextContent('Non-unique');
    });
});
