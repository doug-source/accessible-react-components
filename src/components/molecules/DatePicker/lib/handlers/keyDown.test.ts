import '@testing-library/jest-dom';
import { KeyboardEvent } from 'react';
import { makeKeydownHandler } from './keyDown';

const makeEvent = (key: string) => {
    return {
        key,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
    } as unknown as KeyboardEvent<HTMLButtonElement>;
};

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
