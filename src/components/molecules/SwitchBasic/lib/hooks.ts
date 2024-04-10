import { SetStateAction, useCallback } from 'react';

export const useToogleAriaChecked = (
    ariaChecked: boolean,
    setAriaChecked: (value: SetStateAction<boolean>) => void,
    onChange?: (status: boolean) => void
) => {
    return useCallback(() => {
        const newValue = !ariaChecked;
        setAriaChecked(newValue);
        onChange && onChange(newValue);
    }, [ariaChecked, setAriaChecked, onChange]);
};
