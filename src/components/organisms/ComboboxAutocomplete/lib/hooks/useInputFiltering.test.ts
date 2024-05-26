import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';
import { useInputFiltering } from './useInputFiltering';

const buildInputElement = () => {
    const $input = window.document.createElement('input');
    $input.innerText = 'content';
    $input.id = 'key';
    $input.type = 'text';
    window.document.body.append($input);
    return $input;
};

const runHook = () => {
    const list: string[] = [];
    const initialProps = {
        value: '',
        list,
        selected: -1,
        allow: true,
    };
    return renderHook(
        ({ value, list, selected, allow = true }) => {
            return useInputFiltering(value, list, selected, allow);
        },
        { initialProps }
    );
};

describe('useInputFiltering hook', () => {
    test("runs changing the input's value and setSelectionRange correctly", async () => {
        const hookRef = runHook();
        const {
            result: { current: inputRef },
        } = hookRef;
        expect(inputRef.current).toBeNull();
        const $input = buildInputElement();
        hookRef.result.current.current = $input;
        let list = ['be', 'welcome'];
        hookRef.rerender({ selected: 1, value: 'wel', list, allow: true });
        await waitFor(() => {
            expect($input).toHaveValue('welcome');
            const textSelected = 'welcome'.substring(
                $input.selectionStart ?? 0,
                $input.selectionEnd ?? 0
            );
            expect(textSelected).toBe('come');
        });
        list = ['welcome', 'be'];
        hookRef.rerender({ selected: -1, value: 'wel', list, allow: true });
        await waitFor(() => {
            expect($input).toHaveValue('welcome');
            const textSelected = 'welcome'.substring(
                $input.selectionStart ?? 0,
                $input.selectionEnd ?? 0
            );
            expect(textSelected).toBe('come');
        });
    });
});
