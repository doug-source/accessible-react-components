import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { Arrow } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof Arrow>;
type keys = 'direction' | 'type';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    direction = 'top',
    type = 'bordered',
}: Props = {}) => (
    <Arrow direction={direction} type={type} data-testid="test-element" />
);

describe('<Arrow /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByTestId('test-element');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(Arrow.styles.arrow);
        expect($el).toHaveClass(Arrow.styles.bordered);
        expect($el).toHaveClass(Arrow.styles.top);
        rerender(buildComponent({ type: 'complete', direction: 'right' }));
        expect($el).toHaveClass(Arrow.styles.arrow);
        expect($el).toHaveClass(Arrow.styles.complete);
        expect($el).toHaveClass(Arrow.styles.right);
        rerender(buildComponent({ direction: 'bottom' }));
        expect($el).toHaveClass(Arrow.styles.bottom);
        rerender(buildComponent({ direction: 'left' }));
        expect($el).toHaveClass(Arrow.styles.left);
    });
});
