import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { Header } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof Header>;
type keys = 'id' | 'aria-controls' | 'aria-expanded';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    id = 'identifier',
    'aria-controls': ariaControls = 'outside',
    'aria-expanded': ariaExpanded = 'false',
    'aria-disabled': ariaDisabled,
    children = 'content',
    className,
    ...remain
}: Props = {}) => (
    <Header
        {...remain}
        id={id}
        className={className}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-disabled={ariaDisabled}
    >
        {children}
    </Header>
);

describe('<Header /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('heading', { level: 3 });
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(Header.styles.header);
        const $btn = within($el).getByRole('button');
        expect($btn).toBeInTheDocument();
        expect($btn).toHaveClass(Header.styles.btn);
        const $title = within($btn).getByText('content');
        expect($title).toBeInTheDocument();
        expect($title).toHaveClass(Header.styles.title);
        const $icon = $title.lastElementChild;
        expect($icon).toHaveClass(Header.styles.icon);
    });
    test('renders with properties passed correctly', () => {
        const { rerender } = render(
            buildComponent({ className: 'foo', title: 'my heading' })
        );
        const $el = screen.getByRole('heading', { level: 3 });
        expect($el).toHaveClass('foo');
        expect($el).toHaveAttribute('title', 'my heading');
        const $btn = within($el).getByRole('button');
        expect($btn).toHaveAttribute('id', 'identifier');
        expect($btn).toHaveAttribute('aria-controls', 'outside');
        expect($btn).toHaveAttribute('aria-expanded', 'false');
        expect($btn).not.toHaveAttribute('aria-disabled');
        const $title = within($btn).getByText('content');
        expect($title).toHaveTextContent('content');
        rerender(
            buildComponent({
                id: 'another id',
                'aria-expanded': true,
                'aria-disabled': true,
                'aria-controls': 'inside',
                children: 'juice',
            })
        );
        expect($btn).toHaveAttribute('id', 'another id');
        expect($btn).toHaveAttribute('aria-expanded', 'true');
        expect($btn).toHaveAttribute('aria-disabled', 'true');
        expect($btn).toHaveAttribute('aria-controls', 'inside');
        expect($title).toHaveTextContent('juice');
    });
});
