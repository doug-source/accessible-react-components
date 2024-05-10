import { KeyboardEvent } from 'react';
import { makeSwitchBasicKeydownHandler } from './makeSwitchBasicKeydown';

const makeKeydownEventParam = (key: string) => {
    return {
        key,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
    } as unknown as KeyboardEvent<HTMLDivElement>;
};

const expectCalls = (
    handler: ReturnType<typeof makeSwitchBasicKeydownHandler>,
    action: () => void,
    key: string,
    counter: number,
    checkEventFns = false
) => {
    const event = makeKeydownEventParam(key);
    handler(event);
    expect(action).toHaveBeenCalledTimes(counter);
    if (checkEventFns) {
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
    } else {
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(event.stopPropagation).not.toHaveBeenCalled();
    }
};

describe('makeSwitchBasicKeydownHandler funtion', () => {
    test('returns the keydown event handler function correctly', () => {
        const handler = makeSwitchBasicKeydownHandler(() => {});
        expect(typeof handler).toBe('function');
    });
    test('triggers the action callback correctly', () => {
        const action = jest.fn();
        const handler = makeSwitchBasicKeydownHandler(action);
        expectCalls(handler, action, ' ', 1, true);
        expectCalls(handler, action, 'Enter', 2, true);
        expectCalls(handler, action, 'ArrowRight', 2);
    });
});
