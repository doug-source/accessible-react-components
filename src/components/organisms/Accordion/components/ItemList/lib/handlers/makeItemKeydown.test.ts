import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { KeyboardEvent, useRef } from 'react';
import { accessItem, makeItemKeyDown, turnItemActive } from './makeItemKeydown';

const makeRefList = () => {
    const initialProps: { list: (HTMLButtonElement | null)[] } = { list: [] };
    return renderHook(
        ({ list }) => {
            return useRef<(HTMLButtonElement | null)[]>(list);
        },
        { initialProps }
    );
};

const makeCustomBtn = (
    id: string,
    clickFn: () => void,
    focusFn: () => void
) => {
    const btn = document.createElement('button');
    btn.setAttribute('id', id);
    btn.setAttribute('aria-expanded', 'false');
    btn.onclick = clickFn;
    btn.onfocus = focusFn;
    return btn;
};

const makeBtn = (id: string) => {
    const btn = document.createElement('button');
    btn.id = id;
    return btn;
};

const appendBtns = () => {
    const btnsData: { id: string; click: JestFn; focus: JestFn }[] = [
        { id: 'firstId', click: jest.fn(), focus: jest.fn() },
        { id: 'secondId', click: jest.fn(), focus: jest.fn() },
        { id: 'thirdId', click: jest.fn(), focus: jest.fn() },
    ];
    const btns = btnsData.map(({ id, click, focus }) => {
        const btn = makeCustomBtn(
            id,
            () => {
                btn.setAttribute('aria-expanded', 'true');
                click();
            },
            () => {
                focus();
            }
        );
        return btn;
    });
    return [btnsData, btns] as const;
};

const makeKeyboardEvent = (key: string) => {
    return {
        key,
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
    } as unknown as KeyboardEvent<HTMLElement>;
};

describe('accessItem function', () => {
    test('runs with output correctly', () => {
        const hookRef = makeRefList();
        let element = accessItem(hookRef.result.current, 'first');
        expect(typeof element).toBe('undefined');
        hookRef.result.current.current = ['firstId', 'secondId', 'thirdId'].map(
            (id) => makeBtn(id)
        );
        element = accessItem(hookRef.result.current, 'first');
        expect(element).toBeDefined();
        expect(element).toHaveAttribute('id', 'firstId');
        element = accessItem(hookRef.result.current, 'last');
        expect(element).toBeDefined();
        expect(element).toHaveAttribute('id', 'thirdId');
    });
});

type JestFn = ReturnType<typeof jest.fn>;

describe('turnItemActive function', () => {
    test('runs correctly', () => {
        const hookRef = makeRefList();
        const output = turnItemActive(hookRef.result.current, 'first');
        expect(output).toBe(true);
        const [btnsData, btns] = appendBtns();
        hookRef.result.current.current = btns;
        btns.forEach((btn) => document.body.append(btn ?? ''));

        // first
        let [btnActive] = hookRef.result.current.current;
        expect(btnActive?.getAttribute('aria-expanded')).toBe('false');
        turnItemActive(hookRef.result.current, 'first');
        expect(btnsData.at(0)?.click).toHaveBeenCalled();
        expect(btnsData.at(0)?.focus).toHaveBeenCalled();
        expect(btnActive?.getAttribute('aria-expanded')).toBe('true');
        // last
        [, , btnActive] = hookRef.result.current.current;
        expect(btnActive?.getAttribute('aria-expanded')).toBe('false');
        turnItemActive(hookRef.result.current, 'last');
        expect(btnsData.at(-1)?.click).toHaveBeenCalled();
        expect(btnsData.at(-1)?.focus).toHaveBeenCalled();
        expect(btnActive?.getAttribute('aria-expanded')).toBe('true');
    });
});

