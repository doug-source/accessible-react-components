import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode, useRef, useState } from 'react';
import { act } from 'react-dom/test-utils';
import { useKeydown } from './hooks';

function setup(jsx: ReactNode) {
    return {
        user: userEvent.setup(),
        ...render(jsx),
    };
}

function triggerHookFlow() {
    const {
        result: {
            current: { tablistRef: ref, setManual, onFirstClick, onLastClick },
        },
    } = renderHook(() => {
        const [manual, setManual] = useState(false);
        const ref = useRef<HTMLDivElement>(null);
        useKeydown(ref, manual);
        return {
            tablistRef: ref,
            setManual,
            onFirstClick: jest.fn(),
            onLastClick: jest.fn(),
        };
    });
    const { user } = setup(
        <div ref={ref} className="tablist">
            <button role="tab" id="first" type="button" onClick={onFirstClick}>
                First
            </button>
            <button role="tab" id="last" type="button" onClick={onLastClick}>
                Last
            </button>
        </div>
    );
    return { user, setManual, onFirstClick, onLastClick };
}

describe('useKeydown hook', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    test('runs when the ref keeps null', async () => {
        const { user } = setup(<></>);
        renderHook(() => {
            const ref = useRef<HTMLDivElement>(null);
            useKeydown(ref, false);
        });
        const $active = document.activeElement;
        await user.keyboard('{Home}');
        expect(document.activeElement).toBe($active);
    });
    test("runs when the activeElement's parentElement not is in ref.current", async () => {
        const {
            result: { current: ref },
        } = renderHook(() => useRef<HTMLDivElement>(null));
        renderHook(() => useKeydown(ref, false));
        const { user } = setup(
            <>
                <div ref={ref} className="tablist">
                    <button role="tab" type="button"></button>
                </div>
                <div data-testid="another"></div>
            </>
        );
        const $another = screen.getByTestId('another');
        await user.click($another);
        await user.keyboard('{Home}');
        expect(document.activeElement?.parentElement).not.toBe(ref.current);
    });
    test('runs with triggering ArrowRight correctly', async () => {
        const { user, setManual, onFirstClick } = triggerHookFlow();

        const $first = screen.getByText('First');
        $first.focus();
        await user.keyboard('{ArrowRight}');
        expect(screen.getByText('Last')).toHaveFocus();
        act(() => setManual(true));
        await user.keyboard('{ArrowRight}');
        expect($first).toHaveFocus();
        expect(onFirstClick).toHaveBeenCalled();
    });
    test('runs with triggering ArrowLeft correctly', async () => {
        const { user, setManual, onLastClick } = triggerHookFlow();

        const $last = screen.getByText('Last');
        $last.focus();
        await user.keyboard('{ArrowLeft}');
        expect(screen.getByText('First')).toHaveFocus();
        act(() => setManual(true));
        await user.keyboard('{ArrowLeft}');
        expect($last).toHaveFocus();
        expect(onLastClick).toHaveBeenCalled();
    });
    test('runs with triggering Home correctly', async () => {
        const { user, setManual, onFirstClick } = triggerHookFlow();

        const $last = screen.getByText('Last');
        $last.focus();
        await user.keyboard('{Home}');
        const $first = screen.getByText('First');
        expect($first).toHaveFocus();
        act(() => setManual(true));
        $last.focus();
        await user.keyboard('{Home}');
        expect($first).toHaveFocus();
        expect(onFirstClick).toHaveBeenCalled();
    });
    test('runs with triggering End correctly', async () => {
        const { user, setManual, onLastClick } = triggerHookFlow();

        const $first = screen.getByText('First');
        $first.focus();
        await user.keyboard('{End}');
        const $last = screen.getByText('Last');
        expect($last).toHaveFocus();
        act(() => setManual(true));
        $first.focus();
        await user.keyboard('{End}');
        expect($last).toHaveFocus();
        expect(onLastClick).toHaveBeenCalled();
    });
});
