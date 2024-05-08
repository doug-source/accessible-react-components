import { KeyboardEvent, KeyboardEventHandler } from 'react';

export const runPredicate = <T>(
    key: string | RegExp,
    { key: eventKey }: KeyboardEvent<T>
) => {
    if (typeof key === 'string') {
        if (eventKey.length === 1 && eventKey !== ' ') {
            return key === '{typing}';
        }
        return eventKey === key;
    }
    if (eventKey.length === 1 && eventKey !== ' ') {
        return '{typing}'.search(key) > -1;
    }
    return eventKey.search(key) > -1;
};

export const detachEventCallback = <T>(
    evt: KeyboardEvent<T>,
    keys: [
        Parameters<typeof runPredicate>[0],
        (evt: KeyboardEvent<T>) => boolean
    ][]
) => keys.find(([key]) => runPredicate(key, evt))?.[1];

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
