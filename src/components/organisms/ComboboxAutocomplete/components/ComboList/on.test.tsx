import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef, useRef } from 'react';
import { ComboList } from './index';

const makeItemsRef = (list: (HTMLLIElement | null)[] = []) => {
    return renderHook(() => useRef<(HTMLLIElement | null)[]>(list));
};

type ElementProps = ComponentPropsWithoutRef<typeof ComboList>;
type keys = 'items' | 'itemsRef' | 'selected' | 'setSelected' | 'onChange';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    items = ['first', 'second', 'third'],
    itemsRef = makeItemsRef().result.current,
    selected = -1,
    setSelected = () => {},
    onChange = () => {},
}: Props = {}) => (
    <ul>
        <ComboList
            items={items}
            itemsRef={itemsRef}
            selected={selected}
            setSelected={setSelected}
            onChange={onChange}
        />
    </ul>
);

describe('<ComboList /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const nodeItems = screen.getAllByRole('option');
        nodeItems.forEach(($item) => expect($item).toBeInTheDocument());
    });
    test('renders clicking at the item correctly', async () => {
        const setSelected = jest.fn();
        const onChange = jest.fn();
        render(buildComponent({ setSelected, onChange, selected: 0 }));
        const [$first] = screen.getAllByRole('option');
        const user = userEvent.setup();
        await user.click($first);
        expect(setSelected).toHaveBeenCalledWith(-1);
        expect(onChange).toHaveBeenCalledWith('first');
    });
    test('renders clicking at the item correctly', async () => {
        const setSelected = jest.fn();
        render(buildComponent({ setSelected }));
        const optionList = screen.getAllByRole('option');
        const user = userEvent.setup();
        await user.hover(optionList[0]);
        expect(setSelected).toHaveBeenCalledWith(0);
        await user.hover(optionList[1]);
        expect(setSelected).toHaveBeenCalledWith(1);
    });
});
