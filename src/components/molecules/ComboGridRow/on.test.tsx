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
    });
});
