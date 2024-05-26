import { useEffect, useRef } from 'react';

export const useInputFiltering = (
    value: string,
    list: string[],
    selected: number,
    allow: boolean
) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        const { current: $input } = inputRef;
        if (!allow || !$input || value.length === 0 || list.length === 0) {
            return;
        }
        const option = list[selected > -1 ? selected : 0];
        setTimeout(() => {
            $input.value = option;
            $input.setSelectionRange(value.length, option.length);
        }, 0);
    }, [allow, selected, inputRef, value, list]);
    return inputRef;
};
