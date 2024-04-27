import { KeyboardEvent, KeyboardEventHandler } from 'react';

export const makeKeydownHandler = <T extends HTMLElement>(
    keys: [string, (evt: KeyboardEvent<T>) => boolean][]
): KeyboardEventHandler<T> => {
    return (evt) => {
        const eventCallback = keys.find(([key]) => evt.key === key);
        if (!eventCallback) {
            return;
        }
        const [, callback] = eventCallback;
        if (callback(evt)) {
            evt.stopPropagation();
            evt.preventDefault();
        }
    };
};
