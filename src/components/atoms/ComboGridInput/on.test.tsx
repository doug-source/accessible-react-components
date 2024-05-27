import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import { ComponentPropsWithoutRef, useRef } from 'react';
import styles from './ComboGridInput.module.scss';
import { ComboGridInput } from './index';

const makeItems = () => {
    return [
        ['barOne', 'oneFoo'],
        ['barTwo', 'twoFoo'],
    ];
};

const runHook = (list: (HTMLDivElement | null)[] = []) => {
    const initialProps = { list };
    return renderHook(
        ({ list }) => {
            return useRef(list);
        },
        { initialProps }
    );
};

type ElementProps = ComponentPropsWithoutRef<typeof ComboGridInput>;
type keys =
    | 'expanded'
    | 'focused'
    | 'setFocused'
    | 'items'
    | 'text'
    | 'setShowItems'
    | 'onSelection'
    | 'cellListRef'
    | 'cellBoolean'
    | 'setCellBoolean';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    expanded = false,
    focused = -1,
    setFocused = () => {},
    items = makeItems(),
    text = '',
    setShowItems = () => {},
    onSelection = () => {},
    cellListRef = runHook().result.current,
    cellBoolean = false,
    setCellBoolean = () => {},
}: Props = {}) => (
    <ComboGridInput
        expanded={expanded}
        focused={focused}
        setFocused={setFocused}
        items={items}
        text={text}
        setShowItems={setShowItems}
        onSelection={onSelection}
        cellListRef={cellListRef}
        cellBoolean={cellBoolean}
        setCellBoolean={setCellBoolean}
    />
);

describe('<ComboInput /> component', () => {
    test('renders correctly', () => {
        render(buildComponent());
        const $el = screen.getByRole('combobox');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.comboInput);
    });
});
