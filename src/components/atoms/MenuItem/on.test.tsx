import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import styles from './MenuItem.module.scss';
import { ActMenuItem } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof ActMenuItem>;
type keys = 'listRefFn';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    listRefFn = () => {},
    children = 'list item content',
    ...remain
}: Props = {}) => (
    <ul>
        <ActMenuItem {...remain} listRefFn={listRefFn}>
            {children}
        </ActMenuItem>
    </ul>
);

describe('<MenuItem /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByText('list item content');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.menuItem);
    });
    test('renders with and no identifier correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByText('list item content');
        expect($el).not.toHaveAttribute('id');
        rerender(buildComponent({ identified: true }));
        expect($el).toHaveAttribute('id');
    });
});
