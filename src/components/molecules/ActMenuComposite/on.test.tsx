import '@testing-library/jest-dom';
import { render, renderHook, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    ComponentPropsWithoutRef,
    EventHandler,
    KeyboardEvent,
    MouseEvent,
    useRef,
} from 'react';
import { MenuItem } from '../../atoms/MenuItem';
import { ActMenuComposite } from './index';

type ElementProps = ComponentPropsWithoutRef<typeof ActMenuComposite>;
type keys =
    | 'show'
    | 'items'
    | 'listRef'
    | 'expanded'
    | 'setExpanded'
    | 'focused'
    | 'setFocused'
    | 'menuBoxRef'
    | 'menuBtnRef';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const createRef = (menuItemList: (HTMLLIElement | null)[] = []) => {
    return renderHook(() => useRef<(HTMLLIElement | null)[]>(menuItemList));
};

const createHTMLRef = <T,>(el: T | null = null) => {
    return renderHook(() => useRef<T | null>(el));
};

const makeItems = () => {
    return [
        ['one', 'one', jest.fn()],
        ['two', 'two', jest.fn()],
        ['three', 'three', jest.fn()],
    ] as unknown as [
        key: string,
        option: string,
        callback: EventHandler<
            | MouseEvent<HTMLLIElement, globalThis.MouseEvent>
            | KeyboardEvent<HTMLLIElement>
        >
    ][];
};

const buildComponent = ({
    show = false,
    items = [],
    listRef = createRef().result.current,
    expanded = false,
    setExpanded = () => {},
    focused = -1,
    setFocused = () => {},
    menuBoxRef = createHTMLRef<HTMLUListElement>().result.current,
    menuBtnRef = createHTMLRef<HTMLButtonElement>().result.current,
}: Props = {}) => (
    <ActMenuComposite
        show={show}
        items={items}
        listRef={listRef}
        expanded={expanded}
        setExpanded={setExpanded}
        focused={focused}
        setFocused={setFocused}
        menuBoxRef={menuBoxRef}
        menuBtnRef={menuBtnRef}
    />
);

describe('<ActMenuComposite /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(buildComponent({ show: true }));
        expect(screen.getByRole('menu')).toBeInTheDocument();
        rerender(buildComponent());
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
    test('renders with aria-activedescendant attribute correctly', () => {
        render(buildComponent({ show: true }));
        const $ul = screen.getByRole('menu');
        expect($ul).toHaveAttribute('aria-activedescendant', '');
    });
    test('renders calling HTMLiElements correctly', () => {
        const listRef = createRef();
        const items = makeItems();
        render(
            buildComponent({
                show: true,
                expanded: true,
                listRef: listRef.result.current,
                items,
            })
        );
        const $ul = screen.getByRole('menu');
        const liList = within($ul).getAllByRole('menuitem');
        expect(liList).toHaveLength(3);
        liList.forEach((li) => expect(li).toBeInTheDocument());
    });
    test('renders clicking at the HTMLiElement correctly', async () => {
        const listRef = createRef();
        const items = makeItems();
        const setExpanded = jest.fn();
        render(
            buildComponent({
                show: true,
                expanded: true,
                listRef: listRef.result.current,
                items,
                setExpanded,
            })
        );
        const $ul = screen.getByRole('menu');
        const [$first] = within($ul).getAllByRole('menuitem');
        const [[, , firstCallback]] = items;

        const user = userEvent.setup();
        await user.click($first);
        expect(firstCallback).toHaveBeenCalled();
        expect($ul).toHaveAttribute('aria-activedescendant', '');
        expect(setExpanded).toHaveBeenCalledWith(false);
    });
    test("renders with HTMLiElement's className correctly", () => {
        const listRef = createRef();
        const items = makeItems();
        render(
            buildComponent({
                show: true,
                expanded: true,
                listRef: listRef.result.current,
                items,
                focused: 0,
            })
        );
        const $ul = screen.getByRole('menu');
        const [$first] = within($ul).getAllByRole('menuitem');
        expect($first).toHaveClass(MenuItem.styles.focused);
    });
    test('renders mouse over with HTMLiElement reference as null correctly', async () => {
        const listRef = createRef();
        const items = makeItems();
        const setFocused = jest.fn();
        render(
            buildComponent({
                show: true,
                expanded: true,
                listRef: listRef.result.current,
                items,
                setFocused,
            })
        );
        const $ul = screen.getByRole('menu');
        const [$first] = within($ul).getAllByRole('menuitem');

        listRef.result.current.current[0] = null;

        const user = userEvent.setup();
        await user.hover($first);
        expect($ul).toHaveAttribute('aria-activedescendant', '');
        expect(setFocused).toHaveBeenCalledWith(0);
    });
    test('renders mouse over at the HTMLiElement without id attribute correctly', async () => {
        const listRef = createRef();
        const items = makeItems();
        const setFocused = jest.fn();
        render(
            buildComponent({
                show: true,
                expanded: true,
                listRef: listRef.result.current,
                items,
                setFocused,
            })
        );
        const $ul = screen.getByRole('menu');
        const [$first] = within($ul).getAllByRole('menuitem');
        $first.removeAttribute('id');

        const user = userEvent.setup();
        await user.hover($first);
        expect($ul).toHaveAttribute('aria-activedescendant', '');
        expect(setFocused).toHaveBeenCalledWith(0);
    });
    test('renders mouse over at the HTMLiElement correctly', async () => {
        const listRef = createRef();
        const items = makeItems();
        const setFocused = jest.fn();
        render(
            buildComponent({
                show: true,
                expanded: true,
                listRef: listRef.result.current,
                items,
                setFocused,
            })
        );
        const $ul = screen.getByRole('menu');
        const [$first] = within($ul).getAllByRole('menuitem');

        const user = userEvent.setup();
        await user.hover($first);
        expect($ul).toHaveAttribute('aria-activedescendant', $first.id);
        expect(setFocused).toHaveBeenCalledWith(0);
    });
});