describe('makeItemKeyDown function', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });
    test('returns a function correctly', () => {
        const hookRef = makeRefList();
        const handlerFn = makeItemKeyDown(hookRef.result.current);
        expect(typeof handlerFn).toBe('function');
    });
    test('runs triggering the event no activation', () => {
        const hookRef = makeRefList();
        const [btnsData, btns] = appendBtns();
        btns.forEach((btn) => document.body.append(btn ?? ''));
        hookRef.result.current.current = btns;
        const handlerFn = makeItemKeyDown(hookRef.result.current);
        // none active
        const event = makeKeyboardEvent('ArrowRight');
        handlerFn(event);
        const [otherBtnOne, otherBtnTwo, otherBtnThree] =
            hookRef.result.current.current;
        expect(btnsData.at(0)?.click).not.toHaveBeenCalled();
        expect(btnsData.at(0)?.focus).not.toHaveBeenCalled();
        expect(otherBtnOne?.getAttribute('aria-expanded')).toBe('false');
        expect(btnsData.at(1)?.click).not.toHaveBeenCalled();
        expect(btnsData.at(1)?.focus).not.toHaveBeenCalled();
        expect(otherBtnTwo?.getAttribute('aria-expanded')).toBe('false');
        expect(btnsData.at(-1)?.click).not.toHaveBeenCalled();
        expect(btnsData.at(-1)?.focus).not.toHaveBeenCalled();
        expect(otherBtnThree?.getAttribute('aria-expanded')).toBe('false');
    });
    test('runs triggering the event at first button correctly', () => {
        const hookRef = makeRefList();
        const [btnsData, btns] = appendBtns();
        btns.forEach((btn) => document.body.append(btn ?? ''));
        hookRef.result.current.current = btns;
        const handlerFn = makeItemKeyDown(hookRef.result.current);
        // first active
        const event = makeKeyboardEvent('Home');
        handlerFn(event);
        const [otherBtnOne, otherBtnTwo, otherBtnThree] =
            hookRef.result.current.current;
        expect(btnsData.at(0)?.click).toHaveBeenCalled();
        expect(btnsData.at(0)?.focus).toHaveBeenCalled();
        expect(otherBtnOne?.getAttribute('aria-expanded')).toBe('true');
        expect(btnsData.at(1)?.click).not.toHaveBeenCalled();
        expect(btnsData.at(1)?.focus).not.toHaveBeenCalled();
        expect(otherBtnTwo?.getAttribute('aria-expanded')).toBe('false');
        expect(btnsData.at(-1)?.click).not.toHaveBeenCalled();
        expect(btnsData.at(-1)?.focus).not.toHaveBeenCalled();
        expect(otherBtnThree?.getAttribute('aria-expanded')).toBe('false');
    });
    test('runs triggering the event at last button correctly', () => {
        const hookRef = makeRefList();
        const [btnsData, btns] = appendBtns();
        btns.forEach((btn) => document.body.append(btn ?? ''));
        hookRef.result.current.current = btns;
        const handlerFn = makeItemKeyDown(hookRef.result.current);
        // last active
        const event = makeKeyboardEvent('End');
        handlerFn(event);
        const [otherBtnOne, otherBtnTwo, otherBtnThree] =
            hookRef.result.current.current;
        expect(btnsData.at(0)?.click).not.toHaveBeenCalled();
        expect(btnsData.at(0)?.focus).not.toHaveBeenCalled();
        expect(otherBtnOne?.getAttribute('aria-expanded')).toBe('false');
        expect(btnsData.at(1)?.click).not.toHaveBeenCalled();
        expect(btnsData.at(1)?.focus).not.toHaveBeenCalled();
        expect(otherBtnTwo?.getAttribute('aria-expanded')).toBe('false');
        expect(btnsData.at(-1)?.click).toHaveBeenCalled();
        expect(btnsData.at(-1)?.focus).toHaveBeenCalled();
        expect(otherBtnThree?.getAttribute('aria-expanded')).toBe('true');
    });
});
