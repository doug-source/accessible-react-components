import '@testing-library/jest-dom';
import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentPropsWithoutRef, useRef } from 'react';
import { OkBtn } from './index';

const runHook = () => {
    return renderHook(() => useRef<HTMLButtonElement | null>(null));
};

const detashRef = (ref: ReturnType<typeof runHook>) => ref.result.current;

const createBtn = (text: string) => {
    const $button = document.createElement('button');
    $button.innerHTML = text;
    return $button;
};

type ElementProps = ComponentPropsWithoutRef<typeof OkBtn>;
type keys = 'onSelect' | 'beforeYearBtnRef';
type Props = Omit<ElementProps, keys> & Partial<Pick<ElementProps, keys>>;

const buildComponent = ({
    children = 'content',
    onSelect = () => true,
    beforeYearBtnRef = detashRef(runHook()),
}: Props = {}) => {
    return (
        <OkBtn beforeYearBtnRef={beforeYearBtnRef} onSelect={onSelect}>
            {children}
        </OkBtn>
    );
};

describe('<OkBtn /> component', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    test('renders correctly', () => {
        const { rerender } = render(buildComponent());
        const $el = screen.getByText('content');
        expect($el).toBeInTheDocument();
        const textContent = 'another content';
        rerender(buildComponent({ children: textContent }));
        expect($el).toBeInTheDocument();
        expect($el).toHaveTextContent(textContent);
    });
    test('runs calling btnHandler by Enter keydown event correctly', async () => {
        const onSelect = jest.fn();
        render(buildComponent({ onSelect }));
        const $el = screen.getByText('content');
        $el.focus();
        const user = userEvent.setup();
        await user.keyboard('{Enter}');
        expect(onSelect).toHaveBeenCalled();
    });
    test('runs calling btnHandler by Tab keydown event correctly', async () => {
        const hookRef = runHook();
        render(buildComponent({ beforeYearBtnRef: hookRef.result.current }));
        const $el = screen.getByText('content');
        const $beforeYearButton = createBtn('Before Year');
        const $otherButton = createBtn('other button');
        document.body.append($beforeYearButton, $otherButton);
        act(() => {
            hookRef.result.current.current = $beforeYearButton;
        });
        const user = userEvent.setup();
        $el.focus();
        await user.keyboard('{Shift>}{Tab>}{/Tab}{/Shift}');
        expect($beforeYearButton).not.toHaveFocus();
    });
    test('runs calling btnHandler by Shift+Tab keydown event correctly', async () => {
        const hookRef = runHook();
        render(buildComponent({ beforeYearBtnRef: hookRef.result.current }));
        const $el = screen.getByText('content');
        const $beforeYearButton = createBtn('Before Year');
        const $otherButton = createBtn('other button');
        document.body.append($beforeYearButton, $otherButton);
        act(() => {
            hookRef.result.current.current = $beforeYearButton;
        });
        const user = userEvent.setup();
        $el.focus();
        await user.keyboard('{Tab>}{/Tab}');
        expect($beforeYearButton).toHaveFocus();
    });
});
