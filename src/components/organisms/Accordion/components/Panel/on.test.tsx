import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { Panel } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof Panel>;
type keys = 'id' | 'children' | 'keepRole' | 'aria-labelledby';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    id = 'identifier',
    children = 'content',
    keepRole = true,
    'aria-labelledby': ariaLabelledby = 'outside',
    ...remain
}: Props = {}) => {
    return (
        <Panel
            {...remain}
            id={id}
            keepRole={keepRole}
            aria-labelledby={ariaLabelledby}
        >
            {children}
        </Panel>
    );
};

describe('<Panel /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('region');
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent('content');
        expect($el).toHaveAttribute('aria-labelledby', 'outside');
    });
    test('renders with properties passed correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByRole('region');
        rerender(
            buildComponent({
                id: 'other',
                children: 'panel content',
                keepRole: false,
                'aria-labelledby': 'bar',
                className: 'another',
            })
        );
        expect($el).toHaveAttribute('id', 'other');
        expect($el).not.toHaveAttribute('role', 'region');
        expect($el).toHaveAttribute('aria-labelledby', 'bar');
        expect($el).toHaveClass('another');
        expect($el).toHaveTextContent('panel content');
    });
});
