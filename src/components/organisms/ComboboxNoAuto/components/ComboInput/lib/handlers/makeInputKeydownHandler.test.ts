import '@testing-library/jest-dom';
import { KeyboardEvent } from 'react';
import { makeInputKeydownHandler } from './makeInputKeydownHandler';

const makeParameters = () => {
    const items: string[] = [];
    return [false, () => {}, -1, () => {}, () => {}, items] as const;
};

const makeEvent = (key: string) => {
    return {
        key,
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
    } as unknown as KeyboardEvent<HTMLInputElement>;
};

describe('makeInputKeydownHandler function', () => {
    test('runs correctly', () => {
        const outputFn = makeInputKeydownHandler(...makeParameters());
        expect(typeof outputFn).toBe('function');
    });
    test('runs with Enter + expanded equal false correctly', () => {
        const expandedFn = jest.fn();
        const selectedFn = jest.fn();
        const onChangeFn = jest.fn();
        const items = ['one', 'two'];
        const handle = makeInputKeydownHandler(
            false,
            expandedFn,
            0,
            selectedFn,
            onChangeFn,
            items
        );
        handle(makeEvent('Enter'));
        expect(expandedFn).not.toHaveBeenCalled();
        expect(selectedFn).not.toHaveBeenCalled();
        expect(onChangeFn).not.toHaveBeenCalled();
    });
    test('runs with Enter + selected equal false correctly', () => {
        const expandedFn = jest.fn();
        const selectedFn = jest.fn();
        const onChangeFn = jest.fn();
        const items = ['one', 'two'];
        const handle = makeInputKeydownHandler(
            false,
            expandedFn,
            -1,
            selectedFn,
            onChangeFn,
            items
        );
        handle(makeEvent('Enter'));
        expect(expandedFn).not.toHaveBeenCalled();
        expect(selectedFn).not.toHaveBeenCalled();
        expect(onChangeFn).not.toHaveBeenCalled();
    });
    test('runs with Enter correctly', () => {
        const expandedFn = jest.fn();
        const selectedFn = jest.fn();
        const onChangeFn = jest.fn();
        const items = ['one', 'two'];
        const handle = makeInputKeydownHandler(
            true,
            expandedFn,
            0,
            selectedFn,
            onChangeFn,
            items
        );
        handle(makeEvent('Enter'));
        expect(expandedFn).toHaveBeenCalledWith(false);
        expect(selectedFn).toHaveBeenCalledWith(-1);
        expect(onChangeFn).toHaveBeenCalledWith('one');
    });
    test('runs with ArrowDown/ArrowUp + expanded changing correctly', () => {
        let expandedFn = jest.fn();
        let selectedFn = jest.fn();
        const items = ['one', 'two', 'three'];
        let handle = makeInputKeydownHandler(
            false,
            expandedFn,
            1,
            selectedFn,
            () => {},
            items
        );
        handle(makeEvent('ArrowDown'));
        expect(expandedFn).toHaveBeenCalledWith(true);
        expect(selectedFn).toHaveBeenCalledWith(2);
        // --------------
        expandedFn = jest.fn();
        selectedFn = jest.fn();
        handle = makeInputKeydownHandler(
            true,
            expandedFn,
            1,
            selectedFn,
            () => {},
            items
        );
        handle(makeEvent('ArrowUp'));
        expect(expandedFn).not.toHaveBeenCalled();
        expect(selectedFn).toHaveBeenCalledWith(0);
    });
    test('runs with ArrowUp/ArrowDown + expanded changing correctly', () => {
        let expandedFn = jest.fn();
        let selectedFn = jest.fn();
        const items = ['one', 'two', 'three'];
        let handle = makeInputKeydownHandler(
            false,
            expandedFn,
            1,
            selectedFn,
            () => {},
            items
        );
        handle(makeEvent('ArrowUp'));
        expect(expandedFn).toHaveBeenCalledWith(true);
        expect(selectedFn).toHaveBeenCalledWith(0);
        // --------------
        expandedFn = jest.fn();
        selectedFn = jest.fn();
        handle = makeInputKeydownHandler(
            true,
            expandedFn,
            1,
            selectedFn,
            () => {},
            items
        );
        handle(makeEvent('ArrowDown'));
        expect(expandedFn).not.toHaveBeenCalled();
        expect(selectedFn).toHaveBeenCalledWith(2);
    });
    test('runs with Escape correctly', () => {
        const expandedFn = jest.fn();
        const selectedFn = jest.fn();
        const items = ['one', 'two'];
        const handle = makeInputKeydownHandler(
            false,
            expandedFn,
            0,
            selectedFn,
            () => {},
            items
        );
        handle(makeEvent('Escape'));
        expect(expandedFn).toHaveBeenCalledWith(false);
        expect(selectedFn).toHaveBeenCalledWith(-1);
    });
    test('runs with {typing}/Espace correctly', () => {
        let expandedFn = jest.fn();
        let selectedFn = jest.fn();
        const items = ['one', 'two'];
        let handle = makeInputKeydownHandler(
            false,
            expandedFn,
            0,
            selectedFn,
            () => {},
            items
        );
        handle(makeEvent('a'));
        expect(expandedFn).toHaveBeenCalledWith(true);
        expect(selectedFn).toHaveBeenCalledWith(-1);
        // --------------
        expandedFn = jest.fn();
        selectedFn = jest.fn();
        handle = makeInputKeydownHandler(
            true,
            expandedFn,
            0,
            selectedFn,
            () => {},
            items
        );
        handle(makeEvent(' '));
        expect(expandedFn).not.toHaveBeenCalled();
        expect(selectedFn).toHaveBeenCalledWith(-1);
    });
});
