import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef, useRef } from 'react';
import styles from './ComboGridRow.module.scss';
import { ComboGridRow } from './index';

const runHook = (list: (HTMLDivElement | null)[] = []) => {
    return renderHook(() => {
        return useRef<(HTMLDivElement | null)[]>(list);
    });
};

type ElementProps = ComponentPropsWithoutRef<typeof ComboGridRow>;
type keys =
    | 'index'
    | 'focused'
    | 'cellListRef'
    | 'cellBoolean'
    | 'text'
    | 'desc';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    index = 0,
    focused = -1,
    cellListRef = runHook().result.current,
    cellBoolean = false,
    text = 'foo',
    desc = 'bar',
}: Props = {}) => (
    <ComboGridRow
        index={index}
        focused={focused}
        cellListRef={cellListRef}
        cellBoolean={cellBoolean}
        text={text}
        desc={desc}
    />
);

describe('<ComboGridRow /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $row = screen.getByRole('row');
        expect($row).toBeInTheDocument();
        expect($row).toHaveClass(styles.row);
        expect($row.firstElementChild).not.toHaveAttribute('aria-selected');
    });
    test('renders correctly', () => {
        const { rerender } = render(buildComponent({ focused: 0 }));
        const $row = screen.getByRole('row');
        const [$first, $second] = Array.from($row.children);
        expect($first).toHaveAttribute('aria-selected', 'true');
        expect($first.firstChild).toHaveClass(styles.marked);
        expect($second.firstChild).not.toHaveClass(styles.marked);
        rerender(buildComponent({ focused: 0, cellBoolean: true }));
        expect($first.firstChild).not.toHaveClass(styles.marked);
        expect($second.firstChild).toHaveClass(styles.marked);
    });
});
