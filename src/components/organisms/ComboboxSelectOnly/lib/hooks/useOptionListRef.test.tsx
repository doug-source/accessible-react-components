import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { isValidElement } from 'react';
import { useOptionListRef, useReferences, useStates } from './useOptionListRef';

describe('useOptionListRef hook', () => {
    test('runs correctly', () => {
        const initialProps: { itemList: string[] } = { itemList: [] };
        const hookRef = renderHook(
            ({ itemList }) => useOptionListRef<string>(itemList),
            {
                initialProps,
            }
        );
        expect(hookRef.result.current.current).toHaveLength(0);
        const newList = ['item-1'];
        hookRef.rerender({ itemList: newList });
        waitFor(() => {
            expect(hookRef.result.current.current).toHaveLength(1);
            expect(hookRef.result.current.current).toMatchObject(newList);
        });
    });
});

describe('useReferences hook', () => {
    test('runs correctly', () => {
        const initialProps: { itemList: string[] } = { itemList: [] };
        const hookRef = renderHook(
            ({ itemList }) => useReferences<string>(itemList),
            {
                initialProps,
            }
        );
        expect(Array.isArray(hookRef.result.current)).toBe(true);
        expect(hookRef.result.current).toHaveLength(2);
        const [comboMenuRef, optionListRef] = hookRef.result.current;
        expect(comboMenuRef?.current).toBeNull();
        expect(Array.isArray(optionListRef.current)).toBe(true);
        expect(optionListRef.current).toHaveLength(0);
    });
});

describe('useStates hook', () => {
    test('runs correctly', () => {
        const initialProps: { itemName: string } = { itemName: 'The name' };
        const hookRef = renderHook(({ itemName }) => useStates(itemName), {
            initialProps,
        });
        const { current: outputHook } = hookRef.result;
        expect(outputHook).toBeDefined();
        expect(outputHook.focused).toBeNull();
        expect(typeof outputHook.setFocused).toBe('function');
        expect(outputHook.selected).toBeNull();
        expect(typeof outputHook.setSelected).toBe('function');
        expect(isValidElement(outputHook.labelSelected)).toBe(true);
        expect(typeof outputHook.setLabelSelected).toBe('function');
        expect(outputHook.expanded).toBe(false);
        expect(typeof outputHook.setExpanded).toBe('function');
        expect(outputHook.activeOpt).toBeNull();
        expect(typeof outputHook.setActiveOpt).toBe('function');
        expect(outputHook.showActiveOpt).toBe(false);
        expect(typeof outputHook.setShowActiveOpt).toBe('function');
    });
});
