import { isBooleanishFalsy } from '.';

describe('isBooleanishFalsy function', () => {
    test('returns as output the true value correctly', () => {
        let input: boolean | 'true' = true;
        expect(isBooleanishFalsy(input)).toBe(false);
        input = 'true';
        expect(isBooleanishFalsy(input)).toBe(false);
    });
    test('returns as output the false value correctly', () => {
        let input: boolean | 'false' | undefined = false;
        expect(isBooleanishFalsy(input)).toBe(true);
        input = 'false';
        expect(isBooleanishFalsy(input)).toBe(true);
        input = undefined;
        expect(isBooleanishFalsy(input)).toBe(true);
    });
});
