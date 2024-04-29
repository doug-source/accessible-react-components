import { isAriaCheckedFalsy } from '.';

describe('isAriaCheckedFalsy function', () => {
    test('returns the truthy checking correctly', () => {
        let input: true | 'true' | 'mixed' = true;
        expect(isAriaCheckedFalsy(input)).toBe(false);
        input = 'true';
        expect(isAriaCheckedFalsy(input)).toBe(false);
        input = 'mixed';
        expect(isAriaCheckedFalsy(input)).toBe(false);
    });
    test('returns the falsy checking correctly', () => {
        let input: false | 'false' | undefined;
        expect(isAriaCheckedFalsy(input)).toBe(true);
        input = false;
        expect(isAriaCheckedFalsy(input)).toBe(true);
        input = 'false';
        expect(isAriaCheckedFalsy(input)).toBe(true);
    });
});
