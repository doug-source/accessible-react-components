import { calcTranslateX } from '.';

describe('calcTranslateX function', () => {
    test('returns on output', () => {
        const output = calcTranslateX('on');
        expect(output).toBe('calc(100% - 1rem - 0.5rem)');
    });
    test('returns mixed output', () => {
        const output = calcTranslateX('mixed');
        expect(output).toBe('calc((100% - 1rem - 0.5rem) / 2)');
    });
    test('returns off output', () => {
        const output = calcTranslateX('off');
        expect(output).toBe('0');
    });
});
