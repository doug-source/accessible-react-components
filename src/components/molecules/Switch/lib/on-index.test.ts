import { makeKeydownHandler } from '.';

describe('makeKeydownHandler funtion', () => {
    test('returns the keydown event handler function correctly', () => {
        const action = jest.fn();
        const handler = makeKeydownHandler(action);
        expect(typeof handler).toBe('function');
    });
});
