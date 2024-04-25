import { KeyboardEvent, MutableRefObject } from 'react';

export const makeKeyShiftFocusHandler = <T extends HTMLElement>(
    ref: MutableRefObject<T | null>,
    shiftKey?: boolean
) => {
    return (evt: KeyboardEvent<T>) => {
        const { current: $btn } = ref;
        if ($btn) {
            if ((shiftKey && evt.shiftKey) || (!shiftKey && !evt.shiftKey)) {
                $btn.focus();
                return true;
            }
        }
        return false;
    };
};
