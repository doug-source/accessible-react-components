import { KeyboardEvent } from 'react';
import { makeKeydownHandler } from '.';

const makeKeydownEventParam = (key: string) => {
    return {
        key,
        preventDefault: jest.fn(),
    } as unknown as KeyboardEvent<HTMLDivElement>;
};

const expectCalls = (
    handler: ReturnType<typeof makeKeydownHandler>,
    action: () => void,
    key: string,
    counter: number,
    preventDefault = false
) => {
    const event = makeKeydownEventParam(key);
    handler(event);
    expect(action).toHaveBeenCalledTimes(counter);
    if (preventDefault) {
        expect(event.preventDefault).toHaveBeenCalled();
    } else {
        expect(event.preventDefault).not.toHaveBeenCalled();
    }
};

describe('makeKeydownHandler funtion', () => {
    test('returns the keydown event handler function correctly', () => {
        const handler = makeKeydownHandler(() => {});
        expect(typeof handler).toBe('function');
    });
    test('triggers the action callback correctly', () => {
        const action = jest.fn();
        const handler = makeKeydownHandler(action);
        expectCalls(handler, action, ' ', 1, true);
        expectCalls(handler, action, 'Enter', 2, true);
        expectCalls(handler, action, 'ArrowRight', 2);
    });
});
