import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { SlideItemBox } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof SlideItemBox>;
type keys = 'show' | 'pos' | 'size';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    show = true,
    pos = 0,
    size = 2,
    children = 'content',
}: Props = {}) => (
    <SlideItemBox show={show} pos={pos} size={size}>
        {children}
    </SlideItemBox>
);

describe('<SlideItemBox /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('tabpanel');
        expect($el).toBeInTheDocument();
    });
});
