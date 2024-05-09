import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef } from 'react';
import stylesMenu from './components/Menu/Menu.module.scss';
import { ActFocusMenuBtn } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof ActFocusMenuBtn>;
type keys = 'btnLabel' | 'items';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    btnLabel = 'btn label content',
    items = [['keyA', 'contentA', () => {}]],
}: Props = {}) => (
    <ActFocusMenuBtn
        btnLabel={btnLabel}
        items={items}
        data-testid="testIdentifier"
    />
);

describe('<ActFocusMenuBtn /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('testIdentifier');
        expect($el).toBeInTheDocument();
        const $btn = screen.getByRole('button');
        expect($btn).toBeInTheDocument();
        const $menu = screen.getByRole('menu');
        expect($menu).toBeInTheDocument();
    });
    test('render calling click event handler correctly', async () => {
        render(buildComponent());
        const $menu = screen.getByRole('menu');
        expect($menu).toHaveClass(stylesMenu.hide);
        expect($menu).not.toHaveClass(stylesMenu.show);
        const $btn = screen.getByRole('button');
        const user = userEvent.setup();
        await user.click($btn);
        expect($menu).not.toHaveClass(stylesMenu.hide);
        expect($menu).toHaveClass(stylesMenu.show);
    });
    test('render calling keyboard event handler correctly', async () => {
        render(buildComponent());
        const $menu = screen.getByRole('menu');
        expect($menu).toHaveClass(stylesMenu.hide);
        expect($menu).not.toHaveClass(stylesMenu.show);
        const $btn = screen.getByRole('button');
        $btn.focus();
        const user = userEvent.setup();
        await user.keyboard('{ArrowDown}');
        expect($menu).not.toHaveClass(stylesMenu.hide);
        expect($menu).toHaveClass(stylesMenu.show);
    });
});
