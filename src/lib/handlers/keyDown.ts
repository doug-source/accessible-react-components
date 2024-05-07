import { KeyboardEvent, KeyboardEventHandler } from 'react';

export const detachEventCallback = <T>(
    evt: KeyboardEvent<T>,
    keys: [string, (evt: KeyboardEvent<T>) => boolean][]
) => {
    if (evt.key.length === 1 && evt.key !== ' ') {
        return keys.find(([key]) => key === '{typing}')?.[1];
    }
    return keys.find(([key]) => evt.key === key)?.[1];
};

export const makeKeydownHandler = <T extends HTMLElement>(
    keys: Parameters<typeof detachEventCallback<T>>[1]
): KeyboardEventHandler<T> => {
    return (evt) => {
        const callback = detachEventCallback(evt, keys);
        if (callback?.(evt)) {
            evt.stopPropagation();
            evt.preventDefault();
        }
    };
};
