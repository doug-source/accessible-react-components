import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef } from 'react';
import { ComboMenu } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof ComboMenu>;
type keys = 'listboxId' | 'labelId';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    listboxId = 'foo',
    labelId = 'bar',
    children = 'contentFinal',
}: Props = {}) => (
    <ComboMenu listboxId={listboxId} labelId={labelId}>
        {children}
    </ComboMenu>
);

describe('<ComboMenu /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByText('contentFinal');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(ComboMenu.styles.comboMenu);
        expect($el).toHaveAttribute('role', 'listbox');
        expect($el).toHaveAttribute('id', 'foo');
        expect($el).toHaveAttribute('aria-labelledby', 'bar');
        expect($el).toHaveAttribute('tabIndex', '-1');
        expect($el).toHaveTextContent('contentFinal');
    });
});
