import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { NavMenuBtn } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof NavMenuBtn>;
type keys = 'btnLabel' | 'items';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    btnLabel = 'btn-label',
    items = [
        { content: 'content-one', href: 'href-one' },
        { content: 'content-two', href: 'href-two' },
    ],
}: Props = {}) => (
    <NavMenuBtn btnLabel={btnLabel} items={items} data-testid="test-element" />
);

describe('<NavMenuBtn /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('test-element');
        expect($el).toBeInTheDocument();
    });
});
