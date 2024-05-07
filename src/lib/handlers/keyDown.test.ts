import '@testing-library/jest-dom';
import { KeyboardEvent } from 'react';
import { detachEventCallback, makeKeydownHandler } from './keyDown';

const makeEvent = (key: string) => {
    return {
        key,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
    } as unknown as KeyboardEvent<HTMLButtonElement>;
};

describe('detachEventCallback function', () => {
    test('runs correctly', () => {
        const enterOriginCallback = () => true;
        const letterAOriginCallback = () => true;
        const spaceOriginCallback = () => true;

        const keys: [
            string,
            (evt: KeyboardEvent<HTMLButtonElement>) => boolean
        ][] = [
            ['Enter', enterOriginCallback],
            ['{typing}', letterAOriginCallback],
            [' ', spaceOriginCallback],
        ];
        const enterFinalCallback = detachEventCallback(
            makeEvent('Enter'),
            keys
        );
        expect(enterFinalCallback).toBe(enterOriginCallback);
        const aKeyFinalCallback = detachEventCallback(makeEvent('a'), keys);
        expect(aKeyFinalCallback).toBe(letterAOriginCallback);
        const spaceFinalCallback = detachEventCallback(makeEvent(' '), keys);
        expect(spaceFinalCallback).toBe(spaceOriginCallback);
    });
});

describe('makeKeydownHandler function', () => {
    test('runs returning a function correctly', () => {
        const handler = makeKeydownHandler([['any', () => true]]);
        expect(typeof handler).toBe('function');
    });
    test('runs calling the callback function correctly', () => {
        const callback = jest.fn();
        const handler = makeKeydownHandler<HTMLButtonElement>([
            [
                'Enter',
                () => {
                    callback();
                    return true;
                },
            ],
        ]);
        let event = makeEvent('Enter');
        handler(event);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
        event = makeEvent('ArrowRight');
        handler(event);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(event.stopPropagation).not.toHaveBeenCalled();
    });
});
