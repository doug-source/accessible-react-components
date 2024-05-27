import '@testing-library/jest-dom';
import { makeInputKeyDownHandler } from './makeInputKeydownHandler';

describe('makeInputKeyDownHandler function', () => {
    test('runs correctly', () => {
        const outputFn = makeInputKeyDownHandler(
            false,
            -1,
            () => {},
            false,
            () => {},
            [],
            '',
            () => {},
            () => {}
        );
        expect(typeof outputFn).toBe('function');
    });
});
