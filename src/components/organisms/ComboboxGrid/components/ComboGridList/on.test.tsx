import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef, useRef } from 'react';
import { ComboGridList } from './index';

const runHook = (list: (HTMLDivElement | null)[] = []) => {
    return renderHook(() => {
        return useRef<(HTMLDivElement | null)[]>(list);
    });
};

type ElementProps = ComponentPropsWithoutRef<typeof ComboGridList>;
type keys = 'items' | 'focused' | 'cellListRef' | 'cellBoolean';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    items = [['fooText', 'fooDesc']],
    focused = -1,
    cellListRef = runHook().result.current,
    cellBoolean = false,
}: Props = {}) => (
    <ComboGridList
        items={items}
        focused={focused}
        cellListRef={cellListRef}
        cellBoolean={cellBoolean}
    />
);

describe('<ComboGridList /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const rowList = screen.getAllByRole('row');
        rowList.forEach((row) => expect(row).toBeInTheDocument());
    });
});
