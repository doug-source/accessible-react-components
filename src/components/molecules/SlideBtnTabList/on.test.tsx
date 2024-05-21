import '@testing-library/jest-dom';
import {
    act,
    render,
    renderHook,
    screen,
    within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef, useRef } from 'react';
import styles from './SlideBtnTabList.module.scss';
import { SlideBtnTabList } from './index';

const createList = (): string[] => [];
const createListHookRef = <T,>(initial: T[] = []) => {
    return renderHook(() => useRef<T[]>(initial));
};

type ElementProps = ComponentPropsWithoutRef<typeof SlideBtnTabList>;
type keys = 'list' | 'selected' | 'setSelected' | 'itemBoxListRef';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    list = createList(),
    selected = -1,
    setSelected = () => {},
    itemBoxListRef = createListHookRef<HTMLDivElement>().result.current,
}: Props = {}) => (
    <SlideBtnTabList
        list={list}
        selected={selected}
        setSelected={setSelected}
        itemBoxListRef={itemBoxListRef}
        data-testid="test-element"
    />
);

describe('<SlideBtnTabList /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByTestId('test-element');
        expect($el).toBeInTheDocument();
    });
    test('renders calling onFocus|onBlur correctly', () => {
        const list = ['first', 'second', 'third'];
        render(buildComponent({ list }));
        const $el = screen.getByTestId('test-element');
        expect($el).not.toHaveClass(styles.focused);
        const $btn = within($el).getByRole('tab', { name: 'Slide 1' });
        act(() => {
            $btn?.focus();
        });
        expect($el).toHaveClass(styles.focused);
        act(() => {
            $btn?.blur();
        });
        expect($el).not.toHaveClass(styles.focused);
    });
    test('renders clicking on button correctly', async () => {
        const setSelected = jest.fn();
        const list = ['first', 'second', 'third'];
        render(buildComponent({ list, setSelected }));
        const $el = screen.getByTestId('test-element');
        const $btn = within($el).getByRole('tab', { name: 'Slide 2' });
        const user = userEvent.setup();
        await user.click($btn);
        expect(setSelected).toHaveBeenCalledWith(1);
    });
    test('renders clicking on button correctly', async () => {
        const list = ['first', 'second', 'third'];
        render(buildComponent({ list, selected: 1 }));
        const $el = screen.getByTestId('test-element');
        const $btn = within($el).getByRole('tab', { name: 'Slide 2' });
        const remainBtns = within($el)
            .getAllByRole('tab')
            .filter((btn) => btn.getAttribute('aria-label') !== 'Slide 2');
        expect($btn).not.toHaveAttribute('tabindex');
        remainBtns.forEach(($btn) =>
            expect($btn).toHaveAttribute('tabindex', '-1')
        );
    });
});
