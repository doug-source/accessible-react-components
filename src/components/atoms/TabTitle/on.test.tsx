import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { ComponentPropsWithoutRef } from 'react';
import { TabTitle } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof TabTitle>;
type keys = 'order' | 'children';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    order = 1,
    children = 'A heading text',
}: Props = {}) => {
    return render(<TabTitle order={order}>{children}</TabTitle>);
};

describe('<TabTitle /> component', () => {
    test('renders correctly', () => {
        buildComponent();
        const $el = screen.getByRole('heading', { level: 3, hidden: true });
        expect($el).toBeInTheDocument();
        expect($el).not.toBeVisible();
    });
    test('renders content and order props passed', () => {
        const props = { children: 'Another text', order: 2 };
        buildComponent(props);
        const $el = screen.getByRole('heading', { level: 3, hidden: true });
        expect($el).toBeInTheDocument();
        expect($el).toHaveAttribute('id', `tablist-${props.order}`);
    });
});
