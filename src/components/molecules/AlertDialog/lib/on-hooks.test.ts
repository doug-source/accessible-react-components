import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useKeydownBinding, useKeydownHandler } from './hooks';

function makeKeydownEvent(key: string) {
    return {
        key,
        preventDefault: jest.fn(),
    } as unknown as KeyboardEvent;
}

function takeKeydownHandler(onClose: () => void) {
    const {
        result: { current },
    } = renderHook(() => {
        return useKeydownHandler(onClose);
    });
    return current;
}

describe('useKeydownHandler function', () => {
    test('returns a function', () => {
        const action = () => {};
        const outputFn = takeKeydownHandler(action);
        expect(typeof outputFn).toBe('function');
    });
    test('runs after keydown correctly', () => {
        const action = jest.fn();
        const outputFn = takeKeydownHandler(action);
        let event = makeKeydownEvent('Escape');
        outputFn.call(document, event);
        expect(action).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).toHaveBeenCalled();
        event = makeKeydownEvent('Enter');
        outputFn.call(document, event);
        expect(action).toHaveBeenCalledTimes(1);
        expect(event.preventDefault).not.toHaveBeenCalled();
    });
});

describe('useKeydownBinding function', () => {
    test('triggers the keydown event handler', async () => {
        const action = jest.fn();
        renderHook(() => {
            useKeydownBinding(action);
        });
        const user = userEvent.setup();
        await user.keyboard('{Escape}');
        expect(action).toHaveBeenCalled();
    });
});
