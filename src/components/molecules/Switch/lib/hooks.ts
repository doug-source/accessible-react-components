import { MutableRefObject, SetStateAction, useCallback } from 'react';

export const useToogleAriaChecked = (
    ref: MutableRefObject<HTMLDivElement | null>,
    ariaChecked: boolean,
    setAriaChecked: (value: SetStateAction<boolean>) => void,
    onChange?: (status: boolean) => void
) => {
    return useCallback(() => {
        const { current: $switch } = ref;
        if ($switch === null) {
            return;
        }
        const newValue = !ariaChecked;
        setAriaChecked(newValue);
        onChange && onChange(newValue);
    }, [ref, ariaChecked, setAriaChecked, onChange]);
};
