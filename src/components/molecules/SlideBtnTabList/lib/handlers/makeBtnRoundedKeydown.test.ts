import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { KeyboardEvent, useRef } from 'react';
import { makeBtnRoundedKeydownHandler } from './makeBtnRoundedKeydown';

const createBtn = () => {
    return { focus: jest.fn() } as unknown as HTMLButtonElement;
};

const makeEvent = (key: string) => {
    return {
        key,
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
    } as unknown as KeyboardEvent<HTMLElement>;
};

const createRef = (list: (HTMLButtonElement | null)[] = []) => {
    return renderHook(() => useRef<(HTMLButtonElement | null)[]>(list));
};

const handlerDefaults = () => {
    const setSelected = () => {};
    const list: string[] = [];
    const hookRef = createRef();
    const btnListRef = hookRef.result.current;
    const i = 0;
    return { setSelected, list, hookRef, btnListRef, i };
};

describe('makeBtnRoundedKeydownHandler function', () => {
    test('runs correctly', () => {
        const defaults = handlerDefaults();
        const outputFn = makeBtnRoundedKeydownHandler(
            defaults.setSelected,
            defaults.list,
            defaults.btnListRef,
            defaults.i
        );
        expect(typeof outputFn).toBe('function');
    });
    test('runs no calling Home|End correctly', () => {
        const defaults = Object.assign(handlerDefaults(), {
            setSelected: jest.fn(),
            list: new Array(3),
        });
        makeBtnRoundedKeydownHandler(
            defaults.setSelected,
            defaults.list,
            defaults.btnListRef,
            defaults.i
        )(makeEvent('a'));
        expect(defaults.setSelected).not.toHaveBeenCalled();
    });
    test('runs calling Home correctly', () => {
        const defaults = Object.assign(handlerDefaults(), {
            setSelected: jest.fn(),
            list: new Array(3),
        });
        makeBtnRoundedKeydownHandler(
            defaults.setSelected,
            defaults.list,
            defaults.btnListRef,
            defaults.i
        )(makeEvent('Home'));
        expect(defaults.setSelected).toHaveBeenCalledWith(0);
    });
    test('runs calling End correctly', () => {
        const list = new Array(3);
        const defaults = Object.assign(handlerDefaults(), {
            setSelected: jest.fn(),
            list,
        });
        makeBtnRoundedKeydownHandler(
            defaults.setSelected,
            defaults.list,
            defaults.btnListRef,
            defaults.i
        )(makeEvent('End'));
        expect(defaults.setSelected).toHaveBeenCalledWith(list.length - 1);
    });
    test('runs no calling ArrowLeft|ArrowRight correctly', () => {
        const defaults = Object.assign(handlerDefaults(), {
            setSelected: jest.fn(),
            list: new Array(3),
        });
        defaults.btnListRef.current = [createBtn(), createBtn(), createBtn()];
        makeBtnRoundedKeydownHandler(
            defaults.setSelected,
            defaults.list,
            defaults.btnListRef,
            defaults.i
        )(makeEvent('a'));
        defaults.btnListRef.current.forEach((btn) =>
            expect(btn?.focus).not.toHaveBeenCalled()
        );
        expect(defaults.setSelected).not.toHaveBeenCalled();
    });
    test('runs calling ArrowLeft correctly', () => {
        const defaults = Object.assign(handlerDefaults(), {
            setSelected: jest.fn(),
            list: new Array(3),
            i: 1,
        });
        defaults.btnListRef.current = [createBtn(), createBtn(), createBtn()];
        makeBtnRoundedKeydownHandler(
            defaults.setSelected,
            defaults.list,
            defaults.btnListRef,
            defaults.i
        )(makeEvent('ArrowLeft'));
        const firstIndex = 0;
        expect(
            defaults.btnListRef.current[firstIndex]?.focus
        ).toHaveBeenCalled();
        expect(defaults.setSelected).toHaveBeenCalledWith(firstIndex);
    });
    test('runs calling ArrowLeft from first correctly', () => {
        const list = new Array(3);
        const defaults = Object.assign(handlerDefaults(), {
            setSelected: jest.fn(),
            list,
            i: 0,
        });
        defaults.btnListRef.current = [createBtn(), createBtn(), createBtn()];
        makeBtnRoundedKeydownHandler(
            defaults.setSelected,
            defaults.list,
            defaults.btnListRef,
            defaults.i
        )(makeEvent('ArrowLeft'));
        const lastIndex = list.length - 1;
        expect(
            defaults.btnListRef.current[lastIndex]?.focus
        ).toHaveBeenCalled();
        expect(defaults.setSelected).toHaveBeenCalledWith(lastIndex);
    });
    test('runs calling ArrowRight correctly', () => {
        const defaults = Object.assign(handlerDefaults(), {
            setSelected: jest.fn(),
            list: new Array(3),
            i: 0,
        });
        defaults.btnListRef.current = [createBtn(), createBtn(), createBtn()];
        makeBtnRoundedKeydownHandler(
            defaults.setSelected,
            defaults.list,
            defaults.btnListRef,
            defaults.i
        )(makeEvent('ArrowRight'));
        const secondIndex = 1;
        expect(
            defaults.btnListRef.current[secondIndex]?.focus
        ).toHaveBeenCalled();
        expect(defaults.setSelected).toHaveBeenCalledWith(secondIndex);
    });
    test('runs calling ArrowRight from last correctly', () => {
        const list = new Array(3);
        const defaults = Object.assign(handlerDefaults(), {
            setSelected: jest.fn(),
            list,
            i: list.length - 1,
        });
        defaults.btnListRef.current = [createBtn(), createBtn(), createBtn()];
        makeBtnRoundedKeydownHandler(
            defaults.setSelected,
            defaults.list,
            defaults.btnListRef,
            defaults.i
        )(makeEvent('ArrowRight'));
        const firstIndex = 0;
        expect(
            defaults.btnListRef.current[firstIndex]?.focus
        ).toHaveBeenCalled();
        expect(defaults.setSelected).toHaveBeenCalledWith(firstIndex);
    });
});
