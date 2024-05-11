import '@testing-library/jest-dom';
import { render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef, useRef } from 'react';
import styles from './ActMenu.module.scss';
import { ActMenu } from './index';

const makeMutableRefObjectList = (list: (HTMLLIElement | null)[] = []) => {
    return renderHook(() => useRef<typeof list>(list)).result.current;
};

const makeMutableRefObjectBtn = () => {
    return renderHook(() => useRef<HTMLButtonElement | null>(null)).result
        .current;
};

type ElementProps = ComponentPropsWithoutRef<typeof ActMenu>;
type keys =
    | 'items'
    | 'listRef'
    | 'expanded'
    | 'setExpanded'
    | 'focused'
    | 'setFocused'
    | 'menuBtnRef';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    items = [['keyA', 'contentA', () => {}]],
    listRef = makeMutableRefObjectList(),
    expanded = false,
    setExpanded = () => {},
    focused = -1,
    setFocused = () => {},
    menuBtnRef = makeMutableRefObjectBtn(),
}: Props = {}) => (
    <ActMenu
        items={items}
        listRef={listRef}
        expanded={expanded}
        setExpanded={setExpanded}
        focused={focused}
        setFocused={setFocused}
        menuBtnRef={menuBtnRef}
    />
);

describe('<ActMenu /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(
            buildComponent({
                items: [
                    ['keyA', 'contentA', () => {}],
                    ['keyB', 'contentB', () => {}],
                ],
            })
        );
        const $el = screen.getByRole('menu');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.menu);

        const menuitems = within($el).getAllByRole('menuitem');
        menuitems.forEach(($menuitem) =>
            expect($menuitem).toHaveAttribute('tabIndex', '-1')
        );
        rerender(
            buildComponent({
                focused: 0,
                items: [
                    ['keyA', 'contentA', () => {}],
                    ['keyB', 'contentB', () => {}],
                ],
            })
        );
        expect(menuitems[0]).toHaveAttribute('tabIndex', '0');
        expect(menuitems[1]).toHaveAttribute('tabIndex', '-1');
    });
    test('renders calling click event handler correctly', async () => {
        const setExpanded = jest.fn();
        const callback = jest.fn();
        render(
            buildComponent({
                items: [
                    ['keyA', 'contentA', callback],
                    ['keyB', 'contentB', () => {}],
                ],
                expanded: true,
                setExpanded,
            })
        );
        const menuItems = screen.getAllByRole<HTMLLIElement>('menuitem');
        const user = userEvent.setup();
        const [$first] = menuItems;
        await user.click($first);
        expect(setExpanded).toHaveBeenCalledWith(false);
        expect(callback).toHaveBeenCalled();
    });
    test('renders calling keydown event handler with Home key correctly', async () => {
        const setFocused = jest.fn();
        render(
            buildComponent({
                items: [
                    ['keyA', 'contentA', () => {}],
                    ['keyB', 'contentB', () => {}],
                ],
                expanded: true,
                setFocused,
            })
        );
        const menuItems = screen.getAllByRole('menuitem');
        const [$first, $second] = menuItems;
        $second.focus();
        const user = userEvent.setup();
        await user.keyboard('{Home}');
        expect(setFocused).toHaveBeenCalledWith(0);
        expect($first).toHaveFocus();
    });
    test('renders triggering mouseover event correctly', async () => {
        render(
            buildComponent({
                items: [
                    ['keyA', 'contentA', () => {}],
                    ['keyB', 'contentB', () => {}],
                ],
                expanded: true,
            })
        );
        const user = userEvent.setup();
        const menuItems = screen.getAllByRole('menuitem');
        const [$first, $second] = menuItems;
        expect($first).not.toHaveFocus();
        expect($second).not.toHaveFocus();
        await user.hover($second);
        expect($first).not.toHaveFocus();
        expect($second).toHaveFocus();
        await user.tab();
        expect($first).not.toHaveFocus();
        expect($second).not.toHaveFocus();
        await user.hover($first);
        expect($first).toHaveFocus();
        expect($second).not.toHaveFocus();
    });
});
