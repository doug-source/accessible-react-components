import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { Arrow } from '../../atoms/Arrow';
import styles from './ActMenuBtn.module.scss';
import { MenuBtn } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof MenuBtn>;
type keys = 'aria-expanded' | 'aria-controls' | 'children';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    'aria-expanded': ariaExpanded = false,
    'aria-controls': ariaControls = 'anyone',
    children = 'btn content',
    ...remain
}: Props = {}) => (
    <MenuBtn
        {...remain}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
    >
        {children}
    </MenuBtn>
);

describe('<ActMenuBtn /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.menuBtn);
        expect($el).toHaveAttribute('aria-expanded', 'false');
        const $span = within($el).getByText('btn content');
        expect($span).toBeInTheDocument();
        expect($span).toHaveTextContent('btn content');
        const $arrow = within($el).getByTitle('arrow');
        expect($arrow).toBeInTheDocument();
        expect($arrow).toHaveClass(styles.icon);
        expect($arrow).toHaveClass(Arrow.styles.complete);
        expect($arrow).toHaveClass(Arrow.styles.bottom);
        rerender(
            buildComponent({
                'aria-expanded': true,
                'aria-controls': 'otherElement',
            })
        );
        expect($el).toBeInTheDocument();
        expect($el).toHaveAttribute('aria-expanded', 'true');
        expect($el).toHaveAttribute('aria-controls', 'otherElement');
        expect($arrow).toHaveClass(styles.icon);
        expect($arrow).toHaveClass(Arrow.styles.top);
    });
});
