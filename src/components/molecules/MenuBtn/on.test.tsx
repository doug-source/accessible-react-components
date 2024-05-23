import '@testing-library/jest-dom';
import { render, renderHook, screen, within } from '@testing-library/react';
import { useRef } from 'react';
import { Arrow } from '../../atoms/Arrow';
import styles from './ActMenuBtn.module.scss';
import { MenuBtn } from './index';

const makeBtnRef = (btn: HTMLButtonElement | null = null) => {
    return renderHook(() => useRef<HTMLButtonElement | null>(btn));
};

const makeMenuItemListRef = <T,>(itemList: T[] = []) => {
    return renderHook(() => useRef<T[]>(itemList));
};

describe('<MenuBtn /> component', () => {
    test('renders correctly', () => {
        const { rerender } = render(
            <MenuBtn
                expanded={false}
                setExpanded={() => {}}
                setFocused={() => {}}
                aria-controls="anyone"
                menuBtnRef={makeBtnRef().result.current}
                menuItemListRef={makeMenuItemListRef().result.current}
            >
                btn content
            </MenuBtn>
        );
        const $el = screen.getByRole('button');
        expect($el).toBeInTheDocument();
        expect($el).toHaveClass(styles.menuArrowBtn);
        expect($el).toHaveAttribute('aria-expanded', 'false');
        const $span = within($el).getByText('btn content');
        expect($span).toBeInTheDocument();
        expect($span).toHaveTextContent('btn content');
        const $arrow = within($el).getByTitle('arrow');
        expect($arrow).toBeInTheDocument();
        expect($arrow).toHaveClass(styles.icon);
        expect($arrow).toHaveClass(Arrow.styles.complete);
        expect($arrow).toHaveClass(Arrow.styles.bottom);
        rerender(
            <MenuBtn
                expanded={true}
                setExpanded={() => {}}
                setFocused={() => {}}
                aria-controls="otherElement"
                menuBtnRef={makeBtnRef().result.current}
                menuItemListRef={makeMenuItemListRef().result.current}
            >
                btn content
            </MenuBtn>
        );
        expect($el).toBeInTheDocument();
        expect($el).toHaveAttribute('aria-expanded', 'true');
        expect($el).toHaveAttribute('aria-controls', 'otherElement');
        expect($arrow).toHaveClass(styles.icon);
        expect($arrow).toHaveClass(Arrow.styles.top);
    });
});
