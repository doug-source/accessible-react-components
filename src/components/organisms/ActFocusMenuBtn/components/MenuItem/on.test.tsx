import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { MenuItem } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof MenuItem>;
type keys = 'listRefFn';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    listRefFn = () => {},
    children = 'list item content',
    ...remain
}: Props = {}) => (
    <ul>
        <MenuItem {...remain} listRefFn={listRefFn}>
            {children}
        </MenuItem>
    </ul>
);

describe('<MenuItem /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByText('list item content');
        expect($el).toBeInTheDocument();
    });
});
