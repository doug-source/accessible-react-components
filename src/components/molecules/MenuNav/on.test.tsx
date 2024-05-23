import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef, useRef } from 'react';
import { MenuNav } from './index';

const makeMenuBtnRef = (btn: HTMLButtonElement | null = null) => {
    return renderHook(() => useRef<HTMLButtonElement | null>(btn));
};

const makeListRef = (list: (HTMLAnchorElement | null)[] = []) => {
    return renderHook(() => useRef<(HTMLAnchorElement | null)[]>(list));
};

type ElementProps = ComponentPropsWithoutRef<typeof MenuNav>;
type keys =
    | 'items'
    | 'expanded'
    | 'setExpanded'
    | 'focused'
    | 'setFocused'
    | 'menuBtnRef'
    | 'listRef'
    | 'show';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    items = [],
    expanded = false,
    setExpanded = () => {},
    focused = -1,
    setFocused = () => {},
    menuBtnRef = makeMenuBtnRef().result.current,
    listRef = makeListRef().result.current,
    show = true,
}: Props = {}) => (
    <MenuNav
        items={items}
        expanded={expanded}
        setExpanded={setExpanded}
        focused={focused}
        setFocused={setFocused}
        menuBtnRef={menuBtnRef}
        listRef={listRef}
        show={show}
        data-testid="test-element"
    />
);

describe('<MenuNav /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('test-element');
        expect($el).toBeInTheDocument();
    });
    test('does not render correctly', () => {
        render(buildComponent({ show: false }));
        const $el = screen.queryByTestId('test-element');
        expect($el).not.toBeInTheDocument();
    });
    test('hovers items list correctly', async () => {
        const setFocused = jest.fn();
        render(
            buildComponent({
                expanded: true,
                items: [
                    { content: 'content A', href: 'href A' },
                    { content: 'content B', href: 'href B' },
                ],
                setFocused,
            })
        );
        const menuItems = screen.getAllByRole('menuitem');
        const user = userEvent.setup();
        let index = 0;
        await user.hover(menuItems[index]);
        expect(setFocused).toHaveBeenCalledWith(index);
        await user.tab();
        index = 1;
        await user.hover(menuItems[index]);
        expect(setFocused).toHaveBeenCalledWith(index);
    });
    test('renders with tabIndex attribute correctly', () => {
        render(
            buildComponent({
                items: [
                    { content: 'content A', href: 'href A' },
                    { content: 'content B', href: 'href B' },
                ],
                focused: 1,
            })
        );
        const menuItems = screen.getAllByRole('menuitem');
        expect(menuItems[0]).toHaveAttribute('tabIndex', '-1');
        expect(menuItems[1]).toHaveAttribute('tabIndex', '0');
    });
});
