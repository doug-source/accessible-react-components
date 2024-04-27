import { KeyboardEvent, MutableRefObject } from 'react';

export const makeKeyShiftFocusHandler = <T extends HTMLElement>(
    ref: MutableRefObject<T | null>,
    shiftKey?: boolean
) => {
    return (evt: KeyboardEvent<T>) => {
        const { current: $element } = ref;
        if ($element) {
            if ((shiftKey && evt.shiftKey) || (!shiftKey && !evt.shiftKey)) {
                $element.focus();
                return true;
            }
        }
        return false;
    };
};
